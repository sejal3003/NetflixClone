import React from 'react'
import styled from 'styled-components';
import {useNavigate} from  "react-router-dom";
export default function Card(movieData) {
    const navigate = useNavigate();
  return (
    <Container>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() => navigate("/player")}
      />
    </Container>
  )
}
const Container = styled.div``;