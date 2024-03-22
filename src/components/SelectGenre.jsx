import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";
export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <Select
      className="flex"
      onChange={(e) => {
        dispatch(
          fetchDataByGenre({
            genres,
            genre: e.target.value,
            type,
          })
        );
      }}
    >
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}

const Select = styled.select`
  margin-top: 2rem;
  padding: 0.5rem;
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: black;
  color: white;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
