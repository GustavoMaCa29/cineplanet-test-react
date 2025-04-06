import React from "react";
import { usePremieres } from "../../hooks/usePremieres";
import Slider from "../../shared/components/Slider/Slider";
import Carousel from "../../shared/components/Carousel/Carousel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home: React.FC = () => {
  const { premieres, loading, error } = usePremieres();

  return (
    <div className="home-container">
      <Slider />

      <div className="container">
        <h2 className="mb-4 fw-bold">EN CARTELERA</h2>

        {loading ? (
          <div className="row">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="col-md-3 col-sm-6 mb-4">
                <div className="bg-white p-3 h-100">
                  <Skeleton height={150} className="mb-2" />
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={15} width="60%" className="mb-2" />
                  <Skeleton height={30} width="100%" />
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