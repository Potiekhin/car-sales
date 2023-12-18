import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js"

mongoose
  .connect(process.env.MDB_URL)
  .then(console.log("Connected to Mongo DB"))
  .catch(err => {
    console.error(err)
  });

const app = express();

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);

app.use("/api/user", userRouter)
