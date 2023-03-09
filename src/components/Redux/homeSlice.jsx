import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Baseurl from "./Baseurl"

const initialState ={
    loading:false,
    cinemas:'',
    movies:'',
    home_movie:'',
    home_cinema:'',
    languages:'',
    genre:'',
    search:''
}

const homeThunk = createAsyncThunk("home", async()=>{
    const location = localStorage.getItem("location")
    console.log(location)
    return await Baseurl.get(`home/${location}`)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
})

const homeMovieThunk = createAsyncThunk("home/movies", async()=>{
    const location = localStorage.getItem("location")
    return await Baseurl.get(`get_movies/${location}`)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
})

const homeCinemaThunk = createAsyncThunk("home/cinemas", async()=>{
    const location = localStorage.getItem("location")
    return await Baseurl.get(`get_cinemas/${location}`)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
})

const SearchThunk = createAsyncThunk("search", async(value)=>{
    return await Baseurl.get(`search/?location=${value}`)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
})


const homeSlice = createSlice({
    name:"home",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        //home
        builder.addCase(homeThunk.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(homeThunk.fulfilled, (state, action)=>{

            state.loading = false;
            state.cinemas = action.payload.data.cinema
            state.movies = action.payload.data.movie
        })
        builder.addCase(homeThunk.rejected, (state, action)=>{
            state.loading= false
        })
        //home_movies
        builder.addCase(homeMovieThunk.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(homeMovieThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.home_movie = action.payload.data.movies
            state.languages = action.payload.data.languages
            state.genre = action.payload.data.genre
        })
        builder.addCase(homeMovieThunk.rejected, (state, action)=>{
            state.loading= false
        })
         //home_cinemas
         builder.addCase(homeCinemaThunk.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(homeCinemaThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.home_cinema = action.payload.data.cinema
        })
        builder.addCase(homeCinemaThunk.rejected, (state, action)=>{
            state.loading= false
        })
        // search
        builder.addCase(SearchThunk.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(SearchThunk.fulfilled, (state, action)=>{
            console.log(action)
            state.loading = false;
            state.search = action.payload.data.location
        })
        builder.addCase(SearchThunk.rejected, (state, action)=>{
            state.loading= false
        })
    }
})

export {homeThunk, homeMovieThunk, homeCinemaThunk, SearchThunk}
export {homeSlice}