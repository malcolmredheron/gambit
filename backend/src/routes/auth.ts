import { loginUser, registerUser, loginOrRegisterUserWithGoogle, userProfile } from "../controllers/auth";
import express from "express"
import { isAuthenticatedUser } from "../middlewares/auth";

const authRouter = express.Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);
authRouter.route('/login/google').post(loginOrRegisterUserWithGoogle);
authRouter.route('/profile').get(isAuthenticatedUser, userProfile);

export default authRouter;
