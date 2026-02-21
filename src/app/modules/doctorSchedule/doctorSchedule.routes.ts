import express from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import { DoctorDelegate } from "./../../../generated/prisma/models/Doctor";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
const router = express.Router();

router.post("/", auth(UserRole.DOCTOR), DoctorScheduleController.insertIntoDB);

export const doctorScheduleRoutes = router;
