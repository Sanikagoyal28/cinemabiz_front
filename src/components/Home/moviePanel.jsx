import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CinemaCard from "../Cinemas/cinemaCard"
import Footer from "../Footer/footer"
import MovieCard from "../Movies/Moviecard"
import Navbar from "../Navbar/navbar"
import { homeMovieThunk} from "../Redux/homeSlice"

function Moviepanel() {

    const dispatch = useDispatch()
    const reducer = useSelector((s) => s.home)
    console.log(reducer)
    const [movie, setMovie] = useState([])
    const [language, setLanguage] = useState([])
    const [genre, setGenre] = useState([])
    useEffect(() => {
        dispatch(homeMovieThunk())
    }, [])
    useEffect(()=>{
        setMovie(reducer.home_movie)
        setLanguage(reducer.languages)
        setGenre(reducer.genre)
    },[reducer])

    return <>
        <Navbar />
        <div className="home POPUPBG">
            <p className="homeTitle">Recommended Movies</p>
            <div id="movieFlexbox">
            <div className="homeMovieFlex">
                {movie.length >0 ? movie.map((m, index) => {
                    return <MovieCard name={m.movie_name} image={m.movie_image} rating={m.movie_rating} genre={m.movie_genre} id={m._id} indexx={index} />
                }): null}
            </div>
            <div className="movieFilter">
            <div className="movieFilter1">
                <p className="filterLang">Languages</p>
                <div className="filterLangFlex">
                    {language.length>0 ?language.map((l)=>{
                        return <button className="filterLangBtn">{l}</button>
                    }): null }
                </div>
            </div>
            <div className="movieFilter1">
                <p className="filterLang">Genre</p>
                <div className="filterLangFlex">
                    {genre.length>0 ?genre.map((l)=>{
                        return <button className="filterLangBtn">{l}</button>
                    }): null }
                </div>
            </div>
            </div>
            </div>
        </div>
        <Footer />
    </>
}

export default Moviepanel