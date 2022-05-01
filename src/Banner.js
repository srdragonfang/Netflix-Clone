import React, { useEffect, useState } from 'react'
import './banner.css'
import axios from './axios';
import requests from './requests';
const base_url = "https://image.tmdb.org/t/p/original/"
const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const sokun = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                sokun.data.results[
                Math.floor(Math.random() * sokun.data.results.length - 1)
                ]
            );
            return sokun;
        }
        fetchData()
    }, []);
    console.log(movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };
    return (
        <header
            className='banner'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    ${base_url}${movie.backdrop_path}
                )`,
                backgroundPosition: "center center",
            }}
        >
            <div className='banner__contents'>
                <h1 className='banner__title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <p className='banner__description'>
                    {truncate(movie?.overview, 150)}
                </p>
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    )
}

export default Banner