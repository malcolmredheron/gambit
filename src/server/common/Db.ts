import {Pool, PoolClient} from "pg";

export async function connectedPool(): Promise<Pool> {
  const pool = new Pool();
  await pool.connect();
  await pool.query("SELECT NOW()");
  return pool;
}

export async function inTransaction<T>(
  pool: Pool,
  transact: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("begin");
    const result = await transact(client);
    await client.query("commit");
    return result;
  } finally {
    client.release();
  }
}
