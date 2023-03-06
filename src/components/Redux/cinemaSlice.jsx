import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Baseurl from "./Baseurl"

const initialState ={
    loading:false,
    cinemas:'',
    movies:'',
    home_movie:'',
    home_cinema:''
}

const homeThunk = createAsyncThunk("home", async(location)=>{
    const accessToken =localStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return await Baseurl.get(`home/${location}`, config)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
})

const homeMovieThunk = createAsyncThunk("home/movies", async(location)=>{
    const accessToken =localStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return await Baseurl.get(`get_movies/${location}`, config)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
})

const homeCinemaThunk = createAsyncThunk("home/cinemas", async(location)=>{
    const accessToken =localStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return await Baseurl.get(`get_cinemas/${location}`, config)
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
    }
})

export {homeThunk, homeMovieThunk, homeCinemaThunk}
export {homeSlice}