import React, { useState } from "react";
import './Register.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Loading from '../LOADER/Loading';
import ErrorMessages from '../ErrorMessage/ErrorMessages';


const Register = () => {

  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZip] = useState('');
  const [phonenum, setPhone] = useState('');
  const [pic, setPic] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  async function AddUser() {

    setLoading(true);

    try {
      const newUser = {
        role: role,
        username: username,
        password: password,
        email: email,
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        phonenum: phonenum
      }

      console.log(newUser);

      //Post the data to the Database 
      const { data } = await axios.post('http://localhost:3001/users', newUser)
        .then(res => console.log(res.data));
      alert("THANKS FOR DONATING");

      console.log(data);

      //Set the value of the database
      sessionStorage.setItem("userInfo", JSON.stringify(data))

      setLoading(false);
      alert("THANKS FOR DONATING");
      window.location = "/";
      alert("THANKS FOR DONATING");

    }
    catch (error) {
      setLoading(false);
      setError(error.data);
    }
  }

  const postDetails = (pics) => {
    if (!pics) {
      console.log("PLEASE SELECT AN IMAGE");
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics)
      data.append('upload_preset', 'notezipper')
      data.append('cloud_name')
    }
  }


  return (

    <div className="form-ele">
      {error && <ErrorMessages variant='danger'>{error}</ErrorMessages>}
      {loading && <Loading />}
      <form className="data-form">
        <div className="form-container">
          <div className="form-element">
            <div className="left-side">
              <img src="../../assets/register-icon.png" className="register-img" />
            </div>
            <div className="right-side">
              <div>
                <span className="registration-header">REGISTRATION FORM</span>
              </div>
              <div className="form-element">
                <select id="role" onChange={(event) => {
                  setRole(event.target.value);
                }} className="input-ele custom-input">
                  <option defaultValue>Choose...</option>
                  <option>DONOR</option>
                  <option>NGO</option>
                </select>
              </div>
              <div className="form-element">
                <input type="text" id="username" className="input-ele custom-input" placeholder="Name" onChange={(event) => {
                  setUsername(event.target.value);
                }} required />
              </div>
              <div className="form-element">
                <input type="password" id="password" className="input-ele custom-input" placeholder="Password" onChange={(event) => {
                  setPassword(event.target.value);
                }} required />
              </div>
              <div className="form-element">
                <input type="email" id="email" className="input-ele custom-input" placeholder="Email" onChange={(event) => {
                  setEmail(event.target.value);
                }} required />
              </div>
              <div className="form-element">
                <input type="text" id="address" className="input-ele custom-input" placeholder="Address" onChange={(event) => {
                  setAddress(event.target.value);
                }} required />
              </div>
              <div className="form-element">
                <input type="text" id="city" className="input-ele custom-input" placeholder="City" onChange={(event) => {
                  setCity(event.target.value);
                }} required />
              </div>
              <div className="form-element">
                <input type="text" id="state" className="input-ele custom-input" placeholder="State" onChange={(event) => {
                  setState(event.target.value);
                }} required />
              </div>
              <div className="form-element">
                <input type="text" id="zipcode" className="input-ele custom-input" placeholder="Zip Code" onChange={(event) => {
                  setZip(event.target.value);
                }} required />
              </div>
              <div className="form-element">
                <input type="text" id="phonenum" className="input-ele custom-input" placeholder="Phone Number" onChange={(event) => {
                  setPhone(event.target.value);
                }} required />
              </div>
              {/* <Form.Group controlId="pic">
                <Form.Label> Profile Picture</Form.Label>
                <Form.File
                  id="custom-file"
                  type="image/png"
                  label="Upload Profile Pic"
                  custom
                />
              </Form.Group> */}
              <div className="form-element">
                <button onClick={AddUser} type="submit" className="btn btn-primary btn-custom">Submit</button>
                <Link to="/" className="linking">Go Back</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;