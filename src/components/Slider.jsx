import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";
import axios from "axios";
import { useSearch } from "../components/Context/SearchContext";
import { useGenre } from "./Context/GenreContext";

export default React.memo(function Slider() {
  const [categoryMovies, setCategoryMovies] = useState({});
  const [error, setError] = useState(null);
  const { searchResults, searchInput } = useSearch();
  const { selectedGenre, movies: genreMovies, error: genreError } = useGenre();

  const categories = [
    "Trending Now",
    "New Releases",
    "Blockbuster Movies",
    "Popular on NetaFlim",
    "Action Movies",
    "Epics",
  ];

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
    if (!selectedGenre) {
      const fetchAllMovies = async () => {
        for (const category of categories) {
          await fetchMoviesByCategory(category);
        }
      };
      fetchAllMovies();
    }
  }, [selectedGenre]);

  const getMoviesFromRange = (category, from, to) => {
    return categoryMovies[category]
      ? categoryMovies[category].slice(from, to)
      : [];
  };

  const filteredMovies =
    searchResults.length > 0 ? searchResults : selectedGenre ? genreMovies : [];

  return (
    <Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {genreError && <ErrorMessage>{genreError}</ErrorMessage>}
      {searchResults.length > 0 && searchInput !== null ? (
        <CardSlider data={searchResults} title="Searched Movie" />
      ) : selectedGenre ? (
        <CardSlider data={filteredMovies} title={`${selectedGenre} Movies`} />
      ) : (
        <>
          <CardSlider
            data={getMoviesFromRange("Trending Now", 0, 10)}
            title="Trending Now"
          />
          <CardSlider
            data={getMoviesFromRange("New Releases", 0, 10)}
            title="New Releases"
          />
          <CardSlider
            data={getMoviesFromRange("Blockbuster Movies", 0, 10)}
            title="Blockbuster Movies"
          />
          <CardSlider
            data={getMoviesFromRange("Popular on NetaFlim", 0, 10)}
            title="Popular on NetaFlim"
          />
          <CardSlider
            data={getMoviesFromRange("Action Movies", 0, 10)}
            title="Action Movies"
          />
          <CardSlider data={getMoviesFromRange("Epics", 0, 10)} title="Epics" />
        </>
      )}
    </Container>
  );
});

const Container = styled.div``;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;
