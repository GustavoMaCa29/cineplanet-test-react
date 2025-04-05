import React, { useEffect, useState } from "react";
import { Carousel as BootstrapCarousel } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllPremierMovies } from "../api/premierApi";
import Carousel from "../components/Carousel/Carousel";

interface Premiere {
  title: string;
  description: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [premieres, setPremieres] = useState<Premiere[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPremieres = async () => {
      try {
        const data = await getAllPremierMovies();
        setPremieres(data);
      } catch {
        setError("Hubo un error al cargar las películas");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPremieres();
  }, []);

  return (
    <div className="home-container">
      <BootstrapCarousel className="mb-5">
        <BootstrapCarousel.Item>
          <div style={{ width: "100%", height: "320px", background: "grey" }}></div>
          <BootstrapCarousel.Caption>
            <h3>Primera Película</h3>
            <p>Una descripción de la primera película.</p>
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <div style={{ width: "100%", height: "320px", background: "grey" }}></div>
          <BootstrapCarousel.Caption>
            <h3>Segunda Película</h3>
            <p>Una descripción de la segunda película.</p>
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <div style={{ width: "100%", height: "320px", background: "grey" }}></div>
          <BootstrapCarousel.Caption>
            <h3>Tercera Película</h3>
            <p>Una descripción de la tercera película.</p>
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>
      </BootstrapCarousel>

      <div className="container">
        <h2 className="mb-4 fw-bold" >EN CARTELERA</h2>

        {loading ? (
          <div className="row">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="col-md-3 col-sm-6 mb-4">
                <Skeleton height={200} />
                <Skeleton count={2} style={{ marginTop: "0.5rem" }} />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <Carousel premieres={premieres} />
        )}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Home;