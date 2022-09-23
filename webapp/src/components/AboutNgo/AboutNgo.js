import React from "react";
import "./AboutNgo.scss";
import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

/**
 *  This function is used to add request details of a specific NGO, we are fetching the NGO details
 */
export default class AboutNgo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            card: [
            ],
            id: props.id
        }
    }

    componentDidMount = () => {
        this.id = this.state.id;
        var toJson = (response) => response.json();
        fetch('http://localhost:3001/users/' + this.state.id).then(toJson)
            .then((card) => this.setState({ card: card, id: this.props.id }));
    }

    // This function is used to deletevalues of a particular request when the donate button is clicked.
    async deletevalues(e) {

        //this.id = this.props.id;
        const x = e.target.value;
        const item = e.target.parentElement.querySelector('div').innerText
        const quantity = e.target.parentElement.querySelector('p').innerText


        console.log(item + " " + quantity);
        let newarr = [];
        let requestval = [];
        let datavalues = JSON.parse(sessionStorage.userInfo);

        const data1 = await axios.get('http://localhost:3001/users/' + this.state.id)
            .then(res => newarr.push(res.data.request));

        console.log(data1);
        console.log(newarr);
        let reqdata = newarr;
        for (let i = 0; i < reqdata[0].length; i++) {
            if (reqdata[0][i].item != item) {
                requestval.push(reqdata[0][i]);
            }
        }
        console.log(requestval)
        try {
            const updateUser = {
                role: this.state.card.role,
                username: this.state.card.username,
                password: this.state.card.password,
                email: this.state.card.email,
                address: this.state.card.address,
                city: this.state.card.city,
                state: this.state.card.state,
                zipcode: this.state.card.zipcode,
                phonenum: this.state.card.phonenum,
                request: requestval
            }

            console.log(updateUser);

            axios.put('http://localhost:3001/users/' + this.state.id, updateUser)
                .then(res => newarr.push(res.data.request));

            alert("THANKS FOR DONATING");
            window.location = "/Donor";

        }
        catch (error) {
            console.log(error);
        }

    }

    // This function is used to renderCard details which are then passed to the render() function
    renderCard = (card, index) => {
        return (
            <Card style={{ width: "19rem" }} key={index} className="box about-ngo" >
                <Card.Body>
                    <Card.Title>{card.item}</Card.Title>
                    <Card.Text>{card.quantity}</Card.Text>
                    <Button onClick={this.deletevalues.bind(this)} value={card, index} type="submit">Donate</Button>
                </Card.Body>
            </Card>
        );
    };

    render() {
        const card = this.state.card.request;

        // This is used to check whether there are any request currently raised by NGO or not

        if (card && card.length > 0) {
            return <div>
                <div>
                    <h1 className="about-ngo-header">Welcome to {this.state.card.username}</h1>
                </div>
                <div className="grid"><div className="cardlayout-elements">{card.map(this.renderCard)}</div></div>;
            </div>
        }
        return <div></div>;
    }

}
