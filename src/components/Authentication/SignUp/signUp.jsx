import React, { useState } from "react"
import signin from "../../Assets/signin.svg"
import emailicon from "../../Assets/emailIcon.svg"

function SignUp() {

    return <>
    <div className="authDiv">
        <div className="leftDiv" >
            <h1 className="authHead">Sign Up :)</h1>
            <p className="authText" id="fgtText">Hey, new User! Welcome to Cinemabiz. To set up a new Account, Please enter your Email Id in the input field. To proceed 
            further an Otp will be sent to below entered Email. </p>
            <p className="authEmail">Email Address</p> 
            <img src={emailicon} className="emailIcon" />   
            <input type="text" className="authEmailInput" placeholder="Enter your Email" />
            <p className="wrongEmail">Invalid Email Address</p>
            <button type="button" className="continue">Continue</button>
        </div>
        <img src={signin} className="authImage" />
    </div>
    </>
}

export default SignUp