import React, { useEffect, useState } from "react"
import fgtpwdImage from "../../Assets/fgtpwd.svg"
import emailicon from "../../Assets/emailIcon.svg"
import "./fgtPwd.css"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { ForgotPwdThunk } from "../../Redux/loginSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ReactBootstrap from 'react-bootstrap';

function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [isAuthEmail, setIsAuthEmail] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const reducer = useSelector((s) => s.users)

    useEffect(() => {
        if (checkEmail.test(email)) {
            document.getElementById("forgotEmail").style.display = "none";
            setIsAuthEmail(true)
        }
        else if (email) {
            document.getElementById("forgotEmail").style.display = "block";
            setIsAuthEmail(false)
        }
    }, [email])

    function sendOtp() {
        if (isAuthEmail) {
            localStorage.setItem("email", email)
            dispatch(ForgotPwdThunk(email))
                .then((res) => {
                    if(res.payload.data.success){
                        navigate("/otp")
                    }
                    if (!res.payload.data.success) {
                        toast.error(`${res.payload.data.msg}`, {
                            position: "top-right",
                            theme: "light",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        if (reducer.response) {
            toast.success(`${reducer.response}`, {
                position: "top-right",
                theme: "light",
            });
        }
    }, [reducer.response])

    useEffect(() => {
        if (reducer.loading) {
            setLoading(true)
            document.body.style.opacity = 0.5;
        }
        else {
            setLoading(false)
            document.body.style.opacity = 1;
        }
    }, [reducer.loading])

    return <>
        <div className="authDiv">
            <div className="leftDiv" id="fgtDiv">
                <h1 className="authHead">Forgot Password!</h1>
                <p className="authText" id="fgtText">Please enter your registered Email Address to proceed further.</p>
                <p className="authEmail">Email Address</p>
                <img src={emailicon} className="emailIcon" />
                <input type="text" className="authEmailInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
                <p className="wrongEmail" id="forgotEmail">Invalid Email Address</p>
                <button type="button" className="continue" onClick={() => { sendOtp() }}>Continue</button>
            </div>
            <img src={fgtpwdImage} className="fgtImage" />
        </div>
        {loading ? <ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
        <ToastContainer />
    </>
}

export default ForgotPassword