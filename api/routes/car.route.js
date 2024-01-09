import express from "express";
import { createCar, removeImage, uploadImages, getCar } from "../controllers/car.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post("/create", verifyToken, createCar);
router.post("/upload", upload.any(), verifyToken, uploadImages);
router.delete("/remove/:id", verifyToken, removeImage);
router.get("/get/:id", getCar);

export default router;
