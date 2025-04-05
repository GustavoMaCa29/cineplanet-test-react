import axios from "axios";

export const getAllPremierMovies = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/premieres`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener películas en preventa:", error);
    throw error;
  }
};