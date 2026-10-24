# How skills.sh Skills are installed, versioned, pinned and updated

Research note, 2026-10-24. Primary sources: the `skills` CLI source (`vercel-labs/skills` at commit
[`a80e4c9`](https://github.com/vercel-labs/skills/tree/a80e4c9d12d607631249d4d7d059f835d4b2f13a), 2026-10-19). That
commit is the `gitHead` of npm `skills@1.7.4`, the current `latest`, published 2026-10-19T20:35Z. The other sources are
the skills.sh docs, the agentskills.io specification, and a hash I reproduced locally from this repo's
`skills-lock.json`. Source links below point at that commit (`src/...#L..`) unless stated otherwise.

## TL;DR

- **Install.** `npx skills add <owner/repo>` does a shallow `git clone` of the default branch, or of a ref you give with
  `#ref`, `/tree/<ref>/...`, or a full commit SHA. It finds every `SKILL.md` and copies each whole Skill folder,
  including `references/`, `scripts/` and `assets/`, into `.agents/skills/<name>/`. Agent folders such as
  `.claude/skills/<name>` are symlinks to that copy. A project install writes `./skills-lock.json`. A global install
  (`-g`) writes `~/.agents/.skill-lock.json`.
- **Versioning.** A Skill has no version. The CLI ignores frontmatter `version` and `metadata.version`. The only version
  handles are a git ref (branch, tag, or full 40-character commit SHA, the SHA since v1.5.24) and, for Skills shipped
  inside npm packages, the package version.
- **Pinning works, but only by ref.** `owner/repo#v1.2.0` or `owner/repo#<40-hex-sha>` is stored as `ref` and reused on
  every update. Updating a SHA- or tag-pinned Skill therefore never changes it. To move a pin you re-run `add` with a
  new ref.
- **`skills-lock.json` is not a reproducible lock.** It records `source`, `ref` (only if you gave one), `sourceType`,
  `skillPath` and `computedHash`. `computedHash` is a SHA-256 over every file in the Skill folder (relative path plus
  bytes, sorted). I reproduced the ultracite hash in this repo exactly from the six files in the folder, not from
  `SKILL.md` alone. The lock records no commit. `experimental_install` reinstalls whatever the source resolves to now
  and never checks the hash. The lock is meant to be committed.
- **Updates are pull-only.** `npx skills update`, and `check` and `upgrade` which are the same command, compare hashes
  and re-run `add` for each changed Skill:
  - **Project scope:** re-clones the source and recomputes `computedHash`.
  - **Global scope:** compares the GitHub Trees API folder SHA.

  Since v1.5.0, `check` is an alias of `update` and **installs** updates, although the docs say "without reinstalling
  them". Nothing tells an install that an update exists: no background check, no notifier, no server push. Telemetry
  only sends data out.
- **Implication for Butter.** Skill-side fixes reach an install only when someone runs `skills update`. A SHA- or
  tag-pinned install never gets them at all. Advisories must stay the only reliable channel. `butter-fix` should check
  its own freshness against an independent signal and say so when it is stale.

---

## 1. Install: what `npx skills add` fetches and where it writes it

### Source forms and refs

`parseSource` ([source-parser.ts#L352-L568](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/source-parser.ts#L352-L568))
accepts these forms:

- `owner/repo`: GitHub shorthand.
- `owner/repo/sub/path`: subpath.
- `owner/repo@skill`: one Skill.
- `https://github.com/o/r/tree/<ref>/<path>`: ref plus subpath.
- GitLab, Azure Repos and generic git or SSH URLs, local paths, "well-known" HTTP endpoints, and direct
  `SKILL.md`/archive downloads.

A ref can also be added as a URL fragment: `owner/repo#<ref>` or `owner/repo#<ref>@<skill>`
([source-parser.ts#L284-L314](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/source-parser.ts#L284-L314)).

Users usually pick Skills with `--skill <name...>` (`'*'` means all of them)
([docs/commands.md](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/docs/commands.md)).

The fragment and tree-URL ref was added in PR #814 ("support branch refs in skill install/update sources", commit
`69844c3`, 2026-03-31, first in v1.4.7).

### Fetch path

There are two fetch paths.

1. **Git clone, the usual path.**
   [`cloneRepo`](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/git.ts#L295-L384)
   runs `git clone --depth 1 [--branch <ref>]` into a temporary directory. If the ref is a full 40-character SHA and
   `--branch` fails, it runs `git init` and `git fetch --depth 1 origin <sha>`
   ([git.ts#L30-L77](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/git.ts#L30-L77)).
   Commit-SHA pinning came in PR #1439 (commit `038f9bf`, 2026-09-07, first in v1.5.24). Short SHAs are not supported.
   For Azure, `GC<commit>` is dropped on purpose
   ([source-parser.ts#L128-L137](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/source-parser.ts#L128-L137)).
   With no ref the clone takes the remote's default-branch HEAD.
2. **skills.sh snapshot ("blob") fast path.** This path is only for GitHub repos owned by `vercel`, `vercel-labs`,
   `heygen-com` or `remotion-dev`, plus the self-hosted `zapier/connectors`
   ([add.ts#L1165-L1185](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/add.ts#L1165-L1185),
   [blob.ts#L51-L56](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/blob.ts#L51-L56)).
   It reads the GitHub tree and then file contents from `https://skills.sh/api/download/<owner>/<repo>/<slug>`
   ([blob.ts#L463-L481](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/blob.ts#L463-L481)).
   An explicit ref skips the snapshot because "snapshot downloads are … not bound to the requested ref"
   ([blob.ts#L563-L567](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/blob.ts#L563-L567)).
   That bypass came in PR #1934, v1.5.23. **`slovakian/butter` and `haydenbleasel/ultracite` are not on the allowlist,
   so they always use the git clone path.**

### Where it writes

[`installSkillForAgent`](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/installer.ts#L300-L472)
writes in three modes:

- **Default mode (`symlink`).** It copies the Skill folder to the canonical directory `.agents/skills/<name>/`, or
  `~/.agents/skills/<name>/` with `-g`. It then symlinks each non-universal agent's folder to that copy, for example
  `.claude/skills/<name>` → `../../.agents/skills/<name>`. Agents whose project folder *is* `.agents/skills` (Codex,
  Cursor, Copilot, OpenCode, Gemini CLI and others) use the canonical copy directly. If a symlink fails, it falls back
  to a copy
  ([installer.ts#L403-L449](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/installer.ts#L403-L449)).
- **`--copy`.** It writes an independent copy into each agent folder and skips the canonical folder.
- **Agent folders the project doesn't have.** At project scope, a non-universal agent whose root folder (such as
  `.windsurf/`) is missing gets no link. Claude Code is the exception (`createProjectSkillsDirByDefault: true`)
  ([installer.ts#L100-L116](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/installer.ts#L100-L116),
  [agents.ts#L155-L165](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/agents.ts#L155-L165)).

Agent paths: Claude Code uses `.claude/skills/` in a project and `~/.claude/skills/` globally. The universal location is
`.agents/skills/`. The full table is in
[docs/agents.md](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/docs/agents.md).

The docs present project scope as "Committed with your project, shared with team"
([docs/commands.md, Installation Scope](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/docs/commands.md)).

Observed in this repo: `.agents/skills/ultracite/` exists and `.claude/skills/` does not. Ultracite was probably
installed for universal agents only. Whether Claude Code sees it then depends on whether Claude Code reads
`.agents/skills`, which I did not check.

## 2. Versioning: is there any version concept?

- **Frontmatter.** The CLI reads `name`, `description` and `metadata.internal`, which hides a Skill
  ([skills.ts#L117-L121](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/skills.ts#L117-L121),
  [docs/creating-skills.md](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/docs/creating-skills.md)).
  It never compares `version` or `metadata.version`. The only code that touches a top-level `version` is the Eve
  frontmatter rewriter, and it just passes the field through
  ([installer.ts#L483-L514](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/installer.ts#L483-L514)).
- **Git refs** are the only version handle for git sources. A branch moves. A tag or full SHA is a pin (section 4).
- **npm-packaged Skills** (`experimental_sync`) store the shipping package's `version` in the lock entry
  ([local-lock.ts#L32-L33](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/local-lock.ts#L32-L33),
  [sync.ts#L902-L911](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/sync.ts#L902-L911)).
  The package manager resolves that version, so this is the one place real semver applies. The feature is labelled
  experimental: "options and behavior may change".
- **skills.sh API.** It documents no version field. Its only change signal is `hash`, "SHA-256 hash of the skill's file
  contents" ([skills.sh/docs/api](https://skills.sh/docs/api)).

**Can you pin a Skill to a tag or commit?** Yes: `npx skills add slovakian/butter#v1.0.0 --skill butter-fix`, or
`#<40-hex-sha>`. You can also use `https://github.com/slovakian/butter/tree/<ref>/skills/butter-fix`. The ref goes into
the lock and is reused on update.

## 3. `skills-lock.json` (project lock)

### Schema

Defined in [local-lock.ts#L15-L64](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/local-lock.ts#L15-L64).
Lock version is `1`. Lock files with a lower version are discarded.

The file is `{ version: 1, skills: { [name]: Entry } }`. Keys are sorted, and entries carry no timestamps "to minimize
merge conflicts". Entry fields:

| Field | Meaning |
| - | - |
| `source` | `owner/repo`, an npm package name, or a local path made portable as `./…` |
| `sourceUrl?` | Original URL, kept when `source` was normalized |
| `ref?` | "Branch or tag ref used for installation". This is the ref string the user typed, never a resolved commit. Left out when none was given (`JSON.stringify` drops `undefined`), which is why this repo's entry has no `ref`. |
| `sourceType` | `github`, `gitlab`, `git`, `local`, `node_modules`, `well-known`, and so on |
| `skillPath?` | Path to the Skill's `SKILL.md` in the source repo. Needed for per-Skill update; added in PR #988 (`a3c296f`, 2026-04-28, v1.5.7) |
| `version?` | npm package version (`node_modules` sources only) |
| `via?` | Which `package.json` `skills` field asked for the Skill |
| `computedHash` | "SHA-256 hash computed from all files in the skill folder" |
| `subagents?`, `wellKnownDigest?` | Eve placement; digest for well-known sources |

The file comment says it "is meant to be checked into version control"
([local-lock.ts#L52-L58](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/local-lock.ts#L52-L58)).
The project lock was added in PR #401 (`daa1f82`, 2026-02-20, v1.4.1).

### What `computedHash` covers

[`computeSkillFolderHash`](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/local-lock.ts#L154-L193):

1. Walk the Skill folder recursively, skipping `.git` and `node_modules`.
2. Sort the files by relative POSIX path.
3. Feed `relativePath` and then the raw bytes of each file into a single SHA-256.

The CLI hashes the **source** folder, either the clone or the local path
([add.ts#L1389-L1394](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/add.ts#L1389-L1394)).
It does not hash the installed copy. For snapshot installs it records the server's snapshot `hash` instead.

**Reproduced.** A reimplementation of that function run over `.agents/skills/ultracite/` in this repo gives
`786edd8e07ffab37d1d27c68a1a991b0fe4d0ba911fc97d4f93d232115f0485e`. That exactly matches the lock entry. The folder
holds six files: `SKILL.md`, `references/code-standards.md` and `references/upgrades/v5–v8.md`. Hashing `SKILL.md` alone
gives `af4d8d…` (path plus content) or `2be3bf…` (content only), and neither matches. Running the same function over
upstream `haydenbleasel/ultracite` at `2077efd` (2026-10-22), folder `skills/ultracite`, also gives `786edd…`. The
installed copy is therefore current as of that commit.

### What the lock does not do

- **No commit is recorded.** The lock alone can't tell you which upstream commit produced the installed bytes.
- **No integrity check on restore.** `npx skills experimental_install` takes each entry, builds the source string, and
  reinstalls through `installFromSource`. That fetches the current head of the ref, or the default branch, and
  **rewrites** `computedHash`. It never compares against the stored hash
  ([install.ts#L20-L106](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/install.ts#L20-L106),
  [add.ts#L1335-L1386](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/add.ts#L1335-L1386)).
  It restores only to `.agents/skills/` and creates no agent-specific links. The lock works like a manifest plus a
  "last seen" fingerprint, not like `package-lock.json`.

### Global lock (different file, different hash)

The global lock is `~/.agents/.skill-lock.json`, or `$XDG_STATE_HOME/skills/.skill-lock.json`. Its schema version is
`3`, and older files are wiped
([skill-lock.ts#L6-L103](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/skill-lock.ts#L6-L103)).
Each entry stores `skillFolderHash`, which is the **GitHub git tree SHA** of the Skill folder from the Trees API, plus
`installedAt`, `updatedAt`, `sourceUrl`, `ref`, `skillPath` and `pluginName`. A tree SHA changes when any file in the
folder changes.

## 4. Updates: `update`, `check`, `upgrade`

### Commands

[cli.ts#L420-L424](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/cli.ts#L420-L424)
sends `check`, `update` and `upgrade` all to `runUpdate`. The published 1.7.4 bundle confirms this (`dist/cli.mjs`
line 8923).

The aliasing came in PR #913 (`3d0f855`, 2026-04-11, first in v1.5.0, 2026-04-12). That PR deleted the separate,
read-only `runCheck`. **So `npx skills check` installs updates**, while README and `docs/commands.md` still say it
checks "without reinstalling them". There is no `outdated` command and no dry-run for update.

Options are `-g`, `-p`, `-y` and positional Skill names. Without a TTY, or with `-y`, scope is detected automatically:
project if `skills-lock.json` or `.agents/skills/*/SKILL.md` exists, otherwise global
([update.ts#L92-L171](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/update.ts#L92-L171)).

### How changes are detected

**Project scope** ([`updateProjectSkills`, update.ts#L750-L1003](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/update.ts#L750-L1003)):

1. Group entries by `(source, ref)`.
2. **Shallow-clone** each source at its stored ref, or the default branch when there is none.
3. Rediscover the Skills and recompute `computeSkillFolderHash` for each one.
4. Skip a Skill whose hash equals `computedHash` and whose path hasn't moved.
5. Otherwise run `skills add <source>/<folder>[#ref] --skill <name> -y` in a subprocess, which rewrites the lock entry.

Notes:

- `node_modules` and `local` entries are skipped.
- Entries without `skillPath` are listed as "cannot be updated automatically".
- Skills deleted upstream trigger a prompt to remove them. Non-interactive mode never deletes; that behaviour came in
  PR #1218, v1.5.8.
- Before #913 (v1.5.0), updates only covered global Skills.

**Global scope** ([`updateGlobalSkills`, update.ts#L496-L748](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/update.ts#L496-L748)):

1. For `github` sources, make one GitHub Trees API call per `(source, ref)`. The CLI calls
   `GET /repos/{o}/{r}/git/trees/{ref|HEAD|main|master}?recursive=1`
   ([blob.ts#L235-L275](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/blob.ts#L235-L275)).
   It goes anonymous first (60 requests per hour per IP), then tries `GITHUB_TOKEN`/`GH_TOKEN`, then `gh api`.
2. Compare the folder's tree SHA with `skillFolderHash`.
3. If the API is unavailable or the paths have moved, fall back to a clone.
4. `git`, `local` and `well-known` sources without a digest are listed as "cannot be checked automatically", with a
   manual `npx skills add … -g -y` hint
   ([update.ts#L187-L243](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/update.ts#L187-L243)).

Telemetry plays no part in detection. The old comment in `skill-lock.ts` says the tree SHA was "fetched … by the
telemetry server", but the current code calls GitHub directly.

### Pinned refs on update

`update` reuses the stored ref, and groups are keyed by source *and* ref
([update.ts#L556-L566](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/update.ts#L556-L566)).
How that plays out:

- **Branch pin:** follows the branch.
- **Tag or SHA pin:** the content never changes, so `update` reports "up to date" forever.

No code looks for "a newer tag than the pinned one".

### Can an install learn about an update without a command?

**No.** I found no update notifier, no registry poll, and no check at startup or when an agent loads a Skill. A search
of `src/` for notifier, `registry.npmjs`, "newer version" or "outdated" found nothing.

Telemetry (`https://www.skills.sh/tele/t`) and the audit lookup (`/tele/audit`) are fire-and-forget GETs that only send
data out ([telemetry.ts#L1-L191](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/telemetry.ts#L1-L191)).
skills.sh's own docs only say: "Run npx skills update to pull the latest versions… New installs always fetch the current
contents" ([skills.sh/docs/faq](https://skills.sh/docs/faq), [skills.sh/docs/packs](https://skills.sh/docs/packs)).

The only automation is a user-defined hook. The docs suggest `"prepare": "skills experimental_sync -y"` for
npm-packaged Skills ([docs/commands.md](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/docs/commands.md)).
Nothing similar exists for git-sourced Skills, short of scheduling `npx skills update -y` in CI yourself.

## 5. Reference files, scripts and assets

- **Install** copies the whole Skill folder recursively. It skips only files named `metadata.json` and the folders
  `.git`, `__pycache__` and `__pypackages__`. Symlinks are dereferenced, file modes are kept, and broken symlinks are
  skipped ([installer.ts#L475-L560](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/installer.ts#L475-L560)).
  The destination folder is wiped first (`cleanAndCreateDirectory`), so files removed upstream disappear on reinstall.
- **Hashing** covers every file in the folder (section 3). A change to `references/stack-x.md` alone changes
  `computedHash`, and also the tree SHA used for global installs. Section 3 shows this repo's `references/*` going into
  the hash.
- **Update** reinstalls the whole folder as a unit, so `SKILL.md` and its reference files always move together.
- **Snapshot path caveats:**
  - A snapshot that lacks a file present in the git tree is rejected in favour of a clone
    ([blob.ts#L519-L535](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/blob.ts#L519-L535)).
  - A Skill whose `SKILL.md` sits at the *repo root* gets only `SKILL.md` installed through the snapshot path
    ([blob.ts#L676-L684](https://github.com/vercel-labs/skills/blob/a80e4c9d12d607631249d4d7d059f835d4b2f13a/src/blob.ts#L676-L684)).

  Neither caveat applies to Butter, which is not on the snapshot allowlist, but Skills should still live in
  subfolders.

## 6. Agent Skills spec (agentskills.io) and versioning

The [specification](https://agentskills.io/specification) defines these frontmatter fields:

| Field | Required | Spec definition |
| - | - | - |
| `name` | yes | 1–64 characters, `[a-z0-9-]`, no leading, trailing or doubled hyphens, must match the parent folder |
| `description` | yes | 1–1024 characters |
| `license` | no | A licence name or a reference to a bundled licence file |
| `compatibility` | no | 1–500 characters, "environment requirements (intended product, system packages, network access, etc.)" |
| `metadata` | no | "A map from string keys to string values", for properties the spec doesn't define |
| `allowed-tools` | no | Experimental |

There is **no top-level `version` field**. The spec's only versioning hint is an example `metadata: { version: "1.0" }`.
`metadata` values are strings, so a version must be quoted.

The folder layout is `SKILL.md` plus optional `scripts/`, `references/` and `assets/`. References should be relative
paths "one level deep". Agents load resources "only when required", which is progressive disclosure.

The spec has nothing on distribution, updates or integrity. `metadata.version` is purely informational, and the skills
CLI does not read it (section 2).

---

## Implications for Butter

1. **Skill updates can't be relied on to reach installs.** Two things block them.
   - Updates are pull-only: someone has to run `npx skills update` or `check`. There is no notification, and agents
     don't trigger updates.
   - An install pinned to a tag or SHA never updates. An install from the default branch updates only when the user
     runs the command.

   A corrected instruction in a `butter-fix` reference file therefore reaches agents at some unknown later time, or
   never.
2. **Advisories must stay the only reliable channel for security fixes.** This is consistent with "an Advisory is a new
   or changed Invariant plus tests, never a diff". The Manifest-versus-Advisory-feed comparison (`butter-fix`, Reconcile,
   optional scheduled CI) works whether or not the Skill is fresh. If an Advisory needs *new agent guidance*, put that
   guidance in the Advisory payload or its tests, which an old `butter-fix` can still apply. Don't depend on a newer
   Skill text.
3. **`butter-fix` should check its own freshness.** The CLI gives it nothing to use: no commit in the lock, no version
   in frontmatter. Options, cheapest first:
   - Put `metadata.version: "<semver>"` in each Skill's frontmatter. It is informational per the spec, but the Skill can
     read it. Publish the current Skill versions, or the minimum version each Advisory needs, in the Advisory feed.
     `butter-fix` and Reconcile then compare and print "your Butter Skills are older than Advisory X needs; run
     `npx skills update butter-fix` (or re-add with the new tag)".
   - Or compare `skills-lock.json`'s `computedHash` for the Butter Skills against a hash published in the feed. Section 3
     gives the exact algorithm. This catches local edits too, but breaks down when users install with `--copy` or edit
     their copy.
   - Freshness should be a warning, not a blocker. Being out of date is the expected state.
4. **Pinning recommendation.**
   - For reproducibility, the Setup Prompt should install a **release tag**: `npx skills add slovakian/butter#vX.Y.Z
     --skill …`. A tag, unlike a full SHA, reads well in `skills-lock.json` and works on CLI versions before 1.5.24.
     Every Butter release should then be tagged.
   - The tradeoff: tag-pinned installs never pick up fixes through `update`. Moving to a fix means re-running `add` with
     the new tag. `butter-fix`/Reconcile should print that exact command when the feed says a newer Skill release
     exists.
   - Without a pin, installs follow the default branch whenever `update` runs. That is easier, but unreviewed `main`
     reaches users whenever they update, and the lock can't say which commit they have.
5. **Ship each stack's guidance as a reference file inside the Skill.** That matches "adding a file, not a Skill", and
   the CLI copies, hashes and updates the whole folder together, so no extra mechanism is needed.
   - Keep each Skill in its own subfolder (e.g. `skills/butter-fix/`), not the repo root.
   - Avoid naming any file `metadata.json`; the installer silently skips it.
6. **The optional scheduled CI check** could also run `npx skills update -p -y` (alias `check`) and open a PR with the
   changed `.agents/skills/**` and `skills-lock.json`. That is the only mechanism that can push Skill-side fixes to
   unpinned installs. It only works for unpinned installs: a pinned install stays put.
7. **Keep Skill-side fixes rare and additive.** The Manifest records Invariant versions per Slice, while Skill text has
   no tracked version on installs. Prefer to express anything security-relevant as an Invariant, so Reconcile can verify
   it in code rather than trusting the agent read the latest instruction.

## Open questions / uncertain

- **Is the snapshot hash compatible with the clone hash?** For snapshot-path installs, the project lock stores the
  server's snapshot `hash`, but project `update` compares it against `computeSkillFolderHash` of a fresh clone. For
  `haydenbleasel/ultracite` (2026-10-24), `https://skills.sh/api/download/haydenbleasel/ultracite/ultracite` returned
  `hash: ee58601f…`. The files in that snapshot were byte-identical to upstream and hash to `786edd…` with the CLI
  algorithm, so the server computes its `hash` differently. If that holds for allowlisted owners too, those project
  installs would be reinstalled on every `update`. This doesn't affect Butter, which installs by clone. Not verified
  further.
- **How fresh are skills.sh snapshots, and how often does the index refresh?** Undocumented. The FAQ says "New installs
  always fetch the current contents". The API docs only describe cache headers (detail endpoint 5 minutes). Not relevant
  to Butter.
- **Version-to-release mapping is approximate.** I used the first git tag that contains each commit. Tags v1.5.2–v1.5.6
  are missing in the repo while npm has those versions, so a feature marked "v1.5.7" may already be in v1.5.2–1.5.6.
- **Do older CLI versions behave the same?** Users running a cached older `npx skills` (before v1.5.0) get a read-only
  `check` and global-only `update`. Users before v1.5.24 can't pin to a SHA. Before v1.4.7 there are no refs at all.
- **Does Claude Code read `.agents/skills`?** If it doesn't, a project install without `-a claude-code` (like this
  repo's ultracite install) is invisible to it. Not checked; it is outside this CLI's source.
- **The docs contradict the code on `check`.** README and `docs/commands.md` still describe `check` as non-mutating.
  Upstream may restore the read-only behaviour later. Don't build automation that relies on either behaviour; use
  `update` explicitly.

## Sources (accessed 2026-10-24)

- vercel-labs/skills at `a80e4c9d12d607631249d4d7d059f835d4b2f13a` (2026-10-19; npm `skills@1.7.4` gitHead):
  https://github.com/vercel-labs/skills/tree/a80e4c9d12d607631249d4d7d059f835d4b2f13a
  - `src/local-lock.ts`, `src/skill-lock.ts`, `src/update.ts`, `src/update-source.ts`, `src/cli.ts`, `src/add.ts`,
    `src/installer.ts`, `src/source-parser.ts`, `src/git.ts`, `src/blob.ts`, `src/install.ts`, `src/sync.ts`,
    `src/telemetry.ts`, `src/agents.ts`
  - `README.md`, `docs/commands.md`, `docs/agents.md`, `docs/creating-skills.md`
  - Commits cited: `3d0f855` (#913, check→update, 2026-04-11), `69844c3` (#814, refs, 2026-03-31), `038f9bf` (#1439, SHA
    pin, 2026-09-07), `daa1f82` (#401, project lock, 2026-02-20), `a3c296f` (#988, skillPath, 2026-04-28), `eb33656`
    (#853, snapshot install, 2026-04-03), `1687113` (#1934, refs bypass snapshot, 2026-08-18), `6b29809` (#1218, upstream
    deletions, 2026-05-21)
- npm `skills`: `npm view skills time dist-tags gitHead` and the `skills-1.7.4.tgz` tarball (`dist/cli.mjs`).
  `latest` = 1.7.4 (2026-10-19T20:35:25Z); 1.5.0 = 2026-04-12; 1.5.24 = 2026-09-06; first 2026 release 1.0.1 =
  2026-01-17. https://www.npmjs.com/package/skills
- skills.sh docs: https://skills.sh/docs, https://skills.sh/docs/cli, https://skills.sh/docs/faq,
  https://skills.sh/docs/packs, https://skills.sh/docs/api
- skills.sh snapshot endpoint (observed, used by the CLI):
  https://skills.sh/api/download/haydenbleasel/ultracite/ultracite
- Agent Skills specification: https://agentskills.io/specification
- Upstream used for hash reproduction: https://github.com/haydenbleasel/ultracite at
  `2077efd77fed46019b69b17048acb5075229d90b` (2026-10-22), folder `skills/ultracite` (tree
  `0de2fd9171980156d7db2f7cc6049bf85c0ff9e3`)
