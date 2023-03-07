import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../Authentication/auth/auth";
import searchImage from "../Assets/searchImage.svg"
import { openLoginDialog } from "../Redux/authSlice";
import "./navbar.css"
import { SearchThunk } from "../Redux/homeSlice";
import logoutImage from "../Assets/logout.svg"

function Navbar() {

    const dispatch = useDispatch()
    const reducer = useSelector((s) => s.home)
    const token = localStorage.getItem("access token")
    console.log(reducer)

    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [searchList, setSearchList] = useState([])

    sessionStorage.setItem("openLogin", false)
    function authentication() {
        dispatch(openLoginDialog.actions.openDialog())
        document.getElementById("LOGIN").style.display = "flex";
    }
    function handleClose() {
        setOpen(false)
    }
    function handleSearch(e) {
        setSearch(e.target.value)
        dispatch(SearchThunk(e.target.value))
    }
    useEffect(() => {
        setSearchList(reducer.search)
    }, [reducer])
    useEffect(() => {
        if (!localStorage.getItem("location"))
            setOpen(true)
        else
            setOpen(false)
    }, [])

    // useEffect(()=>{
    //     if(search=='')
    //     document.getElementById("searchList").style.display ="none"
    //     else
    //     document.getElementById("searchList").style.display ="block"
    // },[search])

    // logout 
    const [logout, setLogout] = useState(false)

    function openLogout () {
        setLogout(true)
    }
    function handleLogOut() {
        setLogout(false)
        localStorage.clear()
    }
    function handleCancelLog() {
        setLogout(false)
    }

    return <>
        <div className="navbar POPUPBG">
            <div className="navOne">
                <div className="subNav">
                    <p className="navTitle">Cinemabiz</p>
                    <div className="navSearch">Search</div>
                </div>
                <div className="subNav">
                    <p className="navLocation">{localStorage.getItem("location")}</p>
                    {token ? <button className="navButton2" onClick={openLogout}>Signout</button> :
                     <button className="navButton1" onClick={authentication}>Signin</button> }
                </div>
            </div>
            <div className="navTwo">
                <p className="navHead">Home</p>
                <p className="navHead" onClick={() => { setOpen(true) }}>Place</p>
                <p className="navHead">Cinema</p>
                <p className="navHead">Movie</p>
                <p className="navHead">Booking</p>
            </div>
        </div>
        <Auth />
        <Dialog open={open} onClose={handleClose}>
            <div className="search">
                <input type="text" className="searchInput" placeholder="Search for location" value={search} onChange={handleSearch} />
                <div id="searchList">
                    {searchList.map((s) => {
                        return <p className="searchOption" onClick={() => { setOpen(false); localStorage.setItem("location", s.cinema_location) }} >{s.cinema_location}</p>
                    })}
                </div>
                <img src={searchImage} className="searchImage" />
            </div>
        </Dialog>
        {/* logout */}
        <Dialog open={logout} onClose={()=>{setLogout(false)}}>
        <div className="logoutDiv">
            <div className="lOut1">
                <p className="logoutText1">Log Out?</p>
                <p className="logoutText2">Are you sure you want to log out?</p>
                <button className="logoutbtn1" onClick={handleLogOut}>Yes</button>
                <button className="logoutbtn2" onClick={handleCancelLog}>No</button>
            </div>
            <div className="lOut2">
                <img src={logoutImage} className="logoutImage" />
            </div>
        </div>
        </Dialog>
    </>
}

export default Navbar