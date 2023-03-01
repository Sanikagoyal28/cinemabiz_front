import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import React from "react"
import Footer from "../Footer/footer"
import MovieCard from "../Movies/Moviecard"
import Navbar from "../Navbar/navbar"
import "./homepage.css"

function Homepage (){
    return <>
    {/* <Box>
        <AppBar>
            <Toolbar>
                <Typography>Cinemabiz</Typography>
                <Typography>Location</Typography>
                <Button>Signin</Button>
            </Toolbar>
        </AppBar>
    </Box> */}
    <Navbar />
    <div className="home POPUPBG">
    <p className="homeTitle">Recommended Movies</p>
    <MovieCard />
    </div>
    <Footer />
    </>
}

export default Homepage