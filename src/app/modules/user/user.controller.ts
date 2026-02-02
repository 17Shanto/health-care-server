import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import HttpStatus from "http-status";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Admin profile is created successfully ✅",
    data: result,
  });
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createPatient(req);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "patient profile is created successfully ✅",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createDoctor(req);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "doctor profile is created successfully ✅",
    data: result,
  });
});

const getAllFormDB = catchAsync(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);
  const result = await UserService.getAllFormDB(limit, page);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "user retrieve successfully ✅",
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createPatient,
  createDoctor,
  getAllFormDB,
};
