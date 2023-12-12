import express from "express";
import {connectedPool} from "../common/Db";
import {Request, RequestHandler, Response} from "express-serve-static-core";

async function main(): Promise<void> {
  const pool = await connectedPool();
  const expressApp = express();
  expressApp.post(
    "/auth/login",
    reportException(async (req, res) => {
      res.set("Access-Control-Allow-Origin", "*");

      const email = req.query["email"];
      if (email === undefined) {
        res.status(400).send("missing email");
        return;
      }

      const result = await pool.query("select * from users where email = $1", [
        email,
      ]);
      if (result.rows.length === 0) {
        res.status(400).send(`unknown sample id: ${email}`);
        return;
      }

      res.set("Access-Control-Expose-Headers", "extra");
      res.setHeader("extra", result.rows[0].email);
      res.status(200).send();
    }),
  );
  const port = 80;
  expressApp.listen(port, () => {
    console.log(`ws listening on port ${port}`);
  });
}

function reportException(
  func: (req: Request, res: Response) => Promise<void>,
): RequestHandler {
  return (req, res, next) => {
    func(req, res).catch((e: Error) => {
      // https://expressjs.com/en/guide/error-handling.html
      console.log({_: "reportException", e});
      next(e);
    });
  };
}

main().then(() => null);
