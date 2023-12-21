import express from "express";
import { createCar } from "../controllers/car.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createCar);

export default router;
