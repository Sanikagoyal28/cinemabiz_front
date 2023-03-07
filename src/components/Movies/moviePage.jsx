import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import Footer from "../Footer/footer"
import Navbar from "../Navbar/navbar"
import { movieThunk } from "../Redux/movieSlice"

function MoviePage() {

    const [movieInfo, setMovieInfo] = useState({})
    const [language, setLanguage] = useState([])
    const [genre, setGenre] = useState([])
    const [cast, setCast] = useState([])
    const [crew, setCrew] = useState([])
    const reducer = useSelector((s) => s.movie)
    console.log(reducer)
    const { id } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(movieThunk(id))
    }, [id])

    useEffect(()=>{
        setMovieInfo(reducer.movie)
        setLanguage(reducer.movie.movie_language)
        setGenre(reducer.movie.movie_genre)
        setCast(reducer.movie.movie_cast)
        setCrew(reducer.movie.movie_crew)
    },[reducer])
    return <>
        <Navbar />
        <div className="moviePage">
            <div className="movieCoverImage">
                {/* image , name, rating,duration, votes, release */}
            </div>
            <p className="movieLang">About Movie</p>
            <p className="language">{movieInfo.movie_info}</p>
            <p className="movieLang">Langugages</p>
            <p className="language">
            {language.length>0 ? language.map((g)=>{
                return <span>{g} , </span>
            }) : null}
            </p>
            <p className="movieLang">Genres</p>
            <p className="language">
            {genre.length>0 ? genre.map((g)=>{
                return <span>{g} , </span>
            }) : null}
            </p>
            <p className="movieLang">Cast</p>
            <div className="movieCast">
                {cast.length>0 ? cast.map((c)=>{
                    return <div className="castDiv">
                    <div className="castImage" />
                    <p className="castName">{c.actor_name}</p>
                    </div>
                }):null}
            </div>
            <p className="movieLang">Crew</p>
            <div className="movieCast">
                {crew.length>0 ? crew.map((c)=>{
                    return <div className="castDiv">
                    <div className="castImage" />
                    <p className="castName">{c.crew_name}</p>
                    </div>
                }):null}
            </div>
        </div>
        <Footer />
    </>
}

export default MoviePage
