import prisma from "../../lib/prisma.orm.js";
import { AppError } from "../../middleware/error.middleware.js";
import { v4 } from "uuid";
import bcryptjs from "bcryptjs";
import { generateToken } from "../../lib/token.js";
import { resetMail } from "../../mails/reset-password.js";

// Service to register Admin
export const signUpAdminService = async (name, email, password) => {
  const existing = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (existing) throw new AppError("User account already exists", 401);

  // Encrypt password
  const hashPassword = await bcryptjs.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashPassword,
      user_type: "ADMIN",
    },
  });

  return user;
};

// Service to register Moderator
export const signUpModeratorService = async (name, email, password) => {
  const existing = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (existing) throw new AppError("User account already exists", 401);

  // Encrypt password
  const hashPassword = await bcryptjs.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashPassword,
      user_type: "MODERATOR",
    },
  });

  return user;
};

// Service to register Worker
export const signUpWorkerService = async (name) => {
  const user = await prisma.users.create({
    data: {
      name,
      user_type: "WORKER",
    },
  });

  return user;
};

// Login User service
export const signInService = async (email, password) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  // Check if patient doesn't exist
  if (!user) throw new AppError("Patient account does not exist", 404);

  const isValidPassword = await bcryptjs.compare(password, user.password);

  // Check if password is incorrect
  if (!isValidPassword) throw new AppError("Password is incorrect", 401);

  // Check if account is approved
  if (user.status === false)
    throw new AppError("Account is not approved yet", 401);

  // Generate and assign token to the patient account
  const token = generateToken(user.id);

  return { token, user };
};

// Fetch Profile
export const fetchProfileService = async (userId) => {
  return await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
};

// Forgot/Reset password service
export const resetPasswordService = async (email) => {
  const existing = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  // Email should exist in database to reset password
  if (!existing) throw new AppError("Account does not exist", 404);

  // Converting UUID to a 10 character password
  const newPassword = v4().slice(0, 10);

  const hashPassword = await bcryptjs.hash(newPassword, 10);

  const user = await prisma.users.update({
    where: {
      email,
    },
    data: {
      password: hashPassword,
    },
  });

  // Send new password to patient's email
  await resetMail(user.email, newPassword);

  const receipient = user.email;
  const password = newPassword;

  return { receipient, password };
};

// Change password service
export const changePasswordService = async (
  userId,
  oldPassword,
  newPassword,
) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  const isValidPassword = await bcryptjs.compare(oldPassword, user.password);

  // Check if current password is incorrect
  if (!isValidPassword)
    throw new AppError("Current password is incorrect", 400);

  const hashPassword = await bcryptjs.hash(newPassword, 10);

  // Update to new password
  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      password: hashPassword,
    },
  });
};

// Fetch all users
export const fetchAllUsersService = async () => {
  return await prisma.users.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
};

// Approve user
export const approveUserService = async (userId) => {
  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      status: true,
    },
  });
};

// Dispprove user
export const disapproveUserService = async (userId) => {
  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      status: false,
    },
  });
};

// Dispprove user
export const setPaymentService = async (userId, dailyPayment) => {
  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      daily_payment: dailyPayment,
    },
  });
};

// Delete user
export const deleteUserService = async (userId) => {
  return await prisma.users.delete({
    where: {
      id: userId,
    },
  });
};
