import { NextFunction, Request, Response } from "express";
import { tokenGenerator } from "../helper/jwtHelper";
import AppError from "../error/appError";
import httpStatus from "http-status";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.cookies.accessToken;
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized");
      }
      const verifyUser = tokenGenerator.verifyToken(token);
      req.user = verifyUser;
      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
