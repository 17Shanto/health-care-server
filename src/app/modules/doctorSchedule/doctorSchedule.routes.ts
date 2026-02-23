import express from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import { DoctorDelegate } from "./../../../generated/prisma/models/Doctor";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import validateRequest from "../../middlewares/validateRequest";
import { DoctorScheduleValidation } from "./doctorSchedule.validation";
const router = express.Router();

router.get(
  "/",
  auth(UserRole.DOCTOR, UserRole.ADMIN, UserRole.PATIENT),
  DoctorScheduleController.getAllScheduleOfDoctor,
);
router.post(
  "/",
  validateRequest(
    DoctorScheduleValidation.createDoctorScheduleValidationSchema,
  ),
  auth(UserRole.DOCTOR),
  DoctorScheduleController.insertIntoDB,
);
router.delete(
  "/:scheduleId",
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  DoctorScheduleController.deleteDoctorSchedule,
);

export const doctorScheduleRoutes = router;
