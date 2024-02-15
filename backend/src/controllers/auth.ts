import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { User } from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import { sendToken } from "../utils/jwtToken";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
    user: User
  }
  

// Register a user   => /api/v1/auth/register
export const registerUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (await User.findOne({ where: { email } })) {
        return next(new ErrorHandler('User already exists with that email', 400))
    }
    const user = await User.create({
        name,
        email,
        password: await User.generatePasswordHash(password),
        registrationSource: 'email',
    })
    sendToken(user, 200, res)
})


// Login User  =>  /api/v1/login
export const loginUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }
    // Finding user in database
    const user = await User.findOne({ where: { email } })
    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    sendToken(user, 200, res)
})

// Login User  =>  /api/v1/auth/login
export const loginOrRegisterUserWithGoogle = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    const payload = (jwt.decode(token, { complete: true }) as JwtPayload);
    if (payload.header.alg === 'RS256' && payload.payload.aud === process.env.GOOGLE_CLIENT_ID) {
        const { email, sub, name } = payload.payload
        const user = await User.findOne({ where: { email } })
        if (user && (await user.comparePassword(sub))){
            sendToken(user, 200, res)
        } else if (!user) {
            const user = await User.create({
                name,
                email,
                password: await User.generatePasswordHash(sub),
                registrationSource: 'google',
            })
            sendToken(user, 200, res)
        }
    }
    return next(new ErrorHandler('Invalid token', 400))
})


// User profile   =>   /api/v1/auth/profile
export const userProfile = catchAsyncErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = await User.findByPk(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})
