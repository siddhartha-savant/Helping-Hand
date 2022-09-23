import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./UpdateAccountDetails.scss";
import { useNavigate } from 'react-router-dom';

// This function is used to update the details of the donor, we are receiving info through sessionStorage
const UpdateAccountDetails = (props) => {

  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZip] = useState('');
  const [phonenum, setPhone] = useState('');

  let datavalues = JSON.parse(sessionStorage.userInfo);
  const redirect = useNavigate();

  // This is called when update button is clicked when user try to update the profile details

  const onClickUpdate = async () => {
    try {
      const updateAccount = {
        "username": username,
        "email": email,
        "address": address,
        "city": city,
        "state": state,
        "zipcode": zipcode,
        "phonenum": phonenum,
      }

      // Once value is changed we are able to put i.e. update the values at server side.
      console.log(updateAccount);

      axios.put('http://localhost:3001/users/' + datavalues._id, updateAccount)
        .then(res => sessionStorage.setItem('userInfo', JSON.stringify(res.data)));
          alert("Account successfully updated!");
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="form-ele">
      <form className="data-form">
        <div className="form-container">
          <div className="form-element">
            <div className="left-side">
              <img src="../../assets/register-icon.png" className="register-img" />
            </div>
            <div className="right-side">
              <div>
                <span className="update-account-header">Update Account details</span>
              </div>

              <div className="form-element">
                <input type="text" id="username" className="input-ele custom-input" placeholder="Name" onChange={(event) => {
                  setUsername(event.target.value)
                }} />
              </div>

              <div className="form-element">
                <input type="email" id="email" className="input-ele custom-input" placeholder="Email" onChange={(event) => {
                  setEmail(event.target.value)
                }} />
              </div>

              <div className="form-element">
                <input type="text" id="address" className="input-ele custom-input" placeholder="Address" onChange={(event) => {
                  setAddress(event.target.value)
                }} />
              </div>

              <div className="form-element">
                <input type="text" id="city" className="input-ele custom-input" placeholder="City" onChange={(event) => {
                  setCity(event.target.value)
                }} />
              </div>

              <div className="form-element">
                <input type="text" id="state" className="input-ele custom-input" placeholder="State" onChange={(event) => {
                  setState(event.target.value)
                }} />
              </div>

              <div className="form-element">
                <input type="text" id="zipcode" className="input-ele custom-input" placeholder="Zip Code" onChange={(event) => {
                  setZip(event.target.value)
                }} />
              </div>

              <div className="form-element">
                <input type="text" id="phonenum" className="input-ele custom-input" placeholder="Phone Number" onChange={(event) => {
                  setPhone(event.target.value)
                }} />
              </div>

              <div className="form-element">
                <button onClick={onClickUpdate} type="submit" className="btn btn-primary btn-custom">Update</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateAccountDetails;