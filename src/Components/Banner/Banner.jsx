import React, { useState, useEffect } from 'react'; 
import axios from "../../Utils/axios";
import requests from '../../Utils/requests'
import "./banner.css"

function Banner() {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                console.log(request);
                setMovie(request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ]);
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    return (
        <div
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button play">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner__fadeBottom" />
        </div>
    );
}

export default Banner;









// detail explanation
// Imports


// import React, { useEffect, useState } from 'react';
// React: The core library to build React components.
// useEffect: React Hook to handle side effects (e.g., data fetching, subscriptions).
// useState: React Hook to manage component state.

// import axios from "../../Utils/axios";
// Imports a pre-configured axios instance (likely set up for your API base URL and headers).

// import requests from '../../Utils/requests';
// Imports an object containing various API endpoint configurations (e.g., requests.fetchNetflixOriginals).

// import "./banner.css";
// Imports the CSS file for styling the Banner component.
// Component Definition

// const Banner = () => {
// Defines the Banner component as a functional component.

// const [movie, setMovie] = useState({});
// Initializes movie state as an empty object.
// setMovie is used to update the movie state.

// useEffect(() => {
// Runs the side effect (fetching Netflix originals) after the component mounts.

// (async () => {
//     try {
//         const request = await axios.get(requests.fetchNetflixOriginals);
// Defines an immediately invoked async function to fetch data from the fetchNetflixOriginals endpoint.

// console.log(request);
// Logs the API response to the console for debugging.

// setMovie(request.data.results[
//     Math.floor(Math.random() * request.data.results.length)
// ]);
// Picks a random movie from the results array in the API response and sets it in the movie state.

// } catch (error) {
//     console.log("error", error);
// }
// Catches and logs any errors that occur during the fetch operation.

// }, []);
// The empty dependency array ensures this useEffect runs only once when the component mounts.
// Helper Function

// function truncate(str, n) {
//     return str?.length > n ? str.substr(0, n - 1) + '...' : str;
// }
// Shortens a string to n characters, appending ... if it exceeds the limit.
// Uses optional chaining (?.) to handle cases where str might be undefined.
// JSX Rendering

// <div
//     className="banner"
//     style={{
//         backgroundSize: "cover",
//         backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat"
//     }}
// >
// Creates a div with the banner class.
// Dynamically sets the background image using the backdrop_path from the movie object.
// Styles ensure the background image covers the entire area, is centered, and does not repeat.
// Banner Contents

// <div className="banner__contents">
//     <h1 className="banner__title">
//         {movie?.title || movie?.name || movie?.original_name}
//     </h1>
// Displays the movie title. If title is unavailable, falls back to name or original_name.

//     <div className="banner__buttons">
//         <button className="banner__button play">Play</button>
//         <button className="banner__button">My List</button>
//     </div>
// Adds two buttons: "Play" and "My List."

//     <h1 className="banner__description">
//         {truncate(movie?.overview, 150)}
//     </h1>
// Displays a truncated version of the movie overview (up to 150 characters).
// Fade Effect

// <div className="banner__fadeBottom" />
// Adds a gradient fade effect at the bottom of the banner (likely styled in banner.css).
// Export

// export default Banner;
// Exports the Banner component for use in other parts of the application.
