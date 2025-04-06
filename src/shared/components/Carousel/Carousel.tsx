import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styles from "./Carousel.module.scss";

interface CarouselProps {
  premieres: Premiere[];
}

const Carousel: React.FC<CarouselProps> = ({ premieres }) => {
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState<{ [index: number]: boolean }>({});

  const handleClick = (movie: Premiere) => {
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
      {premieres.length === 0 ? (
        Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={styles.movieCard}>
            <Skeleton height={380} width={250} className="mb-2" />
            <Skeleton height={20} width="80%" />
            <Skeleton height={15} width="60%" />
          </div>
        ))
      ) : (
        premieres.map((movie, index) => (
          <div key={index} className={styles.movieCard} onClick={() => handleClick(movie)}>
            <div className="position-relative" style={{ height: "380px", width: "250px" }}>
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
        ))
      )}
    </Slider>
  );
};

export default Carousel;