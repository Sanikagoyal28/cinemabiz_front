import { combineReducers } from "redux";
import { SigninSlice } from "./authSlice";
import { openLoginDialog } from "./authSlice";

const userReducer = combineReducers({
    users:SigninSlice.reducer,
    dialog:openLoginDialog.reducer
})

export default userReducer