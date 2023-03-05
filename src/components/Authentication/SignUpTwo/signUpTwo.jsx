import React, { useEffect, useState } from "react"
import signup from "../../Assets/signupTwo.svg"
import "./signup.css"
import passicon from "../../Assets/passwordIcon.svg"
import nameicon from "../../Assets/nameicon.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { SignTwoThunk } from "../../Redux/authSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ReactBootstrap from 'react-bootstrap';

function SignupTwo() {

    const [pass, setPass] = useState("")
    const [cPass, setCPass] = useState("")
    const [name, setName] = useState("")
    const [isPass, setIsPass] = useState(false)
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [loading, setLoading] = useState(false)
    const email = localStorage.getItem("email")
    const rightname = /^[A-Za-z\s]*$/;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reducer = useSelector((s) => s.users)
    function handleShow1() {
        setShow1(!show1)
    }
    function handleShow2() {
        setShow2(!show2)
    }
    const rightpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    useEffect(() => {
        if (rightpass.test(pass)) {
            document.getElementById("signWrongPwd1").style.display = "none";
            setIsPass(true)
        } else if (pass) {
            document.getElementById("signWrongPwd1").style.display = "block";
            setIsPass(false)
        }
    }, [pass]);

    useEffect(() => {
        if (pass == cPass) {
            setIsPass(true)
            document.getElementById("signWrongPwd2").style.display = "none";
        }
        else {
            setIsPass(false)
            document.getElementById("signWrongPwd2").style.display = "block";
        }
    }, [cPass])

    useEffect(() => {
        if (rightname.test(name)) {
            document.getElementById("signWrongName").style.display = "none";
            setIsPass(true)
        } else if (name) {
            document.getElementById("signWrongName").style.display = "block";
            setIsPass(false)
        }
    }, [name]);

    const data = {
        name: name,
        email: email,
        password: pass
    }

    function handleSignup() {
        if (isPass) {
            dispatch(SignTwoThunk(data))
                .then((res) => {
                    if (res.payload.data.success) {
                        navigate("/")
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

    useEffect(() => {
        if (reducer.response) {
            toast.success(`${reducer.response}`, {
                position: "top-right",
                theme: "light",
            });
        }
    }, [reducer.response])

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
            <div className="leftDiv" id="signupDiv">
                <h1 className="authHead">Sign Up :)</h1>
                <p className="authText">Please fill the following details to start using your Account.</p>
                <p className="authEmail" id="signEmail">Full Name</p>
                <img src={nameicon} className="nameIcon" />
                <input type="text" className="authEmailInput" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" />
                <p className="wrongEmail" id="signWrongName">Incorrect Name Format</p>
                <p className="authEmail" id="pwdName1">Password</p>
                <img src={passicon} className="pwdIcon" />
                {show1 ? (
                    <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow1} />
                ) : (
                    <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow1} />
                )}
                <input type={show1 ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)} className="authEmailInput" placeholder="Enter your Password" />
                <p className="wrongEmail" id="signWrongPwd1">Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
                <p className="authEmail" id="pwdName2">Confirm Password</p>
                <img src={passicon} className="pwdIcon" />
                {show2 ? (
                    <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow2} />
                ) : (
                    <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow2} />
                )}
                <input type={show2 ? "text" : "password"} value={cPass} onChange={(e) => setCPass(e.target.value)} className="authEmailInput" placeholder="Enter your Password" />
                <p className="wrongEmail" id="signWrongPwd2">Password entered in two fields must be same.</p>
                <button type="button" className="continue" id="signupButton" onClick={() => { handleSignup() }}>Continue</button>
            </div>
            <img src={signup} className="signImage" />
        </div>
        {loading ? <ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
        <ToastContainer />
    </>
}

export default SignupTwo