import { combineReducers } from "redux";
import { SigninSlice } from "./loginSlice";

const userReducer = combineReducers({
    users:SigninSlice.reducer
})

export default userReducer