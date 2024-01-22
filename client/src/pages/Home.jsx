import { useEffect, useState } from "react";
import CarItem from "../components/CarItem";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [cars, setCars] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSelled, setShowSelled] = useState(true);
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    const fetchAllCar = async () => {
      try {
        const url = generateURLWithSearchParams();
        setLoading(true);
        const res = await fetch(url);
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
    fetchAllCar();
  }, [searchParams]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const url = "/api/car/get-brands";
        const res = await fetch(url);
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const generateURLWithSearchParams = () => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        updatedSearchParams.set(key, value);
      } else {
        updatedSearchParams.delete(key);
      }
    });

    return `/api/car/get?${updatedSearchParams}`;
  };

  const handleBrandChange = (e) => {
    if (e.target.value !== "all") {
      setSearchParams({ brand: e.target.value });
    } else {
      setSearchParams({ brand: "" });
      searchParams.delete("brand");
    }
  };

  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
     const [sortField, sortOrder] = selectedValue.split(':');
     const newSearchParams = {
       sort: sortField,
       order: sortOrder || 'desc', 
     };
     const updatedSearchParams = new URLSearchParams(searchParams);
     updatedSearchParams.set('sort', sortField);
     updatedSearchParams.set('order', newSearchParams.order);
     setSearchParams(updatedSearchParams);
  };

  const handleSelledCarsChange = () => {
    const currentAvailableValue = searchParams.get('available') === 'true';
    const newAvailableValue = !currentAvailableValue;
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('available', newAvailableValue.toString());
    setSearchParams(updatedSearchParams);
  };

  return (
    <div className="max-w-7xl justify-center m-auto">
      <div className="flex flex-wrap justify-center mt-5 gap-3">
        <select
          onChange={handleBrandChange}
          id="brands"
          className="border p-1 rounded-lg"
        >
          <option value="all">all brands</option>
          {brands &&
            brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
        </select>
        <select onChange={handleSortChange} id="brands" className="border p-1 rounded-lg">
          <option value="default">sorting by</option>
          <option value="views">popular</option>
          <option value="createdAt">last added</option>
          <option value="price:asc">price ascending</option>
          <option value="price:desc">price descending</option>
        </select>
        <div className="flex items-center gap-2">
          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer"
            htmlFor="flexSwitchCheckDefault"
          >
            Show selled cars
          </label>
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-blue-400 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-blue-400 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onChange={handleSelledCarsChange}
            checked={searchParams.get('available') !== 'true'}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-5 ">
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && (
          <p className="text-center my-7 text-2xl">Something went wrong!</p>
        )}
        {cars &&
          !loading &&
          !error &&
          cars.length > 0 &&
          cars.map((car, index) =>
            !showSelled && !car.available ? (
              ""
            ) : (
              <CarItem key={index} car={car} />
            )
          )}
      </div>
    </div>
  );
}
