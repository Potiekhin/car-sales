import { Link } from "react-router-dom";

export default function CarItem({ car }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden m-5 rounded-lg w-full sm:w-[330px]">
      <Link to={`/car/${car._id}`}>
        <img
          src={car.images[0].url}
          alt="car"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <div className="flex gap-2">
            <p className="truncate text-lg font-semibold text-slate-700">
              {car.brand} {car.model}
            </p>
            <p className="truncate text-lg font-semibold text-slate-700">
              ${car.price}
            </p>
          </div>
          <div>
            <p className="line-clamp-3">{car.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
