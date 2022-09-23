import './Ngo.scss';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

// This is the landing of for NGO when he logs in

const Ngo = () => {

    const [item, setitem] = useState('')
    const [quantity, setquantity] = useState('')
    const [currentreq, setcurrentreq] = useState([])
    const [edititem, setedititem] = useState('')
    const [editquantity, seteditquantity] = useState('')
    const [newitem, setnewitem] = useState('')
    const [newquantity, setnewquantity] = useState('')

    //Get the data from the current session
    let datavalues = JSON.parse(sessionStorage.userInfo);

    useEffect(() => {
        axios.get('http://localhost:3001/users/' + datavalues._id)
            .then(res => setcurrentreq(res.data.request));

    }, []);

    //Make a new request
    const makenewReq = () => {
        document.getElementById("new-item-name").value = "";
        document.getElementById("new-quantity-value").value = "";
        document.getElementById("createNewRequest").classList.remove("hide");
    }

    //Hide the targeted element when the close button is pressed
    const hideElement = (e) => {
        let targetelement = e.target.parentElement.id;
        document.getElementById(targetelement).classList.add("hide");
    }

    //Send a new request and append them to the NGO request
    const sendReq = () => {

        let reqarr = [];

        console.log('Data from database' + currentreq);
        let reqdata = currentreq;
        for (let i = 0; i < reqdata.length; i++) {
            reqarr.push(reqdata[i]);
        }

        reqarr.push(
            {
                "item": item,
                "quantity": quantity,
                "status": 'open'
            }
        )

        try {
            const newUser = {
                role: datavalues.role,
                username: datavalues.username,
                password: datavalues.password,
                email: datavalues.email,
                address: datavalues.address,
                city: datavalues.city,
                state: datavalues.state,
                zipcode: datavalues.zipcode,
                phonenum: datavalues.phonenum,
                request: reqarr
            }

            console.log(newUser);

            axios.put('http://localhost:3001/users/' + datavalues._id, newUser)
                .then(res => setcurrentreq(res.data.request));

        }
        catch (error) {
            console.log(error);
        }

        document.getElementById("new-item-name").value = "";
        document.getElementById("new-quantity-value").value = "";
    }

    //Delete the particular request (By the NGO)
    const deletevalues = (item, quantity) => {
        console.log(item + " " + quantity);
        let requestval = [];
        axios.get('http://localhost:3001/users/' + datavalues._id)
            .then(res => setcurrentreq(res.data.request));

        let reqdata = currentreq;
        for (let i = 0; i < reqdata.length; i++) {
            if (reqdata[i].item != item) {
                requestval.push(reqdata[i]);
            }
        }
        try {
            const updateUser = {
                role: datavalues.role,
                username: datavalues.username,
                password: datavalues.password,
                email: datavalues.email,
                address: datavalues.address,
                city: datavalues.city,
                state: datavalues.state,
                zipcode: datavalues.zipcode,
                phonenum: datavalues.phonenum,
                request: requestval
            }

            console.log(updateUser);

            axios.put('http://localhost:3001/users/' + datavalues._id, updateUser)
                .then(res => setcurrentreq(res.data.request));

        }
        catch (error) {
            console.log(error);
        }

    }

    //Update a perticular node which is selected on selecting 'Edit' button
    const updatevalues = (item, quantity) => {
        console.log(item + " " + quantity);
        setedititem(item);
        seteditquantity(quantity);
        document.getElementById("newitemname").value = item;
        document.getElementById("newquantityvalue").value = quantity;
        document.getElementById("editreq").classList.remove("hide");
    }

    //This function is used to update the item
    const updateitem = () => {
        console.log(edititem + " " + editquantity)
        console.log(newitem + " " + newquantity)
        let updatereq = [];
        axios.get('http://localhost:3001/users/' + datavalues._id)
            .then(res => setcurrentreq(res.data.request));
        let reqdata = currentreq;
        console.log(reqdata);
        for (let i = 0; i < reqdata.length; i++) {
            if (reqdata[i].item == edititem) {
                updatereq.push(
                    {
                        "item": newitem,
                        "quantity": newquantity,
                        "status": 'open'
                    }
                )
            }
            else {
                updatereq.push(reqdata[i]);
            }
        }
        console.log(updatereq);
        try {
            const updaterequest = {
                role: datavalues.role,
                username: datavalues.username,
                password: datavalues.password,
                email: datavalues.email,
                address: datavalues.address,
                city: datavalues.city,
                state: datavalues.state,
                zipcode: datavalues.zipcode,
                phonenum: datavalues.phonenum,
                request: updatereq
            }

            axios.put('http://localhost:3001/users/' + datavalues._id, updaterequest)
                .then(res => setcurrentreq(res.data.request));

        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="ngo-container">
            <div className="createReq hide" id="createNewRequest">
                <span className="close" onClick={(e) => { hideElement(e) }}>X</span>
                <h3>New Request</h3>
                <input type="text" placeholder="Item name" className="custom-input" id="new-item-name" onChange={(event) => {
                    setitem(event.target.value)
                }} />
                <input type="number" placeholder="Quantity" className="custom-input" id="new-quantity-value" onChange={(event) => {
                    setquantity(event.target.value)
                }} />
                <button className="btn btn-primary add-btn" onClick={sendReq}>Submit</button>
            </div>
            <div className="editreq hide" id="editreq">
                <span className="close" onClick={(e) => { hideElement(e) }}>X</span>
                <h3>Edit Request</h3>
                <input type="text" placeholder="Item name" className="custom-input" id="newitemname" onChange={(event) => {
                    setnewitem(event.target.value)
                }} />
                <input type="number" placeholder="Quantity" className="custom-input" id="newquantityvalue" onChange={(event) => {
                    setnewquantity(event.target.value)
                }} />
                <button className="btn btn-primary add-btn" onClick={updateitem}>Submit</button>
            </div>

            <div className="ngo-btn">
                <div>
                    <button className="btn btn-primary btn-ngo" onClick={makenewReq}>Create Request</button>
                </div>
                <div>
                    <Link to={{
                        pathname: '/visitRequests'
                    }}>
                        <button className="btn btn-info btn-ngo">Check visits</button>
                    </Link>
                </div>
            </div>
            <div className="ngo-pageHeader">
                <h1>{datavalues.username}'s request catalog</h1>
            </div>
            <div className="cards-ngo-layout">
                {currentreq.map((val, key) => {
                    return <div key={key} className="req-cards">
                        <ul>
                            <li><span className="item-head">Item : </span><span className="item-name">{val.item}</span></li>
                            <li><span className="quantity-head">Quantity : </span><span className="quantity-val">{val.quantity}</span></li>
                            <li><button className="btn btn-warning" onClick={() => { updatevalues(val.item, val.quantity) }}>Edit</button><button className="btn btn-danger" onClick={() => { deletevalues(val.item, val.quantity) }}>Delete</button></li>
                        </ul>
                    </div>
                })}
            </div>

        </div>
    )
}

export default Ngo;
