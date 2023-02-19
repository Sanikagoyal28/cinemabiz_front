import React, { useState } from "react"
import signin from "../../Assets/signin.svg"
import emailicon from "../../Assets/emailIcon.svg"
import passicon from "../../Assets/passwordIcon.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./login.css";
// import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";

function Login() {
    // const [openPopup, setOpenPopup] = useState(false)
    
    const [show1, setShow1] = useState(true)
    function handleShow1() {
        setShow1(!show1)
    }

    return <>
    <div className="authDiv">
        <div className="leftDiv">
            <h1 className="authHead">Hi User :)</h1>
            <p className="authText">To keep connected with Cinemabiz, please login to your account by email address and
                    password or create a new account if you are new to Cinemabiz.</p>
            <p className="authEmail">Email Address</p>    
            <img src={emailicon} className="emailIcon" />
            <input type="text" className="authEmailInput" placeholder="Enter your Email" />
            <p className="wrongEmail">Invalid Email Address</p>
            <p className="authEmail">Password</p>    
            <img src={passicon} className="pwdIcon" />
            {show1 ? (
                    <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow1} />
                ) : (
                    <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow1} />
                )}
            <input type={show1?"text":"password"} className="authEmailInput" placeholder="Enter your Password" />
            <p className="fgtPwd">Forgot Password ?</p>
            <button type="button" className="signIn">SignIn</button>
            <button type="button" className="createAcc">Create Account</button>
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
    </>
}

export default Login