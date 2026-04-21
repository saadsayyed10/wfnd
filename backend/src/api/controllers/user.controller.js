import * as userService from "../services/user.service.js";
import { AppError } from "../../middleware/error.middleware.js";

/*
Register Admin account controller
Method: POST
Endpoint: /api/users/register/admin
*/
export const signUpAdminController = async (req, res) => {
  const { name, email, password } = req.body;
  const data = {
    name,
    email,
    password,
  };

  // Inputs cannot be left null
  if (!data) {
    console.error("All fields are required");
    return res.status(404).json({ error: "All fields are required" });
  }

  // Password validation
  if (!password || password.length < 8) {
    console.error("Password should contain more than 8 characters");
    return res
      .status(400)
      .json({ error: "Password should contain more than 8 characters" });
  }

  try {
    const user = await userService.signUpAdminService(name, email, password);
    res.status(201).json({ message: "Admin registered", user });
    console.log("Admin Registered:\n", JSON.stringify(user));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/*
Register Moderator account controller
Method: POST
Endpoint: /api/users/register/moderator
*/
export const signUpModeratorController = async (req, res) => {
  const { name, email, password } = req.body;
  const data = {
    name,
    email,
    password,
  };

  // Inputs cannot be left null
  if (!data) {
    console.error("All fields are required");
    return res.status(404).json({ error: "All fields are required" });
  }

  // Password validation
  if (!password || password.length < 8) {
    console.error("Password should contain more than 8 characters");
    return res
      .status(400)
      .json({ error: "Password should contain more than 8 characters" });
  }

  try {
    const user = await userService.signUpModeratorService(
      name,
      email,
      password,
    );
    res.status(201).json({ message: "Moderator registered", user });
    console.log("Moderator Registered:\n", JSON.stringify(user));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/*
Register Worker account controller
Method: POST
Endpoint: /api/users/register/worker
*/
export const signUpWorkerController = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    console.log("Please enter name of worker");
  }

  try {
    const user = await userService.signUpWorkerService(name);
    res.status(201).json({ message: "Worker registered", user });
    console.log("Worker Registered:\n", JSON.stringify(user));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/*
Login user account controller
Method: POST
Endpoint: /api/users/login
*/
export const signInController = async (req, res) => {
  const { email, password } = req.body;
  const data = { email, password };

  // Inputs cannot be left null
  if (!data) {
    console.error("All fields are required");
    return res.status(404).json({ error: "All fields are required" });
  }

  try {
    const { token, user } = await userService.signInService(email, password);
    res.status(200).json({ message: "User logged in", token, user });
    console.log("User logged in:\n", JSON.stringify(user));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/*
Fetch profile controller
Method: GET
Header: Authorization
Endpoint: /api/users/profile
*/
export const fetchProfileController = async (req, res) => {
  try {
    if (!req.user) {
      console.log("Unauthorized: Please login to fetch profile");
      return res
        .status(401)
        .json({ error: "Unauthorized: Please login to fetch profile" });
    }

    const user = await userService.fetchProfileService(req.user.id);
    res.status(200).json({ user });
    console.log(JSON.stringify(user));
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/*
Reset/Forgotten password controller
Method: PATCH
Endpoint: /api/users/reset-password
*/
export const resetPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    console.log("Email is required to reset password");
    return res
      .status(404)
      .json({ error: "Email is required to reset password" });
  }

  try {
    const { reciepient, password } =
      await userService.resetPasswordService(email);
    res.status(200).json({
      message: "Password reset successful, email sent",
      reciepient,
      password,
    });
    console.log(`Email: ${reciepient}\nNew password: ${password}`);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/*
Change password controller
Method: PUT
Endpoint: /api/users/change-password
*/
export const changePasswordController = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if (!req.user) {
      console.log("Unauthorized: Please login to change password");
      return res
        .status(401)
        .json({ error: "Unauthorized: Please login to change password" });
    }

    const user = await userService.changePasswordService(
      req.user.id,
      oldPassword,
      newPassword,
    );
    res.status(200).json({
      message: "Password changed",
      user,
    });
    console.log(`Email: ${receipient}\nNew password: ${newPassword}`);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/*
Fetch all users controller
Method: GET
Endpoint: /api/users/all
*/
export const fetchAllUsersController = async (_req, res) => {
  try {
    const user = await userService.fetchAllUsersService();
    res.status(200).json({
      total: user.length,
      user,
    });
    console.log(JSON.stringify(user));
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/*
Approve user controller
Method: PATCH
Endpoint: /api/users/approve/:userId
*/
export const approveUserController = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!req.user) {
      console.log("Unauthorized: Please login to approve");
      return res
        .status(401)
        .json({ error: "Unauthorized: Please login to approve" });
    }

    const user = await userService.approveUserService(userId);
    res.status(200).json({
      message: "User approved",
      user,
    });
    console.log(`User approved\n${JSON.stringify(user)}`);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/*
Disapprove user controller
Method: PATCH
Endpoint: /api/users/disapprove/:userId
*/
export const disapproveUserController = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!req.user) {
      console.log("Unauthorized: Please login to disapprove");
      return res
        .status(401)
        .json({ error: "Unauthorized: Please login to disapprove" });
    }

    const user = await userService.disapproveUserService(userId);
    res.status(200).json({
      message: "User disapproved",
      user,
    });
    console.log(`User disapproved\n${JSON.stringify(user)}`);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/*
Set user payment controller
Method: PUT
Endpoint: /api/users/set-payment/:userId
*/
export const setPaymentController = async (req, res) => {
  const { userId } = req.params;
  const { dailyPayment } = req.body;

  try {
    if (!req.user) {
      console.log("Unauthorized: Please login to disapprove");
      return res
        .status(401)
        .json({ error: "Unauthorized: Please login to disapprove" });
    }

    const user = await userService.setPaymentService(userId, dailyPayment);
    res.status(200).json({
      message: "Payment updated",
      user,
    });
    console.log(`Payment updated\n${JSON.stringify(user)}`);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


/*
Delete user controller
Method: DELETE
Endpoint: /api/users/delete/:userId
*/
export const deleteUserController = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!req.user) {
      console.log("Unauthorized: Please login to delete");
      return res
        .status(401)
        .json({ error: "Unauthorized: Please login to delete" });
    }

    const user = await userService.deleteUserService(userId);
    res.status(204).json({
      message: "User delete",
      user,
    });
    console.log(`User deleted\n${JSON.stringify(user)}`);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
