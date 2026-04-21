import * as attendanceServices from "../services/attendance.service.js";

export const loginUserController = async (req, res) => {
  const { loginTime } = req.body;
  const { userId } = req.params;

  try {
    if (!req.user) {
      console.log("Unauthorized: Please login to manage attendance");
      return res
        .status(401)
        .json({ error: "Unauthorized: Please login to manage attendance" });
    }

    const login = await attendanceServices.loginUserService(loginTime, userId);
    res.status(201).json({ message: "User logged in", login });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const logoutUserController = async (req, res) => {
  const { logoutTime } = req.body;
  const { userId } = req.params;

  try {
    if (!req.user) {
      console.log("Unauthorized: Please login to manage attendance");
      return res
        .status(401)
        .json({ error: "Unauthorized: Please login to manage attendance" });
    }

    const logout = await attendanceServices.logoutUserService(
      logoutTime,
      userId,
    );
    res.status(201).json({ message: "User logged out", login });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateLoginTimeController = async (req, res) => {
  const { loginTime } = req.body;
  const { userId } = req.params;

  try {
    if (!req.user) {
      console.log("Unauthorized: Please login to manage attendance");
      return res
        .status(401)
        .json({ error: "Unauthorized: Please login to manage attendance" });
    }

    const login = await attendanceServices.updateLoginTimeService(
      loginTime,
      userId,
    );
    res.status(200).json({ message: "Updated login time", login });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateLogoutTimeController = async (req, res) => {
  const { logoutTime } = req.body;
  const { userId } = req.params;

  try {
    if (!req.user) {
      console.log("Unauthorized: Please login to manage attendance");
      return res
        .status(401)
        .json({ error: "Unauthorized: Please login to manage attendance" });
    }

    const logout = await attendanceServices.updateLogoutTimeService(
      logoutTime,
      userId,
    );
    res.status(200).json({ message: "Updated logout time", logout });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
