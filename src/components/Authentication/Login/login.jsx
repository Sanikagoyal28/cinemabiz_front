import React, { useEffect, useState } from "react"
import signin from "../../Assets/signin.svg"
import emailicon from "../../Assets/emailIcon.svg"
import passicon from "../../Assets/passwordIcon.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import create from "../../Redux/loginSlice"
import SignInThunk from "../../Redux/loginSlice";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
// import Spinner from 'react-bootstrap/Spinner';
import * as ReactBootstrap from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
// import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";

function Login() {
    // const [openPopup, setOpenPopup] = useState(false)
    const dispatch = useDispatch()
    const s = useSelector((state) => state.users)
    const [show1, setShow1] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAuthEmail, setIsAuthEmail] = useState(false)
    const [loading, setLoading] = useState(s.loading)
    const navigate = useNavigate();
    const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    useEffect(() => {
        if (checkEmail.test(email)) {
            document.getElementById("loginWrongEmail").style.display = "none";
            setIsAuthEmail(true)
        }
        else if (email) {
            document.getElementById("loginWrongEmail").style.display = "block";
            setIsAuthEmail(false)
        }
    }, [email])
    function handleShow1() {
        setShow1(!show1)
    }

    const data = {
        email,
        password
    }
  
    function SigninCall() {
        localStorage.setItem("email", email)
        if(isAuthEmail){
            dispatch(SignInThunk(data)).
            then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    useEffect(() => {
        setLoading(s.loading)
    }, [s])

    useEffect(() => {
        if (s.loading) {
            if (s.response) {
                toast.success(`${s.response}`, {
                    position: "top-right",
                    theme: "light",
                });
            }
            if (s.error) {
                toast.error(`${s.error}`, {
                    position: "top-right",
                    theme: "light",
                });
            }
        }
    }, [s])

    useEffect(() => {
        if (loading === true) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])

    return <>
        <div className="authDiv" id="LOGIN">
            <div className="leftDiv">
                <h1 className="authHead">Hi User :)</h1>
                <p className="authText">To keep connected with Cinemabiz, please login to your account by email address and
                    password or create a new account if you are new to Cinemabiz.</p>
                <p className="authEmail">Email Address</p>
                <img src={emailicon} className="emailIcon" />
                <input type="text" className="authEmailInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
                <p className="wrongEmail" id="loginWrongEmail">Invalid Email Address</p>
                <p className="authEmail" id="loginPwd">Password</p>
                <img src={passicon} className="pwdIcon" />
                {show1 ? (
                    <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow1} />
                ) : (
                    <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow1} />
                )}
                <input type={show1 ? "text" : "password"} className="authEmailInput" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
                <p className="fgtPwd" onClick={() => navigate("/forgot")}>Forgot Password ?</p>
                <button type="button" className="signIn" onClick={() => SigninCall()}>SignIn</button>
                <button type="button" className="createAcc" onClick={() => navigate("/signup")}>Create Account</button>
            </div>
            <img src={signin} className="authImage" />
        </div>
        {/* <Button onClick={() => setOpenPopup(true)} variant="contained" >Login</Button>
        <Dialog open={openPopup}>
            <Box sx={{width:450}}>
                <DialogTitle sx={{fontSize:"2.7rem", fontWeight:"700",fontFamily:"Montserrat"}}>Hi User :)</DialogTitle>
                <DialogContent sx={{opacity:"0.8", fontFamily:"Montserrat"}}>To keep connected with Cinemabiz, please login to your account by email address and
                    password or create a new account if you are new to Cinemabiz.</DialogContent>
                <Typography sx={{marginLeft:3, fontSize:"15px", fontWeight:"600", fontFamily:"Montserrat"}}>Email Address</Typography>
                <TextField sx={{marginLeft:3,fontFamily:"Montserrat"}} inputProps={{style: {height: "10px",width:"340px", borderRadius:"20px"}}} variant="outlined" placeholder="Enter your Email" ></TextField>
                <Typography sx={{marginLeft:3,fontFamily:"Montserrat"}}>Password</Typography>
                <TextField sx={{marginLeft:3}} variant="outlined" inputProps={{style: {height: "13px",width:"340px"}, }} placeholder="Enter your Password"></TextField>
                <Typography sx={{marginLeft:3}}>Forgot Password?</Typography>
                <Button sx={{marginLeft:3}} variant="contained">SignIn</Button>
                <Button variant="outlined">Create Account</Button>
            </Box>
        </Dialog> */}
        <div>

            {/* <ReactBootstrap.Spinner animation="border" variant="dark" id="spinner" /> */}
        </div>
        {loading?<ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
        <ToastContainer />
    </>
}

export default Login