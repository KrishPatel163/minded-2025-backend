import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Import routes for user
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

// Import the error middleware function
import { ErrorMiddleware } from "./middleware/error.middleware.js";
app.use(ErrorMiddleware);

export { app };
