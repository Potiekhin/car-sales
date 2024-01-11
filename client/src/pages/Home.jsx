import { useEffect, useState } from "react";
import CarItem from "../components/CarItem";

export default function Home() {
  const [cars, setCars] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllCar = async () => {
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
    fetchAllCar();
  }, []);
  return (
    <div className="max-w-7xl justify-center m-auto">
      <div className="flex flex-wrap justify-center mt-5 ">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {
        cars && !loading && !error && cars.length > 0 && cars.map((car, index)=> (
          <CarItem key={index} car={car}/>
        )) 
      }
    </div>
    </div>
    
  );
}
