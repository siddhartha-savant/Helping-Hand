import React, { useState } from "react";
import './VisitSchedule.scss'
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import Loading from '../LOADER/Loading';
import ErrorMessages from '../ErrorMessage/ErrorMessages';

// This page is used to schedule a visit by a Donor to NGO

const VisitSchedule = (props) => {

    const [ngoName, setNGOName] = useState(props.ngoName);
    const [ngoEmail, setNGOEmail] = useState(props.ngoEmail);
    const [donorName, setDonorName] = useState('');
    const [donorContact, setDonorContact] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    // This is called when user clicks on Request to visit
    async function AddUser() {

        setLoading(true);

        try {
            const newVisit = {
                ngoName: ngoName,
                ngoEmail: ngoEmail,
                donorName: donorName,
                donorContact: donorContact,
                status: 'Open',
                date: date,
                time: time

            }

            console.log(newVisit);

            try {
                const { data } = await axios.post('http://localhost:3001/visit', newVisit)
                    .then(res => console.log(res.data));
            } catch (err) {
                throw err;
            }

            setLoading(false);
            alert("Visit has been scheduled");

        }
        catch (error) {
            setLoading(false);
        }
    }

    return (

        <div className="form-ele">
            {error && <ErrorMessages variant='danger'>{error}</ErrorMessages>}
            {loading && <Loading />}
            <form className="data-form">
                <div className="form-container">
                    <div className="form-element">
                        <div className="visitSchedule-container">
                            <div className="visitSchedule-head">
                                <h2>Schedule Your Visit</h2>
                                <div class="visitSchedule-element">
                                    <label for="inputNGO" className="visitSchedule-label">NGO Name</label>
                                    <input type="text" className="form-control" id="inputNGO" value={props.ngoName} disabled />
                                </div>
                                <div class="visitSchedule-element">
                                    <label for="inputNGO" class="visitSchedule-label">NGO Email:</label>
                                    <input type="email" class="form-control" id="inputNGO" value={props.ngoEmail} disabled />
                                </div>
                                <div class="visitSchedule-element">
                                    <label for="inputDonorName" class="visitSchedule-label">Donor name</label>
                                    <input type="text" class="form-control" id="inputDonorName" placeholder="Donor name" onChange={(event) => {
                                        setDonorName(event.target.value);
                                    }} required />
                                </div>
                                <div class="visitSchedule-element">
                                    <label for="inputDonorContact" class="visitSchedule-label">Donor Contact</label>
                                    <input type="text" class="form-control" id="inputDonorContact" placeholder="Donor contact" onChange={(event) => {
                                        setDonorContact(event.target.value);
                                    }} required />
                                </div>
                                <div class="visitSchedule-element">
                                    <label for="inputDate" class="visitSchedule-label">Date</label>
                                    <input type="date" class="form-control" id="inputDate" placeholder="Date" onChange={(event) => {
                                        setDate(event.target.value);
                                    }} required />
                                </div>
                                <div class="visitSchedule-element">
                                    <label for="inputTime" class="visitSchedule-label">Time</label>
                                    <input type="time" class="form-control" id="inputTime" placeholder="Time" onChange={(event) => {
                                        setTime(event.target.value);
                                    }} required />
                                </div>
                                <div className="vs-actionbtns">
                                    <button onClick={AddUser} type="button" className="btn btn-primary bl-btn">Submit</button>
                                    <Link to="/Donor" className="linking" className="bl-vs">Go Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default VisitSchedule;
