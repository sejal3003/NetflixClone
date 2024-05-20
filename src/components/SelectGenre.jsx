import React from "react";
import { useGenre } from "../components/Context/GenreContext";
import styled from "styled-components";

export default function SelectGenre({ genres }) {
  const { setSelectedGenre } = useGenre();

  return (
    <Select className="flex" onChange={(e) => setSelectedGenre(e.target.value)}>
      <option value="">All</option>
      {genres.map((genre) => (
        <option value={genre.name} key={genre.id}>
          {genre.name}
        </option>
      ))}
    </Select>
  );
}

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: black;
  color: white;
`;
