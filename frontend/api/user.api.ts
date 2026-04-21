import axios from "axios";
import { apiUrl } from "./apiUrl";

export const loginUserAPI = async (email: string, password: string) => {
  return axios.post(`${apiUrl}/users/login`, { email, password });
};

export const registerAdminAPI = async (
  name: string,
  email: string,
  password: string,
  userType: string,
) => {
  return axios.post(`${apiUrl}/users/register/admin`, {
    name,
    email,
    password,
    userType,
  });
};

export const registerModeratorAPI = async (
  name: string,
  email: string,
  password: string,
  userType: string,
) => {
  return axios.post(`${apiUrl}/users/register/moderator`, {
    name,
    email,
    password,
    userType,
  });
};

export const registerWorkerAPI = async (name: string) => {
  return axios.post(`${apiUrl}/users/register/worker`, {
    name,
  });
};

export const fetchAllUsersAPI = async () => {
  return axios.get(`${apiUrl}/users/all`);
};

export const approveUserAPI = async (userId: string, token: string) => {
  return axios.patch(
    `${apiUrl}/users/approve/${userId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const disapproveUserAPI = async (userId: string, token: string) => {
  return axios.patch(
    `${apiUrl}/users/disapprove/${userId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const resetPasswordAPI = async (email: string) => {
  return axios.patch(`${apiUrl}/users/reset-password`, { email });
};

export const changePasswordAPI = async (
  oldPassword: string,
  newPassword: string,
  token: string,
) => {
  return axios.put(
    `${apiUrl}/users/change-password`,
    {
      oldPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const setPaymentAPI = async (
  userId: string,
  dailyPayment: number,
  token: string,
) => {
  return axios.put(
    `${apiUrl}/users/set-payment/${userId}`,
    {
      dailyPayment,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteUserAPI = async (
  userId: string,
  token: string
) => {
  return axios.delete(
    `${apiUrl}/users/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
