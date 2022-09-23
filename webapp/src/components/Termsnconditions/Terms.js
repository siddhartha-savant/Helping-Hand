import './Terms.scss';
import '../Navbar/Navbar.scss'
import { Link } from "react-router-dom";

import React from 'react'

// This is the component used to show link for privacy policy and other main things.

const Terms = () => {
    return (
        <div className="tnc">
            <div className="tnc-element">
                <Link to="/privacyPolicy" className="tnc-link">Privacy Policy</Link>
                <Link to="/termsOfUse" className="tnc-link">Terms of Use</Link>
            </div>
            <div className="tnc-element">
                <span className="tnc-link cust">&copy;</span>
                <Link to="/" className="navbar-bar-item navbar-button"><b>HH</b> Helping Hands</Link>
            </div>
        </div>
    )
}

export default Terms
