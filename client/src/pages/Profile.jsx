import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signOutFailure, signOutStart, signOutSuccess } from "../redux/user/userSlice";

export default function Profile() {
  const [cars, setCars] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowCars = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/car/get");
      const data = await res.json();

      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }

      setCars(data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/car/delete/${carId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setCars((prev) => prev.filter((car) => car._id !== carId));
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailure(error));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold text-center my-7">Profile</h2>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 v-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
        <Link
          to="/add-car"
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
        >
          add car
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <button onClick={handleShowCars} className="text-green-700 w-full">
        {loading ? "Loading..." : "Show cars"}
      </button>
      <p className="text-red-700 mt-5">{error ? "Error showing cars" : ""}</p>
      {loading ? <p className="text-slate-700 mt-5">Loading...</p> : cars &&
        cars.map((car, index) => (
          <div
            className="border rounded-lg p-3 flex justify-between items-center gap-4 mt-3"
            key={index}
          >
            <Link to={`/car/${car._id}`}>
              <img
                src={car.images[0].url}
                alt="car"
                className="h-16 w-16 object-contain"
              />
            </Link>
            <Link
              className="flex-1 text-slate-700 font-semibold hover:underline truncate"
              to={`/car/${car._id}`}
            >
              <p>{`${car.brand} ${car.model} ${car.year}`}</p>
            </Link>
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleDeleteCar(car._id)}
                className="text-red-700 uppercase"
              >
                Delete
              </button>
              <Link to={`/update-car/${car._id}`}>
                <button className="text-green-700 uppercase">Edit</button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
