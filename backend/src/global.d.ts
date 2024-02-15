import { NextFunction, Request, Response } from "express";

interface ViewFunction {
    req: Request,
    res: Response,
    next: NextFunction
}
