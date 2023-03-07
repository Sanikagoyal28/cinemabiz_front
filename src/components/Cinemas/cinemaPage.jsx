import { Filter, FilterList } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import Footer from "../Footer/footer"
import MovieCard from "../Movies/Moviecard"
import Navbar from "../Navbar/navbar"
import { cinemaThunk } from "../Redux/cinemaSlice"
import "./cinema.css"
import star from "../Assets/star.svg"

function CinemaPage() {

    const [movie, setMovie] = useState([])
    const [cinemaInfo, setCinemaInfo] = useState({})
    const reducer = useSelector((s) => s.cinema)
    const { id } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(cinemaThunk(id))
    }, [id])
    useEffect(()=>{
        setCinemaInfo(reducer.cinema)
        setMovie(reducer.cinema.cinema_movies)
    },[reducer])

    return <>
        <Navbar />
        <div className="cinemaPage">
            <div className="cinemaImage">
            <p className="cinemaName">{cinemaInfo.cinema_name}</p>
            <div className="cinemFlex">
            <img src={star} className="cinemaStar" />
            <p className="cinemaRate" id="rating">{cinemaInfo.cinema_rating} / 10</p>
            </div>
            <p className="cinemaRate"> At {cinemaInfo.cinema_distance} away</p>
            </div>
            <p className="cinemaAddress">Cinema Address</p>
            <p className="addText">{cinemaInfo.cinema_location}</p>
            <p className="cinemaMovie">Popular Movies</p>
            <div className="cinemaMovieFlex">
                {movie.length>0 ? movie.map((m, index) => {
                    return <MovieCard name={m.movie_name} image={m.movie_image} rating={m.movie_rating} genre={m.movie_genre} id={m._id} indexx={index} />
                }) : null}
            </div>
        </div>
        <Footer />
    </>
}

export default CinemaPage


// otp field
// resend otp
// reset pwd 

// Filter
// cover image
// add reviews : additional