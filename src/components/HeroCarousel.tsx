import React from "react";
import { Carousel } from "react-bootstrap";

// Componente para el Carrusel principal de la página
const HeroCarousel: React.FC = () => (
  <Carousel className="mb-5">
    {[1, 2, 3].map((num) => (
      <Carousel.Item key={num}>
        <div style={{ width: "100%", height: "320px", background: "grey" }}></div>
        <Carousel.Caption>
          <h3>Película {num}</h3>
          <p>Descripción de la película {num}.</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

export default HeroCarousel;