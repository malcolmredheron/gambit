import {Pool} from "pg";
import {connectedPool} from "../common/Db";
import minimist from "minimist";

// Runs an admin script's `main`, providing a number of useful arguments.
export function runMain(
  mainFileName: string,
  minimistOpts: minimist.Opts,
  main: (args: {pool: Pool; args: minimist.ParsedArgs}) => Promise<void>,
): void {
  if (process.argv[1] !== mainFileName) {
    // Don't run if we are just being imported by a test.
    return;
  }
  const args = minimist(process.argv.slice(2), minimistOpts);

  Promise.resolve(0)
    .then(async () => {
      const pool = await connectedPool();

      await main({pool, args});
      process.exit(0);
    })
    .catch((e) => {
      console.log(e);
      process.exit(1);
    });
}
