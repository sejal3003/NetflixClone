import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Layout from "../components/Layout/Layout";

export default function MyList() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);

  useEffect(() => {}, []);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Layout isScrolled={isScrolled} />

        <div className="content flex column">
          <div className="grid flex">
            {movies.map((movie, index) => {
              return (
                <Card
                  movieData={movie}
                  index={index}
                  key={movies.id}
                  isLiked={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-color: black;
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    color: white;

    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
