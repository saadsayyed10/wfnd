import prisma from "../../lib/prisma.orm.js";

export const loginUserService = async (loginTime, userId) => {
  return prisma.attendance.create({
    data: {
      login: loginTime,
      users_id: userId,
    },
  });
};

export const logoutUserService = async (logoutTime, userId) => {
  return prisma.attendance.create({
    data: {
      logout: logoutTime,
      users_id: userId,
    },
  });
};

export const updateLoginTimeService = async (loginTime, userId) => {
  return prisma.attendance.create({
    data: {
      login: loginTime,
      users_id: userId,
    },
  });
};

export const updateLogoutTimeService = async (logoutTime, userId) => {
  return prisma.attendance.create({
    data: {
      logout: logoutTime,
      users_id: userId,
    },
  });
};
