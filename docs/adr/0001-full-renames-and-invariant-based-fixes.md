# Domain concepts are fully renamable; security fixes ship as invariants, not diffs

The user owns their auth system, so every domain concept Butter installs (user, session, organization, member, etc.) must be renamable all the way through: storage, internal identifiers, the app-facing API, and copy. The Configurator renders Slices with the user's Rename Map, and that map is preserved so later Slices and Skills follow it. Protocol vocabulary (OAuth `state`, PKCE `code_verifier`, WebAuthn `authenticatorData`, etc.) stays on spec and is not offered as a rename, because it anchors code to its specification and to Pilcrow's Auth Book.

## Consequences

Because installed code will diverge from upstream (through renames and through ordinary user edits), Butter never ships security fixes as patches. Each Flow ships behavioral tests asserting its Invariants through its Ports; a fix ships as a new or changed Invariant plus test, and the user's agent adapts their code until it passes. Every Slice, test, and Skill must be authored to be renamable: no hard-coded domain identifiers.

## Considered Options

- Canonical internal names with a mapping layer in Adapters: rejected because it leaves user-owned code bilingual and implies Butter, not the user, owns the vocabulary.
- Diff-based security patches: rejected because they fail on any customized install, renamed or not.
