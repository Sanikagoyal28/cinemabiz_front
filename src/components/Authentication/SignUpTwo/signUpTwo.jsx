import React, { useState } from "react"
import signup from "../../Assets/signupTwo.svg"
import "./signup.css"
import passicon from "../../Assets/passwordIcon.svg"
import nameicon from "../../Assets/nameicon.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignupTwo() {

    const [show1, setShow1] = useState(true)
    function handleShow1() {
        setShow1(!show1)
    }
    const [show2, setShow2] = useState(false)
    function handleShow2() {
        setShow2(!show2)
    }

    return <>
        <div className="authDiv">
            <div className="leftDiv" id="signupDiv">
                <h1 className="authHead">Sign Up :)</h1>
                <p className="authText">Please fill the following details to start using your Account.</p>
                <p className="authEmail" id="signEmail">Full Name</p>
                <img src={nameicon} className="nameIcon" />
                <input type="text" className="authEmailInput" placeholder="Enter your Name" />
                <p className="wrongEmail" id="signError">Incorrect Name Format</p>
                <p className="authEmail" id="pwdName1">Password</p>
                <img src={passicon} className="pwdIcon" />
                {show1 ? (
                    <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow1} />
                ) : (
                    <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow1} />
                )}
                <input type={show1 ? "text" : "password"} className="authEmailInput" placeholder="Enter your Password" />
                <p className="wrongEmail" id="signError">Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
                <p className="authEmail" id="pwdName2">Confirm Password</p>
                <img src={passicon} className="pwdIcon" />
                {show2 ? (
                    <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow2} />
                ) : (
                    <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow2} />
                )}
                <input type={show2 ? "text" : "password"} className="authEmailInput" placeholder="Enter your Password" />
                <p className="wrongEmail" id="signError">Password entered in two fields must be same.</p>
                <button type="button" className="continue" id="signupButton">Continue</button>
            </div>
            <img src={signup} className="signImage" />
        </div>
    </>
}

export default SignupTwo