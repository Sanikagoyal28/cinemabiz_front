import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Baseurl from "./Baseurl"


const initialState ={
    loading:false,
    movie:'',
}

const movieThunk = createAsyncThunk("movie", async(id)=>{
    return await Baseurl.get(`movie/${id}`)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
})

const movieSlice = createSlice({
    name:"movie",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(movieThunk.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(movieThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.movie = action.payload.data.movie
        })
        builder.addCase(movieThunk.rejected, (state, action)=>{
            state.loading= false
        })
    }
})

export {movieSlice, movieThunk}