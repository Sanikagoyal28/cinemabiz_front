import { combineReducers } from "redux";
import { SigninSlice } from "./authSlice";
import { openLoginDialog } from "./authSlice";
import { cinemaSlice } from "./cinemaSlice";
import { homeSlice } from "./homeSlice";
import { movieSlice } from "./movieSlice";

const userReducer = combineReducers({
    users:SigninSlice.reducer,
    dialog:openLoginDialog.reducer,
    home:homeSlice.reducer,
    cinema:cinemaSlice.reducer,
    movie:movieSlice.reducer
})

export default userReducer