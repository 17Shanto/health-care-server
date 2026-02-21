import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { DoctorScheduleService } from "./doctorSchedule.service";
import sendResponse from "../../shared/sendResponse";
import HttpStatus from "http-status";
import { IJWTPayload } from "../../types/common";
import pick from "../../helper/pick";
import { IOptions } from "../../helper/paginationHelper";

const getAllScheduleOfDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const filters = pick(req.query, ["startDateTime", "endDateTime"]);
    const result = await DoctorScheduleService.getAllScheduleOfDoctor(
      options as IOptions,
      filters,
    );
    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Schedule fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  },
);

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
  getAllScheduleOfDoctor,
};
