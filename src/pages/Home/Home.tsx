import React from "react";
import { usePremieres } from "../../hooks/usePremieres";
import FeaturedCarousel from "../../components/FeaturedCarousel";
import Carousel from "../../components/Carousel/Carousel";

const Home: React.FC = () => {
  const { premieres, loading, error } = usePremieres();

  return (
    <div className="home-container">
      <FeaturedCarousel />

      <div className="container">
        <h2 className="mb-4 fw-bold">EN CARTELERA</h2>

        {loading ? (
          <div className="row">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="col-md-3 col-sm-6 mb-4">
                <div className="bg-light h-100 d-flex justify-content-center align-items-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <Carousel premieres={premieres} />
        )}
        <br />
      </div>
    </div>
  );
};

export default Home;