#!src/server/admin/admin.sh
import {runMain} from "./AdminHelpers";
import {definedOrThrow} from "../../util/Collection";
import {AssertFailed} from "../../util/Assert";

// Adds a new tree to a user's account
runMain(
  __filename,
  {
    string: ["email"],
    unknown: (arg) => {
      throw new AssertFailed(`Unknown arg: ${arg}`);
    },
  },
  async ({pool, args}) => {
    const email = definedOrThrow(args.email, "Missing: email");
    const result = await pool.query("select * from users where email = $1", [
      email,
    ]);

    console.log(result);
  },
);
