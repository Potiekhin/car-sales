import Car from "../models/car.model.js";
import { uploadFile, deleteFile } from "../utils/googleHelper.js";

export const createCar = async (req, res, next) => {
  try {
    const car = await Car.create(req.body);
    return res.status(201).json(car);
  } catch (error) {
    next(error);
  }
};

export const uploadImages = async (req, res, next) => {
  try {
    const { body, files } = req;
    const images = [];
    for (let i = 0; i < files.length; i += 1) {
      const imageObj = await uploadFile(files[i]);
      images.push(imageObj);
    }
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
};

export const removeImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteFile(id);
    res
      .status(200)
      .json({ message: "Successfully deleted", status: "success", stausCode: response.status });
  } catch (error) {
    next(error);
  }
};
