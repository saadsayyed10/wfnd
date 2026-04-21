import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

import { protectAuth } from "../../middleware/auth.middleware.js";

const userRouter = Router();

// Sign Up routes
userRouter.post("/register/admin", userController.signUpAdminController);
userRouter.post(
  "/register/moderator",
  userController.signUpModeratorController,
);
userRouter.post("/register/worker", userController.signUpWorkerController);

// Login route
userRouter.post("/login", userController.signInController);

// Reset password route
userRouter.patch("/reset-password", userController.resetPasswordController);

// Change password route
userRouter.put(
  "/change-password",
  protectAuth,
  userController.changePasswordController,
);

// Fetch profile route
userRouter.get("/profile", protectAuth, userController.fetchProfileController);

// Fetch all users route
userRouter.get("/all", userController.fetchAllUsersController);

// Approve users route
userRouter.patch(
  "/approve/:userId",
  protectAuth,
  userController.approveUserController,
);

// Approve users route
userRouter.patch(
  "/disapprove/:userId",
  protectAuth,
  userController.disapproveUserController,
);

// Set user payment route
userRouter.put(
  "/set-payment/:userId",
  protectAuth,
  userController.setPaymentController,
);

// Delete user route
userRouter.delete(
  "/delete/:userId",
  protectAuth,
  userController.deleteUserController,
);

export default userRouter;
