import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getAllPremierMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/premieres`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener películas en preventa:", error);
    throw error;
  }
};