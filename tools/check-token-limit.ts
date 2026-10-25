#!/usr/bin/env vpx
import process from "node:process";

import {
  checkFiles,
  formatErrorMessage,
  getStagedFilesFromGit,
} from "./token-limit.ts";

const main = (): void => {
  const cliArgs = process.argv.slice(2);
  const filesToCheck = cliArgs.length > 0 ? cliArgs : getStagedFilesFromGit();

  if (filesToCheck.length === 0) {
    process.exit(0);
  }

  const result = checkFiles(filesToCheck);

  if (result.violations.length > 0) {
    process.stderr.write(`${formatErrorMessage(result.violations)}\n`);
    process.exit(1);
  }

  process.exit(0);
};

main();
