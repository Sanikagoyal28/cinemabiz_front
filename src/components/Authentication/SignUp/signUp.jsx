import React, { useEffect, useState } from "react"
import signin from "../../Assets/signin.svg"
import emailicon from "../../Assets/emailIcon.svg"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { SignupThunk } from "../../Redux/loginSlice"
import { ToastContainer} from 'react-toastify';

function SignUp() {

    const [email, setEmail] = useState("")
    const [isAuthEmail, setIsAuthEmail] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const reducer = useSelector((s)=>s.users)
    const [navigateSignVerify, setNavigateSignVerify] = useState(false)

    useEffect(() => {
        if (checkEmail.test(email)) {
            document.getElementById("signWrongEmail").style.display = "none";
            setIsAuthEmail(true)
        }
        else if (email) {
            document.getElementById("signWrongEmail").style.display = "block";
            setIsAuthEmail(false)
        }
    }, [email])

    useEffect(()=>{
        setNavigateSignVerify(reducer.toVerify)
    },[reducer])

    // useEffect(()=>{
    //     if(navigateSignVerify)
    //     navigate("/signverify")
    //  },[navigateSignVerify])

     localStorage.setItem("email", email)
    function sendOtp() {
        if(isAuthEmail){
            dispatch(SignupThunk(email))
        }
    }

    return <>
    <div className="authDiv">
        <div className="leftDiv" >
            <h1 className="authHead">Sign Up :)</h1>
            <p className="authText" id="fgtText">Hey, new User! Welcome to Cinemabiz. To set up a new Account, Please enter your Email Id in the input field. To proceed 
            further an Otp will be sent to below entered Email. </p>
            <p className="authEmail">Email Address</p> 
            <img src={emailicon} className="emailIcon" />   
            <input type="text" className="authEmailInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
            <p className="wrongEmail" id="signWrongEmail">Invalid Email Address</p>
            <button type="button" className="continue" onClick={()=>{sendOtp()}}>Continue</button>
        </div>
        <img src={signin} className="authImage" />
    </div>
    <ToastContainer />
    </>
}

export default SignUp