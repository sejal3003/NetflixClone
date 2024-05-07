import React, { useEffect, useState } from "react";
import styled from "styled-components";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";
import Layout from "../components/Layout/Layout";
import { fetchMovies } from "../utils/Movieapi";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movies, setMovies] = useState([]);
  const [showMovieInfo, setShowMovieInfo] = useState(false);
  // const genres = useSelector((state) => state.netflix.genres);
  // const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getGenres());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (genresLoaded) {
  //     dispatch(fetchMovies({ genres, type: "all" }));
  //   }
  // }, [dispatch, genresLoaded, genres]);
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
  const toggleMovieInfo = () => {
    setShowMovieInfo(!showMovieInfo);
  };

  const strangerThingsInfo = {
    title: "Stranger Things",
    description:
      "Stranger Things is an American science fiction horror streaming television series created by the Duffer Brothers and released on Netflix. The brothers serve as showrunners and are executive producers along with Shawn Levy and Dan Cohen.",
    genre: "Science Fiction, Horror",
    rating: "8.7/10",
  };
  return (
    <Container>
      <Layout isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button
              onClick={toggleMovieInfo}
              className="flex j-center a-center"
            >
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider />
      {showMovieInfo && (
        <MovieInfo>
          <h3>{strangerThingsInfo.title}</h3>
          <p>{strangerThingsInfo.description}</p>
          <p>
            <strong>Genre:</strong> {strangerThingsInfo.genre}
          </p>
          <p>
            <strong>Rating:</strong> {strangerThingsInfo.rating}
          </p>
        </MovieInfo>
      )}
    </Container>
  );
}

const MovieInfo = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 600px;
  z-index: 999;
`;
const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
