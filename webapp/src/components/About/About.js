import './About.scss';
import React from 'react'

// This component mentions the about page of the application, the Goal of the organization and the backroom staff responsible.
const About = () => {
    return (
        <div className="height-about">
            <div className="about-padding-lr about-padding-tb" id="about">
                <h3 className="about-bottom-border about-padding-border-tb title">About</h3>
                <p>We are a small Non-profit organization focussed on helping the needy and the poor.</p>
            </div>

            <div className="about-padding-row grayscale">
                <div className="about-col about-margin-bottom about-padding-row">
                    <img className="about-img" src="assets/user.jpeg" alt="Sid"></img>
                    <h3>Siddhartha Savant</h3>
                    <p className="about-col-opacity">Associate</p>
                    <p>Student at Northeastern University, worked at TCS back in India</p>
                </div>
                <div className="about-col about-margin-bottom about-padding-row">
                    <img className="about-img" src="assets/user.jpeg" alt="Noordeep"></img>
                    <h3>Noordeep Singh</h3>
                    <p className="about-col-opacity">Associate</p>
                    <p>Student at Northeastern University, worked at TCS back in India</p>
                </div>
                <div className="about-col about-margin-bottom about-padding-row">
                    <img className="about-img" src="assets/user.jpeg" alt="Naman"></img>
                    <h3>Naman Gupta</h3>
                    <p className="about-col-opacity">Associate</p>
                    <p>Student at Northeastern University, worked at TCS back in India</p>
                </div>
                <div className="about-col about-margin-bottom about-padding-row">
                    <img className="about-img" src="assets/user.jpeg" alt="Kiran"></img>
                    <h3>Kiran Unnikrishnan</h3>
                    <p className="about-col-opacity">Associate</p>
                    <p>Student at Northeastern University, worked at TCS back in India</p>
                </div>
            </div>
        </div>
    )
}

export default About;
