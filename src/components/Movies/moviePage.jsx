import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import Footer from "../Footer/footer"
import Navbar from "../Navbar/navbar"
import { movieThunk } from "../Redux/movieSlice"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function MoviePage() {

    const [movieInfo, setMovieInfo] = useState({})
    const [language, setLanguage] = useState([])
    const [genre, setGenre] = useState([])
    const [cast, setCast] = useState([])
    const [crew, setCrew] = useState([])
    const reducer = useSelector((s) => s.movie)
    const { id } = useParams();
    const { place } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(movieThunk(id))
    }, [id])

    useEffect(() => {
        setMovieInfo(reducer.movie)
        setLanguage(reducer.movie.movie_language)
        setGenre(reducer.movie.movie_genre)
        setCast(reducer.movie.movie_cast)
        setCrew(reducer.movie.movie_crew)
    }, [reducer])

    function homeBooking() {
        console.log(place)
    }
    function cinemaBooking() {
        console.log("cinema", place)
    }

    // carousel
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 8,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return <>
        <Navbar />
        <div className="moviePage">
            <div className="movieCoverImage">
                {/* image , name, rating,duration, votes, release */}
            </div>
            {place == "via_home" ? <button className="buttonBook" onClick={homeBooking}>Book tickets</button> :
                <button className="buttonBook" onClick={cinemaBooking}>Book tickets</button>}
            <p className="movieLang">About Movie</p>
            <p className="language">{movieInfo.movie_info}</p>
            <p className="movieLang">Langugages</p>
            <p className="language">
                {language.length > 0 ? language.map((g) => {
                    return <span>{g} , </span>
                }) : null}
            </p>
            <p className="movieLang">Genres</p>
            <p className="language">
                {genre.length > 0 ? genre.map((g) => {
                    return <span>{g} , </span>
                }) : null}
            </p>
            <p className="movieLang">Cast</p>
            <div className="movieCast">

                <Carousel responsive={responsive} containerClass="carouselContainer"
                    itemClass="carouselItem">
                    {cast.length > 0 ? cast.map((c) => {
                        return <div className="castDiv">
                            <div className="castImage" />
                            <p className="castName">{c.actor_name}</p>
                        </div>
                    }) : null}
                </Carousel>
            </div>
            <p className="movieLang">Crew</p>
            <div className="movieCast">
                {crew.length > 0 ? crew.map((c) => {
                    return <div className="castDiv">
                        <div className="castImage" />
                        <p className="castName">{c.crew_name}</p>
                    </div>
                }) : null}
            </div>
        </div>
        <Footer />
    </>
}

export default MoviePage
