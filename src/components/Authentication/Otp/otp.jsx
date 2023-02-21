import React, { useEffect, useState } from "react"
import otp from "../../Assets/otp.svg"
import OtpField from "react-otp-field"
import "./otp.css"
import { ToastContainer} from 'react-toastify';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPwdThunk, OtpVerifyThunk } from "../../Redux/loginSlice";

function Otp() {
    const [value,setValue] = useState("")
    const email = localStorage.getItem("email")
    const [navigateReset, setNavigateReset] = useState(false)
    const otpR = useSelector((s)=>s.users)
    const [seconds, setSeconds] = useState(59)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const timer =
            seconds > 0 && setInterval(() => {
                setSeconds(seconds - 1)
            }, 1000)
        return () => clearInterval(timer)
    }, [seconds])

    useEffect(() => {
        if (seconds != 0)
            document.getElementById("resendOtp").style.opacity = "0.5";
        else
            document.getElementById("resendOtp").style.opacity = "1";
    }, [seconds])
    
    const data = {
        email,
        otp:value
    }

    useEffect(()=>{
        setNavigateReset(otpR.toReset)
    },[otpR])

    useEffect(()=>{
       if(navigateReset)
       navigate("/reset")
    },[navigateReset])

    function resetPassword(){
        if(value){
            dispatch(OtpVerifyThunk(data))
        }
    }
 
    return <>
    <div className="authDiv">
        <div className="leftDiv" id="fgtDiv">
            <h1 className="authHead">Otp Verification ;)</h1>
            <p className="authText" id="fgtText">To complete the password reset process, please enter the Otp sent on your Email Address</p>
            <p className="authEmail">Enter Otp for verification</p> 
            <div className="otpInputFlex">
            <OtpField className="otpInputFlex"
            value={value}
            onChange={setValue}
            numInputs={6}
            onChangeRegex={/^([0-9]{0,})$/}
            autoFocus
            isTypeNumber
            inputProps={{ className: 'otpInput', disabled: false }}
        />
        </div>
            {/* <p className="wrongEmail">Otp only contains numeric characters.</p> */}
            <div className="resend">
            <p id='resendOtp' disabled={seconds !== 0 ? true : false} onClick={() => { dispatch(ForgotPwdThunk(email), setSeconds(59)) }}>Resend Otp</p>
            <span id="timer">00:{seconds}</span>
            </div>
            <button type="button" className="continue" onClick={()=>{resetPassword()}}>Continue</button>
        </div>
        <img src={otp} className="fgtImage" />
    </div>
    <ToastContainer />
    </>
}

export default Otp