import { useState, useEffect } from "react";
const KEY = "f6d30f11";

export function useMovies(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setError("");
        setIsLoading(() => true);
        const movies = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!movies.ok) {
          throw new Error("Something went wrong with fetching movies");
        }
        const data = await movies.json();

        if (data.Response === "False") throw new Error(data.Error);
        setMovies(() => data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(() => err.message);
      } finally {
        setIsLoading(() => false);
      }
    }
    if (query.length <= 3) {
      setMovies([]);
      setError("");
    } else fetchData();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
