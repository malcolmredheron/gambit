import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { Ballot } from "../models/ballot";
import ErrorHandler from "../utils/errorHandler";

interface CustomRequest extends Request {
  user: Ballot;
}

export const addBallot = catchAsyncErrors(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    // console.log("req.body", typeof req.body.ballots );
    try {
      const ballot = await Ballot.create({
        name: "votes",
        value: JSON.stringify(req.body.ballots),
        user_id: req.user.id,
      });
      await ballot.save();
      res.status(201).json({ success: true, ballot });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

// GET endpoint to add a new ballot
export const getBallots = catchAsyncErrors(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const ballots = await Ballot.findAll({
        where: { user_id: req.user.id },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({ ballots });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);
