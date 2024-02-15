import { addBallot, getBallots } from "../controllers/vote";
import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth";

const voteRouter = express.Router();

voteRouter.route("/ballots").post(isAuthenticatedUser, addBallot);
voteRouter.route("/ballots").get(isAuthenticatedUser, getBallots);

export default voteRouter;
