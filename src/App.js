import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/Authentication/FgtPwd/fgtPwd";
import Login from "./components/Authentication/Login/login";
import Otp from "./components/Authentication/Otp/otp";
import ResetPassword from "./components/Authentication/ResetPassword/rstPwd";
import SignUp from "./components/Authentication/SignUp/signUp";
import SignupTwo from "./components/Authentication/SignUpTwo/signUpTwo";
import SignVerify from "./components/Authentication/signVerify/signverify";
import Homepage from "./components/Home/homepage";

function App() {
 return <>
 <BrowserRouter>
    <Routes>
        {/* <Route exact element={<Login />} path="/login" />
        <Route exact element={<ForgotPassword />} path="/forgot" />
        <Route exact element={<Otp />} path="/otp" />
        <Route exact element={<ResetPassword />} path="/reset" />
        <Route exact element={<SignUp />} path="/signup" />
        <Route exact element={<SignVerify />} path="/signverify" />
        <Route exact element={<SignupTwo />} path="/signuptwo" /> */}

        <Route exact element={<Homepage />} path="/" />
    </Routes>
 </BrowserRouter>
 </>

}

export default App;
