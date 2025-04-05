import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styles from "./Carousel.module.scss";
import { useNavigate } from "react-router-dom";

interface Movie {
  title: string;
  description: string;
  imageUrl: string;
}

interface CarouselProps {
  premieres: Movie[];
}

const Carousel: React.FC<CarouselProps> = ({ premieres }) => {
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState<{ [index: number]: boolean }>({});

  const handleClick = (movie: Movie) => {
    console.log("Película seleccionada:", movie);
    navigate("/login");
  };

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2.5 } },
      { breakpoint: 768, settings: { slidesToShow: 1.5 } },
    ],
  };

  return (
    <Slider {...settings} className={styles.slickSlider}>
      {premieres.map((movie, index) => (
        <div key={index} className={styles.movieCard} onClick={() => handleClick(movie)}>
          <div className="position-relative" style={{ height: "380px", width:"250px" }}>
            {!loadedImages[index] && (
              <div className="d-flex justify-content-center align-items-center w-100 h-100 bg-light">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            )}
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className={`${styles.movieImage} w-100 h-100`}
              style={{ display: loadedImages[index] ? "block" : "none", objectFit: "cover" }}
              onLoad={() =>
                setLoadedImages((prev) => ({
                  ...prev,
                  [index]: true,
                }))
              }
            />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;