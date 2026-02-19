import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import sendResponse from "../../shared/sendResponse";
import HttpStatus from "http-status";

const schedulesForDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.schedulesForDoctor();
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Schedule fetched successfully",
    data: result,
  });
});

const insertInoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.insertInoDB(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
});

export const ScheduleController = {
  insertInoDB,
  schedulesForDoctor,
};
