import React, { Component, useContext, useEffect, useState } from 'react';
import './LoginPage.scss';
import axios from 'axios';
import Loading from '../LOADER/Loading';
import ErrorMessages from '../ErrorMessage/ErrorMessages';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../context/AppContext';

// This component is the login page of our application

function LoginPage() {

    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    const { login } = useContext(AppContext);
    const history = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();

        // This set the loader on screen

        setLoading(true);

        const newUser = {
            role: role,
            password: password,
            email: email
        }
        try {

            // Here we are sending the user request or login data to DB to check if user is valid or not

            const response = await axios.post('http://localhost:3001/users/login', newUser);
            console.log(response);


            if (response.statusText === "OK") {

                // Here we are setting the user data to session storage if user is successfully logged in

                sessionStorage.setItem('userInfo', JSON.stringify(response.data))

                login();

                setLoading(false);
                // Here we are redirecting on login to specific page as per user's role

                if (response.data.role === "NGO") {
                    history("/ngo");
                }
                else if (response.data.role === "DONOR") {
                    history("/Donor")
                }

            }

        } catch (error) {
            setLoading(false);

            // Here we are showing the error if credentials are not valid

            setError("INVALID EMAIL OR PASSWORD");

        }

    }

    return (
        // This is the UI or look of our page of login
        <div className="login-container">
            {error && <ErrorMessages variant='danger'>{error}</ErrorMessages>}
            {loading && <Loading />}
            <form className="login-element" onSubmit={onSubmit}>
                <div>
                    <img src="assets/icons/user.png" className="user-icon" />
                </div>
                <div className="login-elements">
                    <select id="inputRole" onChange={(e) => setRole(e.target.value)} className="role-dropdown custom-input">
                        <option defaultValue>Select role</option>
                        <option>DONOR</option>
                        <option>NGO</option>
                    </select>
                </div>
                <div className="login-elements">
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="custom-input" placeholder="Username" />
                </div>
                <div className="login-elements">
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} className="custom-input" placeholder="Password" />
                </div>
                <div className="login-elements">
                    <button type="submit" className="btn btn-primary login-btn">Login</button>
                </div>
            </form>
        </div>
    )


}

export default LoginPage;
