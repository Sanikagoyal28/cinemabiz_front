import React, { useEffect, useState } from "react"
import signin from "../../Assets/signin.svg"
import emailicon from "../../Assets/emailIcon.svg"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { SignupThunk } from "../../Redux/loginSlice"
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ReactBootstrap from 'react-bootstrap';

function SignUp() {

    const [email, setEmail] = useState("")
    const [isAuthEmail, setIsAuthEmail] = useState(false)
    const[loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const reducer = useSelector((s)=>s.users)

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

    function sendOtp() {
        localStorage.setItem("email", email)
        if(isAuthEmail){
            dispatch(SignupThunk(email))
            .then((res) => {
                if(res.payload.data.success){
                    navigate("/signverify")
                }
                if(!res.payload.data.success){
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
    {loading?<ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
    <ToastContainer />
    </>
}

export default SignUp