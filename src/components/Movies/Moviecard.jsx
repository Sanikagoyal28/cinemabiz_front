import "./movie.css"

function MovieCard () {
    return <>
        <div className="moviecard">
            <div className="movieImage" />
            <p className="moviename">Money Heist</p>
            <p className="movierating">9/10</p>
            <p className="moviegenre">Action/Drama/Comedy</p>
        </div>
    </>
}

export default MovieCard