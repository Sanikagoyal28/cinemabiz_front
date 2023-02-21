import React, { useEffect, useState } from "react"
import fgtpwdImage from "../../Assets/fgtpwd.svg"
import emailicon from "../../Assets/emailIcon.svg"
import "./fgtPwd.css"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { ForgotPwdThunk } from "../../Redux/loginSlice"
import { ToastContainer} from 'react-toastify';

function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [isAuthEmail, setIsAuthEmail] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const otp = useSelector((s)=>s.users)
    const [navigateOtp, setNavigateOtp] = useState(false)

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

    useEffect(()=>{
        setNavigateOtp(otp.toOtp)
    },[otp])
    useEffect(()=>{
        if(navigateOtp)
        navigate("/otp")
     },[navigateOtp])

    function sendOtp() {
        if(isAuthEmail){
            dispatch(ForgotPwdThunk(email))
        }
    }

    return <>
    <div className="authDiv">
        <div className="leftDiv" id="fgtDiv">
            <h1 className="authHead">Forgot Password!</h1>
            <p className="authText" id="fgtText">Please enter your registered Email Address to proceed further.</p>
            <p className="authEmail">Email Address</p>  
            <img src={emailicon} className="emailIcon" />  
            <input type="text" className="authEmailInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
            <p className="wrongEmail" id="forgotEmail">Invalid Email Address</p>
            <button type="button" className="continue" onClick={()=>{sendOtp()}}>Continue</button>
        </div>
        <img src={fgtpwdImage} className="fgtImage" />
    </div>
    <ToastContainer/>
    </>
}

export default ForgotPassword