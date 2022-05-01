import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'
// npm i react-youtube
import Youtube from 'react-youtube'
// npm i movie-trailer
import movieTrailer from "movie-trailer"
const base_url = "https://image.tmdb.org/t/p/original/"


function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 0,
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name)
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch(error => console.log(error));
        }
    };
    return (
        <div className='row'>
            <h2 className='row__title'>{title}</h2>
            <div className='row__posters'>
                {movies.map(movie =>
                    <div class="movie__item">
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                        <div className="movie__title">{isLargeRow ? "" : [movie?.name || movie?.title || movie?.original_name]}</div>
                    </div>
                )}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
            {/* opts = option */}
        </div>
    )
}

export default Row