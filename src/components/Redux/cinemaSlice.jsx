import { createAsyncThunk } from "@reduxjs/toolkit"
import Baseurl from "./Baseurl"

const initialState ={
    loading:false,
    cinemas:'',
    movies:''
}

const homeSlice = createAsyncThunk("home", async(location)=>{
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