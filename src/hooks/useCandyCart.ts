import { useState, useEffect } from "react";

export const useCandyCart = () => {
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});

  useEffect(() => {
    const savedCart = localStorage.getItem("candyCart");
    if (savedCart) {
      setQuantities(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("candyCart", JSON.stringify(quantities));
  }, [quantities]);

  const increase = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrease = (id: number) => {
    setQuantities((prev) => {
      if (!prev[id]) return prev;
      const updatedCount = prev[id] - 1;
      if (updatedCount <= 0) {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      }
      return { ...prev, [id]: updatedCount };
    });
  };

  return { quantities, increase, decrease };
};