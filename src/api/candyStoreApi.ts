import axios from "axios";

export const getCandyProducts = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/candy-store-products`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos de la tienda:", error);
    throw error;
  }
};