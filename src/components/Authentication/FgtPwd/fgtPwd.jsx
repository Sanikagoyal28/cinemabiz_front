import React, { useState } from "react"
import fgtpwdImage from "../../Assets/fgtpwd.svg"
import emailicon from "../../Assets/emailIcon.svg"
import "./fgtPwd.css"

function ForgotPassword() {

    return <>
    <div className="authDiv">
        <div className="leftDiv" id="fgtDiv">
            <h1 className="authHead">Forgot Password!</h1>
            <p className="authText" id="fgtText">Please enter your registered Email Address to proceed further.</p>
            <p className="authEmail">Email Address</p>  
            <img src={emailicon} className="emailIcon" />  
            <input type="text" className="authEmailInput" placeholder="Enter your Email" />
            <p className="wrongEmail">Invalid Email Address</p>
            <button type="button" className="continue">Continue</button>
        </div>
        <img src={fgtpwdImage} className="fgtImage" />
    </div>
    </>
}

export default ForgotPassword