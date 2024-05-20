import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const GenreContext = createContext();

export const useGenre = () => useContext(GenreContext);

export const GenreProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const fetchMoviesByGenre = async (genre) => {
    try {
      console.log(`http://localhost:8000/api/movies/list?genre=${genre}`);
      const response = await axios.get(
        `http://localhost:8000/api/movies/list?genre=${genre}`
      );
      setMovies(response.data);
    } catch (error) {
      setError(error.message || "An error occurred while fetching movies.");
    }
  };

  useEffect(() => {
    if (selectedGenre) {
      fetchMoviesByGenre(selectedGenre);
    } else {
      const fetchAllMovies = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/movies/");
          setMovies(response.data);
        } catch (error) {
          setError(error.message || "An error occurred while fetching movies.");
        }
      };
      fetchAllMovies();
    }
  }, [selectedGenre]);
  //   useEffect(() => {
  //     const fetchMoviesByGenre = async () => {
  //       if (selectedGenre) {
  //         try {
  //           const response = await axios.get(
  //             `http://localhost:8000/api/movies/list?genre=${selectedGenre}`
  //           );
  //           setGenreMovies(response.data);
  //         } catch (error) {
  //           setError(
  //             error.message || "An error occurred while fetching genre movies."
  //           );
  //         }
  //       }
  //     };

  //     fetchMoviesByGenre();
  //   }, [selectedGenre]);
  return (
    <GenreContext.Provider
      value={{ selectedGenre, setSelectedGenre, movies, error }}
    >
      {children}
    </GenreContext.Provider>
  );
};
