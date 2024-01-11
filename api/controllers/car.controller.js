import Car from "../models/car.model.js";
import { errorHandler } from "../utils/error.js";
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
    res.status(200).json({
      message: "Successfully deleted",
      status: "success",
      stausCode: response.status,
    });
  } catch (error) {
    next(error);
  }
};

export const getCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findOne({ _id: id });
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};

export const getAllCars = async (req, res, next) => {
  try {
    const allCars = await Car.find();
    res.status(200).json(allCars);
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return next(errorHandler(404, "Car no found!"));
    }
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCar);
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return next(errorHandler(404, "Car no found!"));
    }

    for (let i = 0; i < car.images.length; i += 1) {
      const response = await deleteFile(car.images[i].id);
    }

    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json("car has been deleted");
  } catch (error) {
    next(error);
  }
};
