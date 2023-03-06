import { combineReducers } from "redux";
import { SigninSlice } from "./authSlice";
import { openLoginDialog } from "./authSlice";
import { homeSlice } from "./cinemaSlice";

const userReducer = combineReducers({
    users:SigninSlice.reducer,
    dialog:openLoginDialog.reducer,
    home:homeSlice.reducer
})

export default userReducer