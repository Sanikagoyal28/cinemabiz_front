import "./movie.css"
import movie from "../Assets/movie.svg"
import star from "../Assets/star.svg"
import { useEffect } from "react"

function MovieCard() {

    const count = 2;
    useEffect(() => {
        console.log(count);
        console.log(document.getElementsByClassName("star"))
        switch (count) {
            case 1: {
                document.getElementsByClassName("star")[0].style.display = "block"
                document.getElementsByClassName("star")[0].style.opacity = "0.5"
                for (i = 1; i < 5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 2: {
                document.getElementsByClassName("star")[0].style.display = "block"
                document.getElementsByClassName("star")[0].style.opacity = "1"
                for (i = 1; i < 5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 3: {
                const starr = document.getElementsByClassName("star");
                for (var i = 0; i < 2; i++)
                    starr[i].style.display = "block";
                starr[0].style.opacity = "1"
                starr[1].style.opacity = "0.5"
                for (i = 2; i < 5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 4: {
                const starr = document.getElementsByClassName("star");
                for (var i = 0; i < 2; i++) {
                    starr[i].style.display = "block";
                    starr[i].style.opacity = "1"
                }
                for (i = 2; i < 5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 5: {
                const starr = document.getElementsByClassName("star");
                for (var i = 0; i < 3; i++)
                    starr[i].style.display = "block";
                starr[0].style.opacity = "1"
                starr[1].style.opacity = "1"
                starr[2].style.opacity = "0.5"
                for (i = 3; i < 5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 6: {
                const starr = document.getElementsByClassName("star");
                for (var i = 0; i < 3; i++) {
                    starr[i].style.display = "block";
                    starr[i].style.opacity = "1"
                }
                for (i = 3; i < 5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 7: {
                const starr = document.getElementsByClassName("star");
                for (var i = 0; i < 4; i++)
                    starr[i].style.display = "block";
                starr[0].style.opacity = "1"
                starr[1].style.opacity = "1"
                starr[2].style.opacity = "1"
                starr[3].style.opacity = "0.5"
                for (i = 4; i < 5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 8: {
                const starr = document.getElementsByClassName("star");
                for (var i = 0; i < 4; i++) {
                    starr[i].style.display = "block";
                    starr[i].style.opacity = "1"
                }
                for (i = 4; i < 5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 9: {
                const starr = document.getElementsByClassName("star");
                for (var i = 0; i < 5; i++)
                    starr[i].style.display = "block";
                starr[0].style.opacity = "1"
                starr[1].style.opacity = "1"
                starr[2].style.opacity = "1"
                starr[3].style.opacity = "1"
                starr[4].style.opacity = "0.5"
                break;
            }
            case 10: {
                const starr = document.getElementsByClassName("star");
                for (var i = 0; i < 5; i++) {
                    starr[i].style.display = "block";
                    starr[i].style.opacity = "1"
                }
                break;
            }
        }
    }, [count])

    return <>
        <div className="moviecard">
            <img src={movie} className="movieImage" />
            <p className="moviename">Money Heist movie</p>
            <div className="moviestar">
                <img src={star} className="star" />
                <img src={star} className="star" />
                <img src={star} className="star" />
                <img src={star} className="star" />
                <img src={star} className="star" />
                <span><p className="movierating">9/10</p></span>
            </div>
            <p className="moviegenre">Action/ Drama/ Comedy/ Horror</p>
        </div>
    </>
}

export default MovieCard