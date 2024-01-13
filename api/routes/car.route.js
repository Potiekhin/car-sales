import express from "express";
import {
  createCar,
  removeImage,
  uploadImages,
  getCar,
  getAllCars,
  deleteCar,
  updateCar,
  addView,
} from "../controllers/car.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post("/create", verifyToken, createCar);
router.post("/upload", upload.any(), verifyToken, uploadImages);
router.delete("/remove/:id", verifyToken, removeImage);
router.get("/get/:id", getCar);
router.get("/get", getAllCars);
router.post("/update/:id", verifyToken, updateCar);
router.get("/add-view/:id", addView);
router.delete("/delete/:id", deleteCar);

export default router;
