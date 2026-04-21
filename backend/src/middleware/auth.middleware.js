// Import libraries and instances to protect API endpoints
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.orm.js";

export const protectAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // Throw error if headers are invalid or missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.users.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    // Throw error if token is not provided
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: token not provided" });
    }

    // Throw error if user is not tagged with token
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
};
