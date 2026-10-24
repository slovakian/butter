import * as Cloudflare from "@alchemy.run/cloudflare";
import * as GitHub from "@alchemy.run/github";
import * as Alchemy from "alchemy";
import * as Output from "alchemy/Output";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export default Alchemy.Stack(
  "butter",
  {
    providers: Layer.mergeAll(Cloudflare.providers(), GitHub.providers()),
    state: Cloudflare.state(),
  },
  Effect.gen(function* deployButter() {
    const { stage } = yield* Alchemy.Stack;

    const website = yield* Cloudflare.Website.Vite("Website", {
      domain: stage === "prod" ? "butter.procka.org" : undefined,
      rootDir: "apps/website",
    });

    const pullRequest = process.env.PULL_REQUEST;

    if (pullRequest !== undefined && pullRequest !== "") {
      const repoEnv = process.env.GITHUB_REPOSITORY ?? "slovakian/butter";
      const [owner = "slovakian", repository = "butter"] = repoEnv.split("/");
      const shaPrefix = (process.env.GITHUB_SHA ?? "HEAD").slice(0, 7);

      yield* GitHub.Comment("preview-comment", {
        body: Output.interpolate`
## Preview Deployed

**URL:** ${website.url}

Built from commit ${shaPrefix}
---
_This comment updates automatically with each push._
`,
        issueNumber: Number(pullRequest),
        owner,
        repository,
      });
    }

    return {
      url: website.url,
    };
  })
);
