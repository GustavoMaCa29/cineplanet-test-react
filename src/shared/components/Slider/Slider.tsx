import React from "react";
import { Carousel as BootstrapCarousel } from "react-bootstrap";
import styles from "./Slider.module.scss";

const FeaturedCarousel: React.FC = () => {
  return (
    <BootstrapCarousel className="mb-5">
      <BootstrapCarousel.Item className={styles["carousel-item"]}>
        <div className={styles["carousel-item"]}></div>
        <BootstrapCarousel.Caption>
          <h3>Primera Película</h3>
          <p>Una descripción de la primera película.</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
      <BootstrapCarousel.Item className={styles["carousel-item"]}>
        <div className={styles["carousel-item"]}></div>
        <BootstrapCarousel.Caption>
          <h3>Segunda Película</h3>
          <p>Una descripción de la segunda película.</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
      <BootstrapCarousel.Item className={styles["carousel-item"]}>
        <div className={styles["carousel-item"]}></div>
        <BootstrapCarousel.Caption>
          <h3>Tercera Película</h3>
          <p>Una descripción de la tercera película.</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
    </BootstrapCarousel>
  );
};

export default FeaturedCarousel;