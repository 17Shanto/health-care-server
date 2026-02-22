import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { IJWTPayload } from "../../types/common";

const getAllScheduleOfDoctor = async (options: IOptions, filters: any) => {
  const { page, limit, skip, sortBy, sortOrder }: any =
    paginationHelper.calculatePagination(options);
  const { startDateTime: filterStartDateTime, endDateTime: filterEndDateTime } =
    filters;

  const andConditions: Prisma.DoctorSchedulesWhereInput[] = [];

  if (filterStartDateTime && filterEndDateTime) {
    andConditions.push({
      AND: [
        {
          schedule: {
            startDateTime: {
              gte: filterStartDateTime,
            },
            endDateTime: {
              lte: filterEndDateTime,
            },
          },
        },
      ],
    });
  }

  const whereConditions: Prisma.DoctorSchedulesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctorSchedules.findMany({
    where: whereConditions,
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.doctorSchedules.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const insertIntoDB = async (user: IJWTPayload, payload: any) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  const doctorScheduleData = payload.scheduleIds.map((scheduleId: any) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));
  return await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
};

const deleteDoctorSchedule = async (user: IJWTPayload, scheduleId: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!doctor) {
    throw new Error("Doctor does not exist");
  }
  const result = await prisma.doctorSchedules.delete({
    where: {
      doctorId_scheduleId: {
        doctorId: doctor.id,
        scheduleId,
      },
    },
  });
  return result;
};

export const DoctorScheduleService = {
  insertIntoDB,
  getAllScheduleOfDoctor,
  deleteDoctorSchedule,
};
