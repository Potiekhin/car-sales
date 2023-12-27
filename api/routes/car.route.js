import express from "express";
import { createCar, uploadImages } from "../controllers/car.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post("/create", verifyToken, createCar);
router.post("/upload", upload.any(), uploadImages);

export default router;
