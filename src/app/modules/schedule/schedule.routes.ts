import express from "express";
import { ScheduleController } from "./schedule.controller";

const router = express.Router();

router.get("/", ScheduleController.schedulesForDoctor);

router.post("/", ScheduleController.insertInoDB);
export const ScheduleRoutes = router;
