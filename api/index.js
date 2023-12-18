import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

mongoose
  .connect(process.env.MDB_URL)
  .then(console.log("Connected to Mongo DB"))
  .catch((err) => {
    console.error(err);
  });

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
