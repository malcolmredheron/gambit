import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "./catchAsyncErrors";
import { User } from "../models/user";

interface CustomRequest extends Request {
    user: User
}

export const isAuthenticatedUser = catchAsyncErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {

    // get bearer token from request headers
    const { authorization } = req.headers;
    if (!authorization) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }
    const token = authorization.split(' ')[1];

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await User.findOne({ where: { id: decoded.id } })
    if (user)
        req.user = user
    next()
})
