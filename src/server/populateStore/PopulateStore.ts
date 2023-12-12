import {connectedPool} from "../common/Db";

import {Pool} from "pg";
import {genSalt, hash} from "bcrypt";

// Populates the store with initial data if it's empty.
async function main(): Promise<void> {
  const pool = await connectedPool();

  const numUsers = (await pool.query("select count(*) from users")).rows[0]
    .count;
  if (numUsers > 0) {
    console.log({_: "store already populated", numUsers});
    return;
  }

  await addUser(pool, "alice@example.com", "iamalice");

  console.log({_: "populated store"});
}

async function addUser(
  pool: Pool,
  email: string,
  password: string,
): Promise<void> {
  const salt = await genSalt(10);
  const passwordHash = await hash(password, salt);
  await pool.query(
    "insert into users (email, salt, password_hash) values ($1, $2, $3)",
    [email, salt, passwordHash],
  );
}

main().then((_) => process.exit(0));
