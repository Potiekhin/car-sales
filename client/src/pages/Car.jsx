import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css/bundle";

export default function Car() {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  SwiperCore.use([Navigation]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const params = useParams();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/car/get/${params.carId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        if (localStorage.getItem("viewedCars") === null) {
          localStorage.setItem("viewedCars", JSON.stringify([params.carId]));
          fetch(`/api/car/add-view/${params.carId}`);
        } else {
          const viewedCars = JSON.parse(localStorage.getItem("viewedCars"));
          if (!viewedCars.includes(params.carId)) {
            viewedCars.push(params.carId);
            localStorage.setItem("viewedCars", JSON.stringify(viewedCars));
            fetch(`/api/car/add-view/${params.carId}`);
          }
        }
        setCar(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCar();
  }, [params.carId]);

  const handleViewImage = () => {
    navigate("/car/:carId/images", {
      state: {
        images: car.images,
      },
    });
  };

  return (
    <main className="max-w-7xl m-auto mt-5">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {car && !loading && !error && car.images.length && (
        <>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            // spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {car.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  onClick={handleViewImage}
                  referrerPolicy="no-referrer"
                  className="block mx-auto w-full max-w-[640px] h-auto sm:max-w-[768px] md:max-w-[1024px] lg:max-w-[1280px]"
                  src={image.url}
                  alt="car"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={windowWidth > 1023 ? 5 : windowWidth > 767 ? 4 : 3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="bg-slate-700 p-2"
          >
            {car.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image.url} alt="car" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="max-w-5xl mt-5 m-auto ">
            <div className="flex justify-between mb-3">
              <div>some text</div>
              <div>some value</div>
            </div>
            <hr />
          </div>
          <div className="max-w-5xl mt-5 m-auto ">
            <div className="flex justify-between mb-3">
              <div>some text</div>
              <div>some value</div>
            </div>
            <hr />
          </div>
          <div className="max-w-5xl mt-5 m-auto ">
            <div className="flex justify-between mb-3">
              <div>some text</div>
              <div>some value</div>
            </div>
            <hr />
          </div>
          <div className="max-w-5xl mt-5 m-auto ">
            <div className="flex justify-between mb-3">
              <div>some text</div>
              <div>some value</div>
            </div>
            <hr />
          </div>
            <div className="max-w-5xl mt-5 m-auto ">
              <div className="flex justify-between mb-3">
                <div>car views</div>
                <div>{car.views}</div>
              </div>
            </div>
          <div className="max-w-5xl mt-5 m-auto ">
            <p>{car.description}</p>
          </div>
        </>
      )}
    </main>
  );
}
