import React, { useEffect, useState } from "react"
import otp from "../../Assets/otp.svg"
import OtpField from "react-otp-field"
import "./otp.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPwdThunk, OtpVerifyThunk } from "../../Redux/authSlice";
import * as ReactBootstrap from 'react-bootstrap';

function Otp() {
    const [value, setValue] = useState("")
    const email = localStorage.getItem("email")
    const [loading, setLoading] = useState(false)
    const otpR = useSelector((s) => s.users)
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
        otp: value
    }
    console.log(data)

    function resetPassword() {
        dispatch(OtpVerifyThunk(data))
            .then((res) => {
                if(res.payload.data.success){
                    navigate("/reset")
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

    useEffect(() => {
        if (otpR.response) {
            toast.success(`${otpR.response}`, {
                position: "top-right",
                theme: "light",
            });
        }
    }, [otpR.response])

    useEffect(() => {
        if (otpR.loading) {
            setLoading(true)
            document.body.style.opacity = 0.5;
        }
        else {
            setLoading(false)
            document.body.style.opacity = 1;
        }
    }, [otpR.loading])

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
                <button type="button" className="continue" onClick={() => { resetPassword() }}>Continue</button>
            </div>
            <img src={otp} className="fgtImage" />
        </div>
        {loading ? <ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
        <ToastContainer />
    </>
}

export default Otp