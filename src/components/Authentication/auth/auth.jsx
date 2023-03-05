import React, { useEffect, useState } from "react"
import signin from "../../Assets/signin.svg"
import emailicon from "../../Assets/emailIcon.svg"
import passicon from "../../Assets/passwordIcon.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../Login/login.css";
import { useDispatch, useSelector } from "react-redux";
import create, { SignupVerifyThunk } from "../../Redux/authSlice"
import SignInThunk from "../../Redux/authSlice";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import * as ReactBootstrap from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

import { ForgotPwdThunk } from "../../Redux/authSlice"
import fgtpwdImage from "../../Assets/fgtpwd.svg"
import "../FgtPwd/fgtPwd.css"

import { OtpVerifyThunk } from "../../Redux/authSlice";
import otp from "../../Assets/otp.svg"
import OtpField from "react-otp-field"
import "../Otp/otp.css"

import { ResetPasswordThunk } from "../../Redux/authSlice";
import resetImage from "../../Assets/resetpwd.svg"
import "../ResetPassword/reset.css"

import { SignupThunk } from "../../Redux/authSlice"

import { SignTwoThunk } from "../../Redux/authSlice"
import signup from "../../Assets/signupTwo.svg"
import "../SignUpTwo/signup.css"
import nameicon from "../../Assets/nameicon.svg"

import { Dialog } from "@mui/material";
import "./auth.css"
import arrow from "../../Assets/arrow-back.svg";

function Auth() {

    // LOGIN SECTION
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const reducer = useSelector((s) => s.users)
    const popup = useSelector((s)=>s.dialog)
    // console.log(popup)
    const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [show, setShow] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        if (checkEmail.test(email)) {
            document.getElementById("loginWrongEmail").style.display = "none";
            setIsLogin(true)
        }
        else if (email) {
            document.getElementById("loginWrongEmail").style.display = "block";
            setIsLogin(false)
        }
    }, [email])
    function handleShow() {
        setShow(!show)
    }

    const data = {
        email,
        password
    }

    function SigninCall() {
        localStorage.setItem("email", email)
        if (isLogin) {
            dispatch(SignInThunk(data)).
                then((res) => {
                    if (!res.payload.data.success) {
                        toast.error(`${res.payload.data.msg}`, {
                            position: "top-right",
                            theme: "light",
                        });
                    }
                    if (res.payload.data.success) {
                        setOpenDialog({login:false})
                        toast.success(`${res.payload.data.msg}`, {
                            position: "top-right",
                            theme: "light",
                        });
                    }
                })
                .catch((err) => {
                })
        }
    }

    // FORGOT PASSWORD SECTION
    const [emailF, setEmailF] = useState('')
    const [isForgot, setIsForgot] = useState(false)

    useEffect(() => {
        if (checkEmail.test(emailF)) {
            document.getElementById("forgotEmail").style.display = "none";
            setIsForgot(true)
        }
        else if (emailF) {
            document.getElementById("forgotEmail").style.display = "block";
            setIsForgot(false)
        }
    }, [emailF])

    function sendOtp() {
        if (isForgot) {
            localStorage.setItem("email", emailF)
            dispatch(ForgotPwdThunk(emailF))
                .then((res) => {
                    if (res.payload.data.success) {
                        setOpenDialog({ otp: true })
                        toast.success(`${res.payload.data.msg}`, {
                            position: "top-right",
                            theme: "light",
                        });
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

    //  OTP SECTION
    const [value, setValue] = useState("")
    const [second1, setSecond1] = useState(59)

    useEffect(() => {
        const timer =
            second1 > 0 && setInterval(() => {
                setSecond1(second1 - 1)
            }, 1000)
        return () => clearInterval(timer)
    }, [second1])

    // useEffect(() => {
    //     if (second1 !== 0)
    //    
    //         // document.getElementById("fgtResendOtp").style.opacity = "0.5";
    //     else
    //         document.getElementById("fgtResendOtp").style.opacity = "1";
    // }, [second1])

    const data2 = {
        email: emailF,
        otp: value
    }

    function resetPassword() {
        dispatch(OtpVerifyThunk(data2))
            .then((res) => {
                if (res.payload.data.success) {
                    setOpenDialog({ reset: true })
                    toast.success(`${res.payload.data.msg}`, {
                        position: "top-right",
                        theme: "light",
                    });
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

    //  RESET PASSWORD
    const [pass, setPass] = useState("")
    const [cPass, setCPass] = useState("")
    const [isPass, setIsPass] = useState(false)
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    function handleShow1() {
        setShow1(!show1)
    }
    function handleShow2() {
        setShow2(!show2)
    }
    const rightpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    useEffect(() => {
        if (rightpass.test(pass)) {
            document.getElementById("resetWrongPwd1").style.display = "none";
            setIsPass(true)
        } else if (pass) {
            document.getElementById("resetWrongPwd1").style.display = "block";
            setIsPass(false)
        }
    }, [pass]);

    // useEffect(() => {
    //     if (pass == cPass) {
    //         setIsPass(true)
    //         document.getElementById("resetWrongPwd2").style.display = "none";
    //     }
    //     else {
    //         setIsPass(false)
    //         document.getElementById("resetWrongPwd2").style.display = "block";
    //     }
    // }, [cPass])

    const data3 = {
        email:emailF,
        password: pass
    }

    function resetPassword2() {
        if (isPass) {
            dispatch(ResetPasswordThunk(data3))
                .then((res) => {
                    if (res.payload.data.success) {
                        setOpenDialog({ login: true })
                        toast.success(`${res.payload.data.msg}`, {
                            position: "top-right",
                            theme: "light",
                        });
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

    //  SIGNUP
    const [emailS, setEmailS] = useState("")
    const [isSignup, setIsSignup] = useState(false)

    useEffect(() => {
        if (checkEmail.test(emailS)) {
            document.getElementById("signWrongEmail").style.display = "none";
            setIsSignup(true)
        }
        else if (emailS) {
            document.getElementById("signWrongEmail").style.display = "block";
            setIsSignup(false)
        }
    }, [emailS])

    function sendOtp2() {
        localStorage.setItem("email", emailS)
        if (isSignup) {
            dispatch(SignupThunk(emailS))
                .then((res) => {
                    if (res.payload.data.success) {
                        setOpenDialog({ signVerify: true })
                        toast.success(`${res.payload.data.msg}`, {
                            position: "top-right",
                            theme: "light",
                        });
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

    //  SIGN VERIFY
    const [otpValue, setOtpvalue] = useState("")
    const [seconds, setSeconds] = useState(59)
    useEffect(() => {
        const timer =
            seconds > 0 && setInterval(() => {
                setSeconds(seconds - 1)
            }, 1000)
        return () => clearInterval(timer)
    }, [seconds])

    // useEffect(() => {
    //     if (seconds != 0)
    //         document.getElementById("resendOtp").style.opacity = "0.5";
    //     else
    //         document.getElementById("resendOtp").style.opacity = "1";
    // }, [seconds])

    const data4 = {
        email: emailS,
        otp: otpValue
    }
  
    function signupDetail() {
        if (otpValue) {
            dispatch(SignupVerifyThunk(data4))
                .then((res) => {
                    if (res.payload.data.success) {
                        setOpenDialog({ signupTwo: true })
                        toast.success(`${res.payload.data.msg}`, {
                            position: "top-right",
                            theme: "light",
                        });
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

    // SIGN UP TWO

    const [passS, setPassS] = useState("")
    const [cPassS, setCPassS] = useState("")
    const [nameS, setNameS] = useState("")
    const [isPassS, setIsPassS] = useState(false)
    const [show1S, setShow1S] = useState(false)
    const [show2S, setShow2S] = useState(false)
    const rightname = /^[A-Za-z\s]*$/;
    function handleShow1S() {
        setShow1S(!show1S)
    }
    function handleShow2S() {
        setShow2S(!show2S)
    }
    useEffect(() => {
        if (rightpass.test(passS)) {
            document.getElementById("signWrongPwd1").style.display = "none";
            setIsPassS(true)
        } else if (passS) {
            document.getElementById("signWrongPwd1").style.display = "block";
            setIsPassS(false)
        }
    }, [passS]);

    // useEffect(() => {
    //     if (passS == cPassS) {
    //         setIsPassS(true)
    //         document.getElementById("signWrongPwd2").style.display = "none";
    //     }
    //     else {
    //         setIsPassS(false)
    //         document.getElementById("signWrongPwd2").style.display = "block";
    //     }
    // }, [cPassS])

    // useEffect(() => {
    //     if (rightname.test(nameS)) {
    //         document.getElementById("signWrongName").style.display = "none";
    //         setIsPassS(true)
    //     } else if (nameS) {
    //         document.getElementById("signWrongName").style.display = "block";
    //         setIsPassS(false)
    //     }
    // }, [nameS]);

    const data5 = {
        name: nameS,
        email: emailS,
        password: passS
    }

    function handleSignup() {
        if (isPassS) {
            dispatch(SignTwoThunk(data5))
                .then((res) => {
                    if (res.payload.data.success) {
                        setOpenDialog({ signupTwo: false })
                        toast.success(`${res.payload.data.msg}`, {
                            position: "top-right",
                            theme: "light",
                        });
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

    // useEffect(() => {
    //     if (reducer.response) {
    //         toast.success(`${reducer.response}`, {
    //             position: "top-right",
    //             theme: "light",
    //         });
    //     }
    // }, [reducer.response])

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

    const [openPopup, setOpenPopup] = useState(false)
    useEffect(()=>{
        setOpenPopup(popup.isOpen)
    },[popup])
    const [openDialog, setOpenDialog] = useState({
        login: openPopup,
        forgot: false,
        otp: false,
        reset: false,
        signup: false,
        signVerify: false,
        signupTwo: false
    })

    return <>
        <div id="LOGIN">
            {/* LOGIN SECTION */}
            <Dialog open={openDialog.login} >
                <div className="authDiv">
                    <div className="leftDiv">
                        <img src={arrow} id="arrow" onClick={() => { setOpenDialog({ login: false }) }} />
                        <h1 className="authHead">Hi User :)</h1>
                        <p className="authText">To keep connected with Cinemabiz, please login to your account by email address and
                            password or create a new account if you are new to Cinemabiz.</p>
                        <p className="authEmail">Email Address</p>
                        <img src={emailicon} className="emailIcon" />
                        <input type="text" className="authEmailInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
                        <p className="wrongEmail" id="loginWrongEmail">Invalid Email Address</p>
                        <p className="authEmail" id="loginPwd">Password</p>
                        <img src={passicon} className="pwdIcon" />
                        {show ? (
                            <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow} />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow} />
                        )}
                        <input type={show ? "text" : "password"} className="authEmailInput" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
                        <p className="fgtPwd" onClick={() => { setOpenDialog({ forgot: true }) }}>Forgot Password ?</p>
                        <button type="button" className="signIn" onClick={() => SigninCall()}>SignIn</button>
                        <button type="button" className="createAcc" onClick={() => { setOpenDialog({ signup: true }) }}>Create Account</button>
                    </div>
                    <img src={signin} className="authImage" />
                </div>
                <ToastContainer />
                {loading ? <ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
            </Dialog>

            {/* FORGOT PASSWORD SECTION */}
            <Dialog open={openDialog.forgot}>
                <div className="authDiv" >
                    <div className="leftDiv" id="fgtDiv">
                        <img src={arrow} id="arrow" onClick={() => { setOpenDialog({ forgot: false }); setOpenDialog({ login: true }) }} />
                        <h1 className="authHead">Forgot Password!</h1>
                        <p className="authText" id="fgtText">Please enter your registered Email Address to proceed further.</p>
                        <p className="authEmail">Email Address</p>
                        <img src={emailicon} className="emailIcon" />
                        <input type="text" className="authEmailInput" value={emailF} onChange={(e) => setEmailF(e.target.value)} placeholder="Enter your Email" />
                        <p className="wrongEmail" id="forgotEmail">Invalid Email Address</p>
                        <button type="button" className="continue" onClick={() => { sendOtp() }}>Continue</button>
                    </div>
                    <img src={fgtpwdImage} className="fgtImage" />
                </div>
                <ToastContainer />
                {loading ? <ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
            </Dialog>

            {/* OTP SECTION */}
            <Dialog open={openDialog.otp}>
                <div className="authDiv">
                    <div className="leftDiv" id="fgtDiv">
                        <img src={arrow} id="arrow" onClick={() => { setOpenDialog({ otp: false }); setOpenDialog({ forgot: true }) }} />
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
                        <div className="resend">
                            <p id='fgtResendOtp' disabled={second1 !== 0 ? true : false} onClick={() => { dispatch(ForgotPwdThunk(emailF), setSecond1(59)) }}>Resend Otp</p>
                            <span id="timer1">00:{second1}</span>
                        </div>
                        <button type="button" className="continue" onClick={() => { resetPassword() }}>Continue</button>
                    </div>
                    <img src={otp} className="fgtImage" />
                </div>
                <ToastContainer />
                {loading ? <ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
            </Dialog>

            {/* RESET PASSWORD */}
            <Dialog open={openDialog.reset}>
                <div className="authDiv">
                    <div className="leftDiv">
                        <img src={arrow} id="arrow" onClick={() => { setOpenDialog({ reset: false }); setOpenDialog({ otp: true }) }} />
                        <h1 className="authHead">Reset Password :)</h1>
                        <p className="authText">Enter a new password</p>
                        <p className="authEmail" id="pwdName1" >New Password</p>
                        <img src={passicon} className="pwdIcon" />
                        {show1 ? (
                            <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow1} />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow1} />
                        )}
                        <input type={show1 ? "text" : "password"} className="authEmailInput" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter your Password" />
                        <p className="wrongEmail" id="resetWrongPwd1">Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
                        <p className="authEmail" id="pwdName2">Confirm Password</p>
                        <img src={passicon} className="pwdIcon" />
                        {show2 ? (
                            <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow2} />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow2} />
                        )}
                        <input type={show2 ? "text" : "password"} className="authEmailInput" value={cPass} onChange={(e) => setCPass(e.target.value)} placeholder="Enter your Password" />
                        <p className="wrongEmail" id="resetWrongPwd2">Password entered in two fields must be same.</p>
                        <button type="button" className="continue" onClick={() => { resetPassword2() }}>Continue</button>
                    </div>
                    <img src={resetImage} className="resetimage" />
                </div>
                <ToastContainer />
                {loading ? <ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
            </Dialog>

            {/* SIGNUP */}
            <Dialog open={openDialog.signup}>
                <div className="authDiv">
                    <div className="leftDiv" >
                        <img src={arrow} id="arrow" onClick={() => { setOpenDialog({ signup: false }); setOpenDialog({ login: true }) }} />
                        <h1 className="authHead">Sign Up :)</h1>
                        <p className="authText" id="fgtText">Hey, new User! Welcome to Cinemabiz. To set up a new Account, Please enter your Email Id in the input field. To proceed
                            further an Otp will be sent to below entered Email. </p>
                        <p className="authEmail">Email Address</p>
                        <img src={emailicon} className="emailIcon" />
                        <input type="text" className="authEmailInput" value={emailS} onChange={(e) => setEmailS(e.target.value)} placeholder="Enter your Email" />
                        <p className="wrongEmail" id="signWrongEmail">Invalid Email Address</p>
                        <button type="button" className="continue" onClick={() => { sendOtp2() }}>Continue</button>
                    </div>
                    <img src={signin} className="authImage" />
                </div>
                <ToastContainer />
                {loading ? <ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
            </Dialog>

            {/* EMAIL VERIFY */}
            <Dialog open={openDialog.signVerify}>
                <div className="authDiv">
                    <div className="leftDiv" id="fgtDiv">
                        <img src={arrow} id="arrow" onClick={() => { setOpenDialog({ signVerify: false }); setOpenDialog({ signup: true }) }} />
                        <h1 className="authHead">Email Verification ;)</h1>
                        <p className="authText" id="fgtText">To complete the SignUp process, please enter the Otp sent on your Email Address</p>
                        <p className="authEmail">Enter Otp for verification</p>
                        <div className="otpInputFlex">
                            <OtpField className="otpInputFlex"
                                value={otpValue}
                                onChange={setOtpvalue}
                                numInputs={6}
                                onChangeRegex={/^([0-9]{0,})$/}
                                autoFocus
                                isTypeNumber
                                inputProps={{ className: 'otpInput', disabled: false }}
                            />
                        </div>
                        <div className="resend">
                            <p id='resendOtp' disabled={seconds !== 0 ? true : false} onClick={() => { dispatch(ForgotPwdThunk(email), setSeconds(59)) }}>Resend Otp</p>
                            <span id="timer">00:{seconds}</span>
                        </div>
                        <button type="button" className="continue" onClick={() => { signupDetail() }}>Continue</button>
                    </div>
                    <img src={otp} className="fgtImage" />
                </div>
                <ToastContainer />
                {loading ? <ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
            </Dialog>

            {/* SIGN UP TWO */}
            <Dialog open={openDialog.signupTwo}>
                <div className="authDiv">
                    <div className="leftDiv" id="signupDiv">
                        <img src={arrow} id="arrow" onClick={() => { setOpenDialog({ signupTwo: false }); setOpenDialog({ signVerify: true }) }} />
                        <h1 className="authHead">Sign Up :)</h1>
                        <p className="authText">Please fill the following details to start using your Account.</p>
                        <p className="authEmail" id="signEmail">Full Name</p>
                        <img src={nameicon} className="nameIcon" />
                        <input type="text" className="authEmailInput" value={nameS} onChange={(e) => setNameS(e.target.value)} placeholder="Enter your Name" />
                        <p className="wrongEmail" id="signWrongName">Incorrect Name Format</p>
                        <p className="authEmail" id="pwdName1">Password</p>
                        <img src={passicon} className="pwdIcon" />
                        {show1S ? (
                            <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow1S} />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow1S} />
                        )}
                        <input type={show1S ? "text" : "password"} value={passS} onChange={(e) => setPassS(e.target.value)} className="authEmailInput" placeholder="Enter your Password" />
                        <p className="wrongEmail" id="signWrongPwd1">Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
                        <p className="authEmail" id="pwdName2">Confirm Password</p>
                        <img src={passicon} className="pwdIcon" />
                        {show2S ? (
                            <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow2S} />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow2S} />
                        )}
                        <input type={show2S ? "text" : "password"} value={cPassS} onChange={(e) => setCPassS(e.target.value)} className="authEmailInput" placeholder="Enter your Password" />
                        <p className="wrongEmail" id="signWrongPwd2">Password entered in two fields must be same.</p>
                        <button type="button" className="continue" id="signupButton" onClick={() => { handleSignup() }}>Continue</button>
                    </div>
                    <img src={signup} className="signImage" />
                </div>
                <ToastContainer />
                {loading ? <ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
            </Dialog>
        </div>
        <ToastContainer />
    </>
}
export default Auth