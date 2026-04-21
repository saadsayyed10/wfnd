import { Router } from "express";
import * as attendanceController from "../controllers/attendance.controller.js";

import { protectAuth } from "../../middleware/auth.middleware.js";

const attendanceRouter = Router();

attendanceRouter.post("/login", attendanceController.loginUserController);

attendanceRouter.post("/logout", attendanceController.logoutUserController);

attendanceRouter.put(
  "/update/login",
  attendanceController.updateLoginTimeController,
);

attendanceRouter.put(
  "/update/logout",
  attendanceController.updateLogoutTimeController,
);

export default attendanceRouter;
