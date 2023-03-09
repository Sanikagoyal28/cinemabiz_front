import movie from "../Assets/movie.svg"
import star from "../Assets/star.svg"
import { useEffect } from "react"
import { useNavigate } from "react-router"

function Movie(props) {

    const navigate = useNavigate()
    const count = props.rating;
    const index = props.indexx;
    const index1 = index * 5;
    const index2 = index * 5 + 1;
    const index3 = index * 5 + 2;
    const index4 = index * 5 + 3;
    const index5 = index * 5 + 4;

    useEffect(() => {
        switch (count) {
            case 1: {
                document.getElementsByClassName("star")[index1].style.display = "block"
                document.getElementsByClassName("star")[index1].style.opacity = "0.5"
                for (i = index2; i <= index5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 2: {
                document.getElementsByClassName("star")[index1].style.display = "block"
                document.getElementsByClassName("star")[index1].style.opacity = "1"
                for (i = index2; i <= index5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 3: {
                const starr = document.getElementsByClassName("star");
                for (var i = index1; i < index3; i++)
                    starr[i].style.display = "block";
                starr[index1].style.opacity = "1"
                starr[index2].style.opacity = "0.5"
                for (i = index3; i <= index5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 4: {
                const starr = document.getElementsByClassName("star");
                for (var i = index1; i < index3; i++) {
                    starr[i].style.display = "block";
                    starr[i].style.opacity = "1"
                }
                for (i = index3; i <= index5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;    
            }
            case 5: {
                const starr = document.getElementsByClassName("star");
                for (var i = index1; i < index4; i++)
                    starr[i].style.display = "block";
                starr[index1].style.opacity = "1"
                starr[index2].style.opacity = "1"
                starr[index3].style.opacity = "0.5"
                for (i = index4; i <= index5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 6: {
                const starr = document.getElementsByClassName("star");
                for (var i = index1; i < index4; i++) {
                    starr[i].style.display = "block";
                    starr[i].style.opacity = "1"
                }
                for (i = index4; i <= index5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 7: {
                const starr = document.getElementsByClassName("star");
                for (var i = index1; i < index5; i++)
                    starr[i].style.display = "block";
                starr[index1].style.opacity = "1"
                starr[index2].style.opacity = "1"
                starr[index3].style.opacity = "1"
                starr[index4].style.opacity = "0.5"
                for (i = index5; i <= index5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 8: {
                const starr = document.getElementsByClassName("star");
                for (var i = index1; i < index5; i++) {
                    starr[i].style.display = "block";
                    starr[i].style.opacity = "1"
                }
                for (i = index5; i <= index5; i++)
                    document.getElementsByClassName("star")[i].style.display = "none"
                break;
            }
            case 9: {
                const starr = document.getElementsByClassName("star");
                for (var i = index1; i <= index5; i++)
                    starr[i].style.display = "block";
                starr[index1].style.opacity = "1"
                starr[index2].style.opacity = "1"
                starr[index3].style.opacity = "1"
                starr[index4].style.opacity = "1"
                starr[index5].style.opacity = "0.5"
                break;
            }
            case 10: {
                const starr = document.getElementsByClassName("star");
                for (var i = index1; i <= index5; i++) {
                    starr[i].style.display = "block";
                    starr[i].style.opacity = "1"
                }
                break;
            }
        }
    }, [count])

    return <>
        <div className="moviecard" onClick={()=>{navigate(`/movie/via_home/${props.id}`)}}>
        {props.image?<img src={props.image} className="movieImage" />:<img src={movie} className="movieImage" />}
            <p className="moviename">{props.name}</p>
            <div className="moviestar">
                <img src={star} className="star" />
                <img src={star} className="star" />
                <img src={star} className="star" />
                <img src={star} className="star" />
                <img src={star} className="star" />
                <span><p className="movierating">{props.rating}/10</p></span>
            </div>
            <p className="moviegenre">
            {props.genre.length>0 ? props.genre.map((g)=>{
                return <span>{g}/ </span>
            }) : null}
            </p>
        </div>
    </>
}

export default Movie