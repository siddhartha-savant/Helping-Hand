import React from 'react';
import './SearchPage.scss';
import CardLayout from '../CardLayout/CardLayout';
import SearchBar from '../SearchBar/SearchBar';
import axios from 'axios';

// This is the landing page when a Donor logs in

export default class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardInfo: [
                {
                    image: "https://i.insider.com/50f967f56bb3f7830a000019",
                    username: "Lebron James",
                    city: "",
                    state: "",
                    zipcode: "",
                    Address: "THE GOAT",
                    display: "hidden",
                },

            ],
            allCardInfo: []
        }
    }

    create(updatedCardInfo) {
        this.setState((state, props) => ({
            cardInfo: [...updatedCardInfo]
        }));
    }


    async componentDidMount() {
        var toJson = (response) => response.json();
        try {
            var response = await fetch('http://localhost:3001/users').then(toJson)
                .then((cardInfo) => this.setState({ cardInfo, allCardInfo: cardInfo }));
        }
        catch (err) {
            throw err;
        }
    }

    render() {
        return (
            <div>x
                <div>
                    <span className="header">SEARCH NGO</span>
                </div>
                <SearchBar createHandler={this.create.bind(this)} allCardInfo={this.state.allCardInfo} cardInfo={this.state.cardInfo} />
                <CardLayout setId={this.props.setId} setNgoName={this.props.setNgoName} setNgoEmail={this.props.setNgoEmail} cardInfo={this.state.cardInfo} />
            </div>
        )
    }

}


