import React, { useState } from 'react';
import './SearchBar.scss';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CardLayout from '../CardLayout/CardLayout';


export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.searchText = "";
        this.searchCondition = "";
        const cardInfo = this.props.cardInfo;
    }


    handleSelect = (e) => {
        // This handles the click of search button
        this.searchCondition = e.target.value;
    }

    handleSearch() {
        // This handles the SEARCH bar dropdown

        let updatedCardInfo = "";
        let ngoCardInfo = this.props.allCardInfo.filter(card => card.role == "NGO");
        switch (this.searchCondition) {
            case "Zip Code":
                updatedCardInfo = ngoCardInfo.filter(card => card.zipcode == this.searchText);
                break;
            case "State":
                updatedCardInfo = ngoCardInfo.filter(card => card.state.toLowerCase() == this.searchText.toLowerCase());
                break;
            case "City":
                updatedCardInfo = ngoCardInfo.filter(card => card.city.toLowerCase() == this.searchText.toLowerCase());
                break;
            case "Name":
                updatedCardInfo = ngoCardInfo.filter(card => card.username.toLowerCase() == this.searchText.toLowerCase());
                break;

        }

        if (this.searchText == "")
            updatedCardInfo = ngoCardInfo;

        this.props.createHandler(updatedCardInfo);
    }
    handleSearchText = (e) => {
        // This updates the value entered in text bar to search for an NGO
        this.searchText = e.target.value;
    }

    render() {

        const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        return (
            <div className="search">
                <Form>
                    <Row className="align-items-center">
                        <Col xs={3}>
                            <Form.Select onChange={this.handleSelect} >
                                <option> Select Search Filter</option>
                                <option eventkey="Zip Code">Zip Code</option>
                                <option eventkey="State">State</option>
                                <option eventkey="City">City</option>
                                <option eventkey="Name">Name</option>
                            </Form.Select>
                        </Col>
                        <Col xs={8}>
                            <Form.Control onChange={this.handleSearchText} placeholder="Enter text to Search" />
                        </Col>
                        <Col xs="auto">
                            <Button onClick={this.handleSearch.bind(this)}>Search</Button>
                        </Col>
                    </Row>
                </Form>
            </div >
        )
    }

}


