import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";
import Layout from "../components/Layout/Layout";
import { fetchGenres, fetchMovies } from "../utils/Movieapi";
// import { useSelector } from "react-redux";

export default function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  // const genres = useSelector((state) => state.netflix.genres);
  // console.log(genres);
  // const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (genresLoaded) {
  //     dispatch(fetchMovies({ type: "tv" }));
  //   }
  // }, [genresLoaded]);
  useEffect(() => {
    const fetchGenresData = async () => {
      const data = await fetchGenres();
      console.log(data);
      setGenre(data);
    };
    fetchGenresData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovies();

      setMovies(data);
    };
    fetchData();
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Layout isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genre} type="tv" />
        {movies.length ? <Slider /> : <NotAvailable />}
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-color: black;
  .data {
    margin-top: 8rem;

    .notAvailable {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
