import React, { useEffect, useState } from "react"
import resetImage from "../../Assets/resetpwd.svg"
import passicon from "../../Assets/passwordIcon.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./reset.css"
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ResetPasswordThunk } from "../../Redux/loginSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ReactBootstrap from 'react-bootstrap';

function ResetPassword() {

    const [pass, setPass] = useState("")
    const [cPass, setCPass] = useState("")
    const [isPass, setIsPass] = useState(false)
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const email = localStorage.getItem("email")
    const [loading, setLoading] = useState(false)
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
            document.getElementById("resetWrongPwd1").style.display = "none";
            setIsPass(true)
        } else if (pass) {
            document.getElementById("resetWrongPwd1").style.display = "block";
            setIsPass(false)
        }
    }, [pass]);

    useEffect(() => {
        if (pass == cPass) {
            setIsPass(true)
            document.getElementById("resetWrongPwd2").style.display = "none";
        }
        else {
            setIsPass(false)
            document.getElementById("resetWrongPwd2").style.display = "block";
        }
    }, [cPass])

    const data = {
        email,
        password: pass
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(data)

    function resetPassword() {
        if (isPass) {
            dispatch(ResetPasswordThunk(data))
                .then((res) => {
                    if(res.payload.data.success){
                        navigate("/login")
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
            <div className="leftDiv">
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
                <button type="button" className="continue" onClick={() => { resetPassword() }}>Continue</button>
            </div>
            <img src={resetImage} className="resetimage" />
        </div>
        {loading ? <ReactBootstrap.Spinner animation="border" variant="dark" id="loadSpinner" /> : null}
        <ToastContainer />
    </>
}

export default ResetPassword