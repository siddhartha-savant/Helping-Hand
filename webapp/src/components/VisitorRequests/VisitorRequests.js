import React from "react";
import "./VisitorRequests.scss";
import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// This page handles the visitor request that user generates to visit a NGO

export default class VisitorRequests extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            card: [
            ],
            id: props.id
        }
    }

    componentDidMount() {
        var userInfo = sessionStorage.userInfo;
        var toJson = (response) => response.json();
        // This is used to fetch all the visits
        const { data } = axios.get('http://localhost:3001/visit', userInfo)
            .then(res => this.setState({ card: res.data, id: this.state.id }));
        console.log("test");
    }

    handleAccept = (e) => {
        // This is used to handle the Accept request
        try {
            const updateVisit = {
                "ngoName": this.state.card[e.target.value].ngoName,
                "ngoEmail": this.state.card[e.target.value].ngoEmail,
                "donorName": this.state.card[e.target.value].donorName,
                "donorContact": this.state.card[e.target.value].donorContact,
                "date": this.state.card[e.target.value].date,
                "time": this.state.card[e.target.value].time,
                "status": "Accepted",

            }

            console.log(updateVisit);

            axios.put('http://localhost:3001/visit/' + this.state.card[e.target.value]._id, updateVisit)
                .then(res => alert("Visiting Request Accepted"));
            document.getElementById(e.target.value + "_Accept").disabled = true;
            document.getElementById(e.target.value + "_Reject").disabled = true;
        }

        catch (error) {
            console.log(error);
        }
    }
    handleReject = (e) => {
        // This is used to handle the reject request

        try {
            const updateVisit = {
                "ngoName": this.state.card[e.target.value].ngoName,
                "ngoEmail": this.state.card[e.target.value].ngoEmail,
                "donorName": this.state.card[e.target.value].donorName,
                "donorContact": this.state.card[e.target.value].donorContact,
                "date": this.state.card[e.target.value].date,
                "time": this.state.card[e.target.value].time,
                "status": "Rejected",
            }

            console.log(updateVisit);

            axios.put('http://localhost:3001/visit/' + this.state.card[e.target.value]._id, updateVisit)
                .then(res => alert("Visiting Request Rejected"));
            document.getElementById(e.target.value + "_Accept").disabled = true;
            document.getElementById(e.target.value + "_Reject").disabled = true;
        }

        catch (error) {
            console.log(error);
        }
    }

    renderCard(card, index) {
        return (
            <Card key={index} className="visit_Request_box" >
                <Card.Body>
                    <Card.Title className="Title">Donor Name : {card.donorName}</Card.Title>
                    <Card.Text>Visiting Date : {card.date.substr(0, 10)}</Card.Text>
                    <Card.Text>Visiting Time :{card.time}</Card.Text>
                    <Button className="visit_Request_button" variant="success" onClick={this.handleAccept} id={index + "_Accept"} value={index}>Accept</Button>
                    <Button className="visit_Request_button" variant="danger" onClick={this.handleReject} id={index + "_Reject"} value={index}>Reject</Button>
                </Card.Body>
            </Card>
        );
    };

    render() {
        const card = this.state.card.filter(allCards => allCards.ngoEmail == JSON.parse(sessionStorage.userInfo).email);
        if (this.state.card.length > 0) {
            return <div className="visit_Request_grid"><h1>Manage Requests</h1><div className="visit_request_element">{card.map(this.renderCard.bind(this))}</div></div>;
        }
        // else if (this.state.card.length == 1) { return <div className="visit_Request_grid"><div className="row row-cols-auto">{this.renderCard(card, 0).bind(this)}</div></div>; }
        return <div></div>;
    }

}
