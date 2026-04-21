import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./lib/prisma.js";
import userRouter from "./api/routes/user.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
};

startServer();
