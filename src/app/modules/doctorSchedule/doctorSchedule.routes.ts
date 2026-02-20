import express from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import { DoctorDelegate } from "./../../../generated/prisma/models/Doctor";
const router = express.Router();

router.post("/", DoctorScheduleController.insertIntoDB);

export const doctorScheduleRoutes = router;
