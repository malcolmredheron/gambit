import express from "express";
const cors = require("cors");
import authRouter from "./routes/auth";
import voteRouter from "./routes/vote";
import errorMiddleware from "./middlewares/errors";
import bodyParser from "body-parser";

const app = express();

// allow all origins
if (process.env.NODE_ENV === "DEVELOPMENT") {
    app.use(cors());
} else {
    app.use(cors({ origin: process.env.CLIENT_URL }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/vote/", voteRouter);

// Middleware to handle errors
app.use(errorMiddleware);

export default app;
