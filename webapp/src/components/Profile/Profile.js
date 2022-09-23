import './Profile.scss';
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    //Get the session data of the user
    let userdata = JSON.parse(sessionStorage.userInfo);

    //used for navigating to another page
    const navigation = useNavigate();
    
    //Delete a perticular account ("Deactivate user")
    const deleteuseraccount = () => {
        axios.delete(`http://localhost:3001/users/${userdata._id}`)
        sessionStorage.removeItem("userInfo");
        navigation("/");
        alert("Account has been successfully deleted!");
    }

    //Redirect ti Donor page or NGO Page
    const getNgolandingPage = () => {
        if(userdata.role == "DONOR"){
            navigation("/Donor");
        }else{
            navigation("/ngo");
        }
    }

    //Redirect to UpdateAccountDetails Page 
    const gettoUpdateProfile = () => {
        navigation("/UpdateAccountDetails");
    }

    return (
        <div>
           <div className="profile-container">
               <div className="go-back">
                    <button className="btn btn-info" onClick={gettoUpdateProfile}>Update profile</button>
                    <button className="btn btn-primary" onClick={getNgolandingPage}>Go back</button>
               </div>
                <div className="profile-header">
                    <h1>Hi ! {userdata.username}</h1>
                </div>
                <div className="profile-element">
                    <span className="profile-label">Username</span>
                    <span className="profile-data">{userdata.username}</span>
                </div>
                <div className="profile-element">
                    <span className="profile-label">Address</span>
                    <span className="profile-data">{userdata.address}</span>
                </div>
                <div className="profile-element">
                    <span className="profile-label">City</span>
                    <span className="profile-data">{userdata.city}</span>
                </div>
                <div className="profile-element">
                    <span className="profile-label">Number</span>
                    <span className="profile-data">{userdata.phonenum}</span>
                </div>
                <div className="profile-element">
                    <span className="profile-label">State</span>
                    <span className="profile-data">{userdata.state}</span>
                </div>
                <div className="profile-element">
                    <span className="profile-label">Zip Code</span>
                    <span className="profile-data">{userdata.zipcode}</span>
                </div>
                <div className="profile-element">
                    <span className="profile-label">Email</span>
                    <span className="profile-data">{userdata.email}</span>
                </div>
           </div>
           <div className="deactivate-account">
                <button className="btn btn-danger" onClick={deleteuseraccount}>Delete Account</button>
           </div>
        </div>
    )
}

export default Profile
