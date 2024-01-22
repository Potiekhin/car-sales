import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddCar() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    color: "",
    driveType: "",
    transmissionType: "",
    year: 0,
    price: 0,
    description: "",
    transmission: "",
    fuel: "",
    mileAge: 0,
    engine: "",
    gearbox: "",
    doors: "",
    seats: "",
    colour: "",
    engineCapacity: 0,
    enginePower: 0,
    batteryCapacity: 0,
    engineType: "",
    available: false,
    top: false,
    images: [],
  });

  const navigate = useNavigate();

  const handleImageSubmit = async () => {
    const imagesFormData = new FormData();
    if (files.length > 0) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        imagesFormData.append("images", files[i]);
      }

      const response = await fetch("/api/car/upload", {
        method: "POST",
        body: imagesFormData,
      });
      const data = await response.json();
      setFormData({ ...formData, images: data });
      setFiles([]);
      setLoading(false);
      setError(false);
    }
  };

  const handleImagesChange = (e) => {
    const filesArray = [...files, ...e.target.files];
    const uniqueArray = filesArray.filter(
      (obj, index) =>
        filesArray.findIndex((item) => item.name === obj.name) === index
    );
    setFiles(uniqueArray);
  };

  const revoveFile = (fileName) => {
    setFiles((files) => files.filter((file) => file.name !== fileName));
  };

  const removeImage = async (id) => {
    await fetch(`/api/car/remove/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const data = await response.json();
    // console.log(data);
    setFormData({
      ...formData,
      images: formData.images.filter((image) => image.id !== id),
    });
  };

  const handleFormData = (e) => {
    if (e.target.type === "checkbox") {
      const name = e.target.id;
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.images.length < 1)
        return setError("minimum one image required");
      setLoading(true);
      setError(false);

      const res = await fetch("/api/car/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, uploader: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/car/${data._id}`);
    } catch (error) {}
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center my-7">Add car</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            onChange={handleFormData}
            value={formData.brand}
            type="text"
            placeholder="Brand"
            className="border p-3 rounded-lg focus:outline-none"
            id="brand"
            required
            minLength="2"
            maxLength="62"
          />
          <input
            onChange={handleFormData}
            value={formData.color}
            type="text"
            placeholder="Color"
            className="border p-3 rounded-lg focus:outline-none"
            id="color"
            required
            minLength="2"
            maxLength="62"
          />
          <input
            onChange={handleFormData}
            value={formData.driveType}
            type="text"
            placeholder="Drive Type"
            className="border p-3 rounded-lg focus:outline-none"
            id="driveType"
            required
            minLength="2"
            maxLength="62"
          />
          <input
            onChange={handleFormData}
            value={formData.transmissionType}
            type="text"
            placeholder="Transmission Type"
            className="border p-3 rounded-lg focus:outline-none"
            id="transmissionType"
            required
            minLength="2"
            maxLength="62"
          />
          <input
            onChange={handleFormData}
            value={formData.model}
            type="text"
            placeholder="Model"
            className="border p-3 rounded-lg focus:outline-none"
            id="model"
            required
            minLength="2"
            maxLength="62"
          />
          <textarea
            onChange={handleFormData}
            value={formData.description}
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg focus:outline-none"
            id="description"
            required
            minLength="2"
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                onChange={handleFormData}
                type="checkbox"
                id="available"
                value={formData.available}
                className="w-5"
                checked={formData.available}
              />
              <span>available</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleFormData}
                type="checkbox"
                id="top"
                value={formData.top}
                className="w-5"
                checked={formData.top}
              />
              <span>top</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                onChange={handleFormData}
                value={formData.mileAge}
                type="number"
                className="border p-3 rounded-lg border-gray-300 focus:outline-none"
                id="mileAge"
                required
                min="1"
                max="1000000"
              />
              <span>Mile Age</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleFormData}
                value={formData.year}
                type="number"
                className="border p-3 rounded-lg border-gray-300 focus:outline-none"
                id="year"
                required
                min="1"
                max="3000"
              />
              <span>Year</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleFormData}
                value={formData.engineCapacity}
                type="number"
                className="border p-3 rounded-lg border-gray-300 focus:outline-none"
                id="engineCapacity"
                min="1"
                max="3000"
              />
              <span>Engine Capacity</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleFormData}
                value={formData.enginePower}
                type="number"
                className="border p-3 rounded-lg border-gray-300 focus:outline-none"
                id="enginePower"
                min="1"
                max="1000000"
              />
              <div className="flex flex-col items-center">
                <span>Engine Power</span>
                <span>(hp)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleFormData}
                value={formData.batteryCapacity}
                type="number"
                className="border p-3 rounded-lg border-gray-300 focus:outline-none"
                id="batteryCapacity"
                min="1"
                max="1000000"
              />
              <div className="flex flex-col items-center">
                <span>Battery Capacity</span>
                <span>(kW/h)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleFormData}
                value={formData.price}
                type="number"
                className="border p-3 rounded-lg border-gray-300 focus:outline-none"
                id="price"
                required
                min="1"
                max="1000000"
              />
              <span>Price</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <select
            id="fuel"
            onChange={handleFormData}
            value={formData.fuel}
            className="border p-3 rounded-lg"
          >
            <option value="Gasoline">Gasoline</option>
            <option value="Gas">Gas</option>
            <option value="Disel">Disel</option>
            <option value="Electro">Electro</option>
            <option value="Gasoline/Gas">Gasoline/Gas</option>
          </select>
          <input
            onChange={handleFormData}
            value={formData.engineType}
            type="text"
            placeholder="Engine Type"
            className="border p-3 rounded-lg focus:outline-none"
            id="engineType"
            required
            minLength="2"
            maxLength="62"
          />
          <span className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The firs image will be cover
            </span>
          </span>
          <div className="flex gap-4">
            {loading ? (
              <div className="p-3 text-green-700 border border-green-700 rounded uppercase">
                images uploading please wait...
              </div>
            ) : (
              <>
                <input
                  onChange={handleImagesChange}
                  className="p-3 border border-gray-300 rounded w-full"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
                <button
                  onClick={handleImageSubmit}
                  type="button"
                  className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                >
                  Upload
                </button>
              </>
            )}
          </div>
          {files.length > 0 &&
            files.map((image, index) => (
              <div
                className="flex justify-between p-3 border items-center"
                key={index}
              >
                <div>{image.name}</div>
                <button
                  onClick={() => revoveFile(image.name)}
                  type="button"
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          {formData.images &&
            formData.images.map((image) => (
              <div
                key={image.id}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 object-contain rounded-lg"
                  src={image.url}
                  alt="car image"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  type="button"
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading" : "Add car"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
