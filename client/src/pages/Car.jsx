import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
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

  return (
    <main className="max-w-7xl m-auto">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {car && !loading && !error && car.images.length && (
        <>
          <Swiper
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }}
            loop={true}
            // spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {car.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[600px]"
                  style={{
                    background: `url(${image.url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            // spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="bg-slate-700"
          >
            {car.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[150px]"
                  style={{
                    background: `url(${image.url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
}
