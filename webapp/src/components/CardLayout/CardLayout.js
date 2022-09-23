import React from "react";
import "./CardLayout.scss";
import { Card } from "react-bootstrap";
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default class CardLayout extends React.Component {
    // This component is the base for cards we are showing on other pages
    constructor(props) {
        super(props);
        const cardInfo = this.props.cardInfo;
        this.clckedNgo = "";
    }

    search = (state) => {
        /*const searchElemets=this.cardInfo  filter(word =>      */
        console.log("test");


    }

    // We are setting the ID of USER when we click on the card

    handleClick = (e) => {
        this.props.setId(e.target.value);
    }

    // This is called when donor try to make a visit request to particular NGO

    handleClickVisit = (e) => {
        var array = e.target.value.split(',');
        this.props.setNgoName(array[0]);
        this.props.setNgoEmail(array[1]);
    }

    renderCard(card, index) {

        // This displays how our card will actually look with data and 2 buttons

        return (
            <Card key={index} className="box" >
                <Card.Img variant="top" src="holder.js/50px100" src={card.image} />
                <Card.Body>
                    <Card.Title>NGO NAME: {card.username}</Card.Title>
                    <Card.Text> CITY: {card.city}</Card.Text>
                    <Card.Text>STATE: {card.state}</Card.Text>
                    <Card.Text>ZIP-CODE: {card.zipcode}</Card.Text>
                    <Link to={{
                        pathname: '/aboutNgo',
                        state: [{ ngoRequests: this.clckedNgo }]
                    }}>
                        <Button className="cardlayout-btn btn btn-outline-dark" value={card._id} onClick={this.handleClick.bind(this)}>About</Button>
                    </Link>
                    <Link to={{
                        pathname: '/visitSchedule',
                        state: [{ ngoRequests: this.clckedNgo }]
                    }}>
                        <Button className="cardlayout-btn btn btn-outline-dark" value={[card.username, card.email]} onClick={this.handleClickVisit.bind(this)}>Visit</Button>
                    </Link>
                </Card.Body>
            </Card >
        );
    };

    render() {
        const cardInfo = this.props.cardInfo;

        // Here we are filtering the user on basis of their role

        let ngoCardInfo = cardInfo.filter(card => card.role == "NGO");
        return <div className="grid">
            <div className="cardlayout-elements">
                {ngoCardInfo.map(this.renderCard.bind(this))}
            </div>
        </div>;
    }

}
