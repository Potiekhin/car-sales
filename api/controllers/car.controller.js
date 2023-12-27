import Car from "../models/car.model.js";
import { uploadFile } from "../utils/googleHelper.js";

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
    const images = []
    for (let i = 0; i < files.length; i += 1) {
      const imageObj = await uploadFile(files[i]);
      images.push(imageObj);
  }
  console.log(images);
  res.status(200).json(images);
  } catch (error) {
    next(error);
  }
};
