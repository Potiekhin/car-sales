export default function AddCar() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center my-7">Add car</h2>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Brand"
            className="border p-3 rounded-lg focus:outline-none"
            id="brand"
            required
            minLength="2"
            maxLength="62"
          />
          <input
            type="text"
            placeholder="Model"
            className="border p-3 rounded-lg focus:outline-none"
            id="model"
            required
            minLength="2"
            maxLength="62"
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg focus:outline-none"
            id="description"
            required
            minLength="2"
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="available" className="w-5" />
              <span>available</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input
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
          <select className="border p-3 rounded-lg" >
            <option value="1">Gasoline</option>
            <option value="2">Gas</option>
            <option value="3">Disel</option>
            <option value="4">Electro</option>
            <option value="5">Gasoline/Gas</option>
          </select>
          <input
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
              The firs image will be cover (max 6)
            </span>
          </span>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Add car
          </button>
        </div>
      </form>
    </main>
  );
}