import { Request } from "express";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUploader";
import { Prisma } from "../../../generated/prisma/client";
import { UserWhereInput } from "../../../generated/prisma/models";

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

const getAllFormDB = async (
  limit: number,
  page: number,
  search: string,
  sortBy: string,
  sortOrder: string,
) => {
  const skip = (page - 1) * limit;

  const andConditions: Prisma.UserWhereInput[] = [];
  if (search) {
    andConditions.push({
      email: { contains: search, mode: "insensitive" },
    });
  }

  const where: UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const results = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: "desc",
          },
  });
  return results;
};

export const UserService = {
  createPatient,
  createAdmin,
  createDoctor,
  getAllFormDB,
};
