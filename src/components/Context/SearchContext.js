// SearchContext.js
import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  const searchMovies = async (searchQuery) => {
    // try {
    //   const response = await fetch(
    //     `http://localhost:8000/api/movies/search?name=${searchQuery}`
    //   );
    //   const data = await response.json();
    //   console.log(data);
    //   if (data.success) {
    //     setSearchResults(data.movies);
    //   } else {
    //     setSearchResults([]);
    //   }
    // } catch (error) {
    //   console.error("Error searching:", error);
    //   setSearchResults([]);
    // }
    try {
      let apiUrl = "http://localhost:8000/api/movies/search";

      // If searchQuery is provided, append it to the API URL
      if (searchQuery) {
        apiUrl += `?name=${searchQuery}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.success) {
        setSearchResults(data.movies);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults([]);
    }
  };

  return (
    <SearchContext.Provider value={{ searchMovies, searchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
