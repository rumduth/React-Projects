import { useState, useEffect } from "react";

export function useLocalStorage(key) {
  const [watched, setWatched] = useState(function () {
    const watchMoviesList = localStorage.getItem(key);
    if (!watchMoviesList) return [];
    const watchedMovies = JSON.parse(watchMoviesList);
    return watchedMovies;
  });

  useEffect(
    function () {
      localStorage.setItem("movies", JSON.stringify([...watched]));
    },
    [watched]
  );
  return { watched, setWatched };
}
