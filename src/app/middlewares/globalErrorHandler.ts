import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Prisma } from "../../generated/prisma/client";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message || "Something went wrong!";
  let error = err;
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      message = "Duplicate Key error";
      error = err.meta;
      statusCode = httpStatus.CONFLICT;
    }
    if (error.code == "P1000") {
      message = "Authentication failed against database server";
      error = err.meta;
      statusCode = httpStatus.BAD_GATEWAY;
    }
    if (error.code == "P2003") {
      message = "Foreign key constraint failed";
      error = err.meta;
      statusCode = httpStatus.BAD_REQUEST;
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    message = "Validation error";
    error = err.message;
    statusCode = httpStatus.BAD_REQUEST;
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    message = "Unknown Prisma error occurred";
    error = err.message;
    statusCode = httpStatus.BAD_REQUEST;
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    message = "Prisma client failed to initialize";
    error = err.message;
    statusCode = httpStatus.BAD_REQUEST;
  }

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
