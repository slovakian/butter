import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/slices")({
  beforeLoad: () => {
    // oxlint-disable-next-line typescript/only-throw-error
    throw redirect({
      hash: "slices",
      to: "/",
    });
  },
});
