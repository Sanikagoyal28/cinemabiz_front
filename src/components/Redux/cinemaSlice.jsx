import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Baseurl from "./Baseurl"


const initialState ={
    loading:false,
    cinema:''
}

const cinemaThunk = createAsyncThunk("cinema", async(id)=>{
    return await Baseurl.get(`cinema/${id}`)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
})

const cinemaSlice = createSlice({
    name:"cinema",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(cinemaThunk.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(cinemaThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.cinema = action.payload.data.cinema
        })
        builder.addCase(cinemaThunk.rejected, (state, action)=>{
            state.loading= false
        })
    }
})

export {cinemaSlice, cinemaThunk}