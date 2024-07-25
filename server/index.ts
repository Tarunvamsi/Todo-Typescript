import express from "express";
import dotenv, { configDotenv } from "dotenv";
import cors from "cors";
import { DB_URL, requiredEnvVariables } from "./utils/constants";
import { authRouter, todoRouter } from "./routes";
import mongoose from "mongoose";

initialize();

const app = express();

app.use(express.json());
app.use(cors());

// Routers
app.use(authRouter);
app.use(todoRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function initialize() {
  // Load env config
  configDotenv();
  validateEnvConfig();

  // Establish DB connection
  connectToDB();
}

function connectToDB() {
  mongoose
    .connect(DB_URL)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error", err));
}

function validateEnvConfig() {
  for (let envVar of requiredEnvVariables) {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable ${envVar} is missing.`);
    }
  }
}
