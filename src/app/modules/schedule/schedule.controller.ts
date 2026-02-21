import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import sendResponse from "../../shared/sendResponse";
import HttpStatus from "http-status";
import pick from "../../helper/pick";
import { IJWTPayload } from "../../types/common";

const schedulesForDoctor = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const filters = pick(req.query, ["startDateTime", "endDateTime"]);
    const user = req.user;
    const result = await ScheduleService.schedulesForDoctor(
      user as IJWTPayload,
      filters,
      options,
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

const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.deleteScheduleFromDB(
    String(req.params.id),
  );
  sendResponse(res, {
    statusCode: HttpStatus.OK,
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
  deleteScheduleFromDB,
};
