import React, { useContext } from 'react'
import './Navbar.scss';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from '../../context/AppContext';
import Button from '@restart/ui/esm/Button';

/**
 * 
 * This function is used to render the Navbar. The Navbar will have different apperance according to user login.
 */
function Navbar() {

  const history = useNavigate();

  const { isUserLoggedIn, logout } = useContext(AppContext);

  return (
    <div className="navbar-top">
      <div className="navbar-head navbar-white navbar-wide navbar-padding">
        <Link to="/" className="navbar-bar-item navbar-button"><b>HH</b> Helping Hands</Link>
        <div className="navbar-right">

          {
            sessionStorage.userInfo != null ?
              <>

                <Link className="navbar-bar-item navbar-button" to="/Profile">Profile</Link>
                <Button className="navbar-bar-item navbar-button" onClick={() => { sessionStorage.removeItem('userInfo'); logout(); history('/login') }}>Log Out</Button>

              </>
              :
              <>
                <Link to="/about" className="navbar-bar-item navbar-button">About</Link>
                <Link to="/contact" className="navbar-bar-item navbar-button">Contact</Link>
                <Link className="navbar-bar-item navbar-button" to="/login">Login</Link>
                <Link className="navbar-bar-item navbar-button" to="/register">Register</Link>
              </>
          }
        </div>
      </div>
    </div>
  );

}

export default Navbar;