import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CinemaCard from "../Cinemas/cinemaCard"
import Footer from "../Footer/footer"
import Navbar from "../Navbar/navbar"
import { homeCinemaThunk} from "../Redux/homeSlice"

function Cinemapanel() {

    const dispatch = useDispatch()
    const reducer = useSelector((s) => s.home)
    const [cinema, setCinema] = useState([])
    useEffect(() => {
        dispatch(homeCinemaThunk('Delhi'))
        setCinema(reducer.home_cinema)
    }, [])
    return <>
        <Navbar />
        <div className="home POPUPBG">
        <p className="homeTitle">Cinemas Near you</p>
            <div className="movieFlex">
                {cinema.map((c, index) => {
                    return <CinemaCard name={c.cinema_name} image={c.cinema_image} rating={c.cinema_rating} address={c.cinema_location} distance={c.cinema_distance} id={c._id} indexx={index} />
                })}
            </div>
        </div>
        <Footer />
    </>
}

export default Cinemapanel