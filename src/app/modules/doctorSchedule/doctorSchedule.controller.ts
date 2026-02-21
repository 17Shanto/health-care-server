import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { DoctorScheduleService } from "./doctorSchedule.service";
import sendResponse from "../../shared/sendResponse";
import HttpStatus from "http-status";
import { IJWTPayload } from "../../types/common";

const insertIntoDB = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await DoctorScheduleService.insertIntoDB(
      user as IJWTPayload,
      req.body,
    );
    sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: "Doctor Schedule created successfully",
      data: result,
    });
  },
);

export const DoctorScheduleController = {
  insertIntoDB,
};
