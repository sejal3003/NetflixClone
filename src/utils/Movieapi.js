import axios from "axios";

export const fetchMovies = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/movies/");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/genres/import");
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

// Fetch movies by genre
export const fetchMoviesByGenre = async (genre) => {
  try {
    const url = `http://localhost:8000/api/movies/list?genre=${genre}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};
