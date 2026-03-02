import { os } from "@orpc/server";
import type { Context } from "./context";
import { commonErrors } from "./errors";

export const o = os.$context<Context>().errors(commonErrors);
