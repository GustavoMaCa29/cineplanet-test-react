import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/candy-store-products";

export const getCandyProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos de la tienda:", error);
    throw error;
  }
};