import { useState, useEffect } from "react";
import MovieInfo from "../components/MovieInfo";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movieInfos, setMovieInfos] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year",
      )
    ).json();
    setMovieInfos(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movieInfos.map((movieInfo) => (
            <MovieInfo
              key={movieInfo.id}
              id={movieInfo.id}
              coverImg={movieInfo.medium_cover_image}
              title={movieInfo.title}
              summary={movieInfo.summary}
              genres={movieInfo.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
