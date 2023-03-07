import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CinemaCard from "../Cinemas/cinemaCard"
import Footer from "../Footer/footer"
import MovieCard from "../Movies/Moviecard"
import Navbar from "../Navbar/navbar"
import { homeThunk } from "../Redux/homeSlice"
import "./homepage.css"

function Homepage() {

    const dispatch = useDispatch()
    const reducer = useSelector((s) => s.home)
    const [cinema, setCinema] = useState([])
    const [movie, setMovie] = useState([])
    useEffect(() => {
        dispatch(homeThunk())
        setCinema(reducer.cinemas)
        setMovie(reducer.movies)
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
            <p className="homeTitle" id="cinemaTitle">Cinemas Near you</p>
            <div className="movieFlex">
                {cinema.map((c, index) => {
                    return <CinemaCard name={c.cinema_name} image={c.cinema_image} rating={c.cinema_rating} address={c.cinema_location} distance={c.cinema_distance} id={c._id} indexx={index} />
                })}
            </div>
        </div>
        <Footer />
    </>
}

export default Homepage