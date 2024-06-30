import { useEffect, useState } from "react";
import StarRating from "./StarRating";
const KEY = "f6d30f11";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// NAVBAR
function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ moviesFound }) {
  return (
    <p className="num-results">
      Found <strong>{moviesFound}</strong> results
    </p>
  );
}

function Search({ query, setQuery, onCloseMovie }) {
  // const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => {
        onCloseMovie();
        setQuery(e.target.value);
      }}
    />
  );
}

// NAVBAR

// Movie List

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onClick }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onClick={onClick} />
      ))}
    </ul>
  );
}

function Movie({ movie, onClick }) {
  return (
    <li key={movie.imdbID} onClick={() => onClick(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Director: director,
    Genre: genre,
    Actors: actors,
  } = movie;

  useEffect(() => {
    function handleEscape(e) {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return function () {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `${title}`;
      return function () {
        document.title = "usePopcorn@TN";
      };
    },
    [title]
  );

  function handleAddMovie() {
    const newWatchMovie = {
      imdbID: selectedId,
      title,
      year,
      Poster: poster,
      imdbRating: Number(imdbRating),
      runtime: parseInt(runtime),
      userRating,
    };
    onAddWatched(newWatchMovie);
    onCloseMovie();
  }

  const watchedMovieIndex = watched.findIndex(
    (mov) => mov.imdbID === selectedId
  );
  const isWatched = watchedMovieIndex === -1 ? false : true;
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released}</p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You rated <em>{watched[watchedMovieIndex].userRating} ⭐️</em>{" "}
                  for this movie
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  ></StarRating>
                  {userRating ? (
                    <button className="btn-add" onClick={handleAddMovie}>
                      + Add to Watch List{" "}
                    </button>
                  ) : null}
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

// Movie

// Watched Movie

function WatchedSummary({ watched }) {
  const avgImdbRating =
    Math.round(average(watched.map((movie) => movie.imdbRating)) * 100) / 100;
  const avgUserRating =
    Math.round(average(watched.map((movie) => movie.userRating)) * 100) / 100;
  const avgRuntime =
    Math.round(average(watched.map((movie) => movie.runtime)) * 100) / 100;
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({ movie, onDelete }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
          ❌
        </button>
      </div>
    </li>
  );
}

function WatchedMovieList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

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

  function handleSelectedMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    const currentWatch = watched.filter((mov) => mov.imdbID !== id);
    setWatched(currentWatch);
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search
          query={query}
          setQuery={setQuery}
          onCloseMovie={handleCloseMovie}
        />
        <NumResults moviesFound={movies.length}></NumResults>
      </Navbar>

      <Main>
        <Box>
          {error ? (
            <ErrorMessage message={error} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <MovieList movies={movies} onClick={handleSelectedMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDelete={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️ </span>
      {message}
    </p>
  );
}
