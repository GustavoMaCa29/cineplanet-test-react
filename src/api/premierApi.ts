import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/premieres";

export const getAllPremierMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener películas en preventa:", error);
    throw error;
  }
};