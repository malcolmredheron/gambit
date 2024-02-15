import { Response } from "express";
import { User } from "../models/user";

export const sendToken = (user: User, statusCode: number, res: Response) => {

    // Create Jwt token
    const token = user.getJwtToken();
    const newUser = { ...user.dataValues }
    if (newUser.password) {
        delete newUser.password
    }
    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + parseInt(process.env.COOKIE_EXPIRES_TIME as string) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user: newUser
    })

}
