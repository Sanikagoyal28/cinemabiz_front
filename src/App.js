import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/Authentication/FgtPwd/fgtPwd";
import Login from "./components/Authentication/Login/login";
import Otp from "./components/Authentication/Otp/otp";
import ResetPassword from "./components/Authentication/ResetPassword/rstPwd";
import SignUp from "./components/Authentication/SignUp/signUp";
import SignupTwo from "./components/Authentication/SignUpTwo/signUpTwo";
import SignVerify from "./components/Authentication/signVerify/signverify";
import CinemaPage from "./components/Cinemas/cinemaPage";
import Cinemapanel from "./components/Home/cinemaPanel";
import Homepage from "./components/Home/homepage";
import Moviepanel from "./components/Home/moviePanel";
import MoviePage from "./components/Movies/moviePage";

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
        <Route element={<Moviepanel />} path="/home_movie" />
        <Route element={<Cinemapanel />} path="/home_cinema" />
        <Route element={<CinemaPage />} path="/cinema/:id" />
        <Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
 </BrowserRouter>
 </>

}

export default App;
