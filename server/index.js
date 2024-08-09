import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// local imports
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();

// connect mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter);

// error middlewar
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
