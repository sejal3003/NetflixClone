import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";
import axios from "axios";
import { useSearch } from "../components/Context/SearchContext";

export default React.memo(function Slider() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const { searchResults, searchInput } = useSearch();
  // console.log(searchResults);
  // console.log(searchInput);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/movies/");
        setMovies(response.data);
        // console.log(response.data);
        fetchMovies(response.data);
      } catch (error) {
        setError(error.message || "An error occurred while fetching movies.");
      }
    };
    fetchMovies();
  }, []);

  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  const filteredMovies = searchResults.length > 0 ? searchResults : movies;

  return (
    <Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {searchResults.length > 0 && searchInput !== null ? (
        <CardSlider data={searchResults} title="Searched Movie" />
      ) : (
        <>
          {" "}
          <CardSlider data={getMoviesFromRange(0, 10)} title="Trending Now" />
          <CardSlider data={getMoviesFromRange(10, 20)} title="New Releases" />
          <CardSlider
            data={getMoviesFromRange(20, 30)}
            title="Blockbuster Movies"
          />
          <CardSlider
            data={getMoviesFromRange(30, 40)}
            title="Popular on Netflix"
          />
          <CardSlider data={getMoviesFromRange(40, 50)} title="Action Movies" />
          <CardSlider data={getMoviesFromRange(50, 60)} title="Epics" />{" "}
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
