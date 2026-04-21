import prisma from "./prisma.orm.js";

export const connectDB = async () => {
  try {
    // ensures connection pool is initialized
    await prisma.$connect();

    console.log("Connected to PostgreSQL DB");
  } catch (error) {
    console.error("Failed to connect to PostgreSQL DB", error.message);
    process.exit(1);
  }
};
