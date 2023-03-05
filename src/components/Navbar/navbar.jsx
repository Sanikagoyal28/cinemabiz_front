import { useDispatch } from "react-redux";
import Auth from "../Authentication/auth/auth";
import ForgotPassword from "../Authentication/FgtPwd/fgtPwd";
import Login from "../Authentication/Login/login";
import { openLoginDialog } from "../Redux/authSlice";
import "./navbar.css"

function Navbar() {

    // function setOPacity() {
    //     var items = document.getElementsByClassName("POPUPBG")
    //     for (var i = 0; i < items.length; i++) {
    //         document.getElementsByClassName("POPUPBG")[i].style.opacity = 0.5;
    //     }
    // }
    const dispatch = useDispatch()

    sessionStorage.setItem("openLogin", false)
    function authentication (){
        dispatch(openLoginDialog.actions.openDialog())
        document.getElementById("LOGIN").style.display = "flex";
    }
    return <>
        <div className="navbar POPUPBG">
            <div className="navOne">
                <div className="subNav">
                    <p className="navTitle">Cinemabiz</p>
                    <div className="navSearch">Search</div>
                </div>
                <div className="subNav">
                    <p className="navLocation">Location</p>
                    <button className="navButton" onClick={authentication}>Signin</button>
                </div>
            </div>
            <div className="navTwo">
                <p className="navHead">Home</p>
                <p className="navHead">Place</p>
                <p className="navHead">Cinema</p>
                <p className="navHead">Movie</p>
                <p className="navHead">Booking</p>
            </div>
        </div>
        <Auth />
        {/* <Login />
        <ForgotPassword /> */}
    </>
}

export default Navbar