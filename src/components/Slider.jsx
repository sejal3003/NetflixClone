import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";
import axios from "axios";
import { useSearch } from "../components/Context/SearchContext";
import { useGenre } from "./Context/GenreContext";

export default React.memo(function Slider() {
  const [categoryMovies, setCategoryMovies] = useState({});
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const { searchResults, searchInput } = useSearch();
  const { selectedGenre, movies: genreMovies, error: genreError } = useGenre();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/movies/category"
      );
      const fetchedCategories = response.data;

      // Define the desired sequence of categories
      const desiredSequence = [
        "Trending Now",
        "New Releases",
        "Blockbuster Movies",
        "Popular on NetaFilm",
        "Action Movies",
        "Epics",
      ];

      // Sort the fetched categories based on their index in the desired sequence
      const sortedCategories = fetchedCategories.sort((a, b) => {
        const indexA = desiredSequence.indexOf(a);
        const indexB = desiredSequence.indexOf(b);

        // If a category is not found in the desired sequence, it is placed below "Epics"
        if (indexA === -1) return 1; // Place category A below "Epics"
        if (indexB === -1) return -1; // Place category B below "Epics"
        return indexA - indexB;
      });

      setCategories(sortedCategories);
    } catch (error) {
      setError(error.message || "An error occurred while fetching categories.");
    }
  };

  const fetchMoviesByCategory = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/movies/get/${category}`
      );
      setCategoryMovies((prev) => ({
        ...prev,
        [category]: response.data,
      }));
    } catch (error) {
      setError(error.message || "An error occurred while fetching movies.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach(fetchMoviesByCategory);
    }
  }, [categories]);

  const getMoviesFromCategory = (category) => {
    if (selectedGenre) {
      return categoryMovies[category]
        ? categoryMovies[category].filter((movie) =>
            movie.genre.includes(selectedGenre)
          )
        : [];
    }
    return categoryMovies[category] || [];
  };

  const filteredMovies =
    searchResults.length > 0 ? searchResults : selectedGenre ? genreMovies : [];

  return (
    <Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {/* {genreError && <ErrorMessage>{genreError}</ErrorMessage>} */}
      {searchResults.length > 0 && searchInput !== null ? (
        <CardSlider data={searchResults} title="Searched Movie" />
      ) : (
        categories.map((category) => (
          <CardSlider
            key={category}
            data={getMoviesFromCategory(category)}
            title={category}
          />
        ))
      )}
    </Container>
  );
});

const Container = styled.div``;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;
