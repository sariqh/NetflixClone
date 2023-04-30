import {useState, useEffect } from "react";
import axios from '../axios';
import YouTube from "react-youtube";
import './Row.scss';

const base_url = "https://image.tmdb.org/t/p/original";
const API_KEY = "abc47b396c88cda217bab5d013d65634";

type Props = {
    title: string;
    fetchUrl: string;
    isLargeRow?: boolean;
  };

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [trailerUrl, setTrailerUrl] = useState<string | null>("");
    
    useEffect(() => {
      async function fetchData() {
        // console.log("Row.tsx...", fetchUrl)
        const url = "https://api.themoviedb.org/3"+fetchUrl
        // fetchUrl = instance.BaseURL+fetchUrl
        // console.log("Row.tsx2...", fetchUrl)
        const request = await axios.get(url);
        setMovies(request.data.results);
        return request;
      }
      fetchData();
    }, [fetchUrl]);
  
    console.log(movies);

    const opts: Options = {
        height: "390",
        width: "640",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    const handleClick = async (movie: Movie) => {
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          const url = "https://api.themoviedb.org/3" + `/movie/${movie.id}/videos?api_key=${API_KEY}`
          let trailerurl = await axios.get(url);
          setTrailerUrl(trailerurl.data.results[0]?.key);
        }
    };

    return (
        <div className="Row">
          <h2>{title}</h2>
          <div className="Row-posters">
            {/* ポスターコンテンツ */}
            {movies.map((movie, i) => (
              <img
                key={movie.id}
                className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            ))}
          </div>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
};