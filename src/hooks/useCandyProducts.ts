import { useEffect, useState } from "react";
import { getCandyProducts } from "../api/candyStoreApi";

export const useCandyProducts = () => {
  const [products, setProducts] = useState<CandyProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getCandyProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Error al obtener los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};