import "./footer.css"

function Footer () {
    return <>
        <div className="footer POPUPBG">
            <div className="footerOne">
                <p className="footHead">Cinemabiz</p>
                <p className="footText">Best platform to book your tickets in cheapest rate</p>
            </div>
            <div className="footerTwo" id="two">
                <p className="footTwoHead">Menu</p>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                    <li>User Agreement</li>
                </ul>
            </div>
            <div className="footerTwo" id="three">
                <p className="footTwoHead">Services</p>
                <ul>
                    <li>Facebook</li>
                    <li>LinkedIn</li>
                    <li>Twitter</li>
                </ul>
            </div>
        </div>
    </>
}

export default Footer