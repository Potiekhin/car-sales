import Car from "../models/car.model.js";

export const createCar = async (req, res, next) => {
  try {
    const car = await Car.create(req.body);
    return res.status(201).json(car);
  } catch (error) {
    next(error);
  }
};
