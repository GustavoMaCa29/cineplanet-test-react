import { useEffect, useState } from "react";
import { getAllPremierMovies } from "../api/premierApi";

export const usePremieres = () => {
  const [premieres, setPremieres] = useState<Premiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPremierMovies();
        setPremieres(data);
      } catch {
        setError("Hubo un error al cargar las películas");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { premieres, loading, error };
};