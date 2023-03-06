import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CinemaCard from "../Cinemas/cinemaCard"
import Footer from "../Footer/footer"
import MovieCard from "../Movies/Moviecard"
import Navbar from "../Navbar/navbar"
import { homeMovieThunk} from "../Redux/cinemaSlice"

function Moviepanel() {

    const dispatch = useDispatch()
    const reducer = useSelector((s) => s.home)
    const [movie, setMovie] = useState([])
    useEffect(() => {
        dispatch(homeMovieThunk('Delhi'))
        setMovie(reducer.home_movie)
    }, [])
    return <>
        <Navbar />
        <div className="home POPUPBG">
            <p className="homeTitle">Recommended Movies</p>
            <div className="movieFlex">
                {movie.map((m, index) => {
                    return <MovieCard name={m.movie_name} image={m.movie_image} rating={m.movie_rating} genre={m.movie_genre} id={m._id} indexx={index} />
                })}
            </div>
        </div>
        <Footer />
    </>
}

export default Moviepanel