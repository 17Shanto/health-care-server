import { Request } from "express";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUploader";
import { Prisma } from "../../../generated/prisma/client";
import { UserWhereInput } from "../../../generated/prisma/models";
import { paginationHelper } from "../../helper/paginationHelper";
import { userSearchableFields } from "./user.constant";

const createAdmin = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.admin.profilePhoto = uploadResult?.secure_url;
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const result = await prisma.$transaction(async (tx) => {
    await prisma.user.create({
      data: {
        email: req.body.admin.email,
        password: hashPassword,
        role: req.body.role,
      },
    });
    return await tx.admin.create({
      data: req.body.admin,
    });
  });
  return result;
};

const createPatient = async (req: Request) => {
  // console.log(req);
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.patient.profilePhoto = uploadResult?.secure_url;
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        email: req.body.patient.email,
        password: hashPassword,
      },
    });
    return await tx.patient.create({
      data: req.body.patient,
    });
  });
  return result;
};

const createDoctor = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.doctor.profilePhoto = uploadResult?.secure_url;
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        email: req.body.doctor.email,
        password: hashPassword,
        role: req.body.role,
      },
    });
    return await tx.doctor.create({
      data: req.body.doctor,
    });
  });
  return result;
};

const getAllFormDB = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder }: any =
    paginationHelper.calculatePagination(options);
  const { search, ...filterData } = filters;

  const andConditions: Prisma.UserWhereInput[] = [];
  if (search) {
    // console.log(search);
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (filterData) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: { equals: (filterData as any)[key] },
      })),
    });
  }

  const where: UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const results = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });
  const total = await prisma.user.count({
    where,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: results,
  };
};

export const UserService = {
  createPatient,
  createAdmin,
  createDoctor,
  getAllFormDB,
};
