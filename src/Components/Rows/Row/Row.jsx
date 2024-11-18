import React, { useEffect, useState } from 'react'
import "./Row.css";
import axios from "../../../Utils/axios";
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const base_url = "https://image.tmdb.org/t/p/original";
    useEffect(() => {
        (async () => {
            try {
                // console.log(fetchUrl)
                const request = await axios.get(fetchUrl);
                // console.log(request)
                setMovie(request.data.results);
            } catch (error) {
                console.log("error", error);
            }
        })()
    }, [fetchUrl]);
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
                .then((url) => {
                    console.log(url)
                    const urlParams = new URLSearchParams(new URL(url).search)
                    console.log(urlParams)
                    console.log(urlParams.get('v'))
                    setTrailerUrl(urlParams.get('v'));
                })
        }
    }
    const opts = {
        height: '390',
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }
    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row__posters">
                {movies?.map((movie, index) => (
                    <img
                        onClick={() => handleClick(movie)}
                        key={index} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    />
                ))}
            </div>
            <div style={{ padding: '40px' }}>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </div>
    )
}
export default Row



// explain 

//react-youtube: A package to embed YouTube videos in React components.

// const Row = ({ title, fetchUrl, isLargeRow }) => {
// Row: A functional component that receives title, fetchUrl, and isLargeRow as props.


// const [movies, setMovie] = useState([]);
// movies: An array state variable to store movie data.

// setMovie: A function to update the movies state.


// const [trailerUrl, setTrailerUrl] = useState("");
// trailerUrl: A state variable to store the URL of the movie trailer.

// setTrailerUrl: A function to update the trailerUrl state.


// const base_url = "https://image.tmdb.org/t/p/original";
// base_url: A constant that stores the base URL for movie poster images.

//
// useEffect(() => {
//     (async () => {
//         try {
//             // console.log(fetchUrl)
//             const request = await axios.get(fetchUrl);
//             // console.log(request)
//             setMovie(request.data.results);
//         } catch (error) {
//             console.log("error", error);
//         }
//     })()
// }, [fetchUrl]);
// useEffect: Runs the provided function when the component mounts or fetchUrl changes.

// Inside the effect:

// An async function is defined and immediately invoked.

// axios.get(fetchUrl): Makes a GET request to the provided fetchUrl.

// setMovie(request.data.results): Updates the movies state with the fetched movie data.

// try/catch: Handles any errors during the request and logs them to the console.

// handleClick Function

// const handleClick = (movie) => {
//     if (trailerUrl) {
//         setTrailerUrl('')
//     } else {
//         movieTrailer(movie?.title || movie?.name || movie?.original_name)
//             .then((url) => {
//                 console.log(url)
//                 const urlParams = new URLSearchParams(new URL(url).search)
//                 console.log(urlParams)
//                 console.log(urlParams.get('v'))
//                 setTrailerUrl(urlParams.get('v'));
//             })
//     }
// }
// handleClick: A function to handle clicks on movie posters.

// If trailerUrl is already set, it resets to an empty string (hides the trailer).

// Otherwise, movieTrailer fetches the trailer URL for the movie title, name, or original name.

// .then((url) => { ... }): Processes the URL to extract the video ID and sets the trailerUrl state.

// YouTube Player Options

// const opts = {
//     height: '390',
//     width: "100%",
//     playerVars: {
//         autoplay: 1,
//     },
// }
// opts: Configuration options for the YouTube player.

// height and width: Define the dimensions of the player.

// playerVars: Contains additional player parameters, such as autoplay.

// Return JSX

// return (
//     <div className="row">
//         <h1>{title}</h1>
//         <div className="row__posters">
//             {movies?.map((movie, index) => (
//                 <img
//                     onClick={() => handleClick(movie)}
//                     key={index}
//                     src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
//                     alt={movie.name}
//                     className={`row__poster ${isLargeRow && "row__posterLarge"}`}
//                 />
//             ))}
//         </div>
//         <div style={{ padding: '40px' }}>
//             {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
//         </div>
//     </div>
// )
// <div className="row">: The main container for the row of movies.

// <h1>{title}</h1>: Displays the title of the row.

// <div className="row__posters">: Container for movie posters.

// {movies?.map(...)}: Maps through the movies array to create an <img> element for each movie.

// onClick={() => handleClick(movie)}: Attaches a click handler to fetch and display the trailer.

// src: Sets the image source URL based on whether the row is large.

// alt: Sets the alt text for the image.

// className: Sets the CSS class, conditionally adding row__posterLarge if isLargeRow is true.

// {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}: Conditionally renders the YouTube player if trailerUrl is set, using the provided options.