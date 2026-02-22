import express from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import { DoctorDelegate } from "./../../../generated/prisma/models/Doctor";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
const router = express.Router();

router.get(
  "/",
  auth(UserRole.DOCTOR, UserRole.ADMIN, UserRole.PATIENT),
  DoctorScheduleController.getAllScheduleOfDoctor,
);
router.post("/", auth(UserRole.DOCTOR), DoctorScheduleController.insertIntoDB);
router.delete(
  "/:scheduleId",
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  DoctorScheduleController.deleteDoctorSchedule,
);

export const doctorScheduleRoutes = router;
