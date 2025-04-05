import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getCandyProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/candy-store-products`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos de la tienda:", error);
    throw error;
  }
};