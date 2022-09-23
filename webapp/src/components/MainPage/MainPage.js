import React from 'react'
import './MainPage.scss';

/**  
 * This page is the mainpage of the application.
 */
export default class MainPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header className="mainpage-container mainpage-content mainpage-wide mainpage-body" id="home">
                    <img className="mainpage-image" src="assets/donate.jpeg" alt="Architecture" width="1500" height="800"></img>
                    <div className="mainpage-display-middle">
                        <h1 className="mainpage-font mainpage-text-white"><span className="mainpage-padding mainpage-black"><b>HH</b></span> <span>Helping Hands</span></h1>
                    </div>
                </header>
                <div>

                </div>
            </div>
        );
    }
}