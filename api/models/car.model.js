import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    mileAge: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    engineType: {
        type: String,
        required: true,
    },
    engineCapacity: {
        type: Number,
        required: false,
    },
    enginePower: {
        type: Number,
        required: false,
    },
    batteryCapacity: {
        type: Number,
        required: false,
    },
    transmissionType: {
        type: String,
        required: true,
    },
    driveType : {
        type: String,
        required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: {
        type: Array,
        required: true,
    },
    uploader: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
