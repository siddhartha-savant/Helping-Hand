import './Footer.scss';

import React from 'react'

// This is the footer of the application which is common to all pages and display specific information about our application

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer">
                <div className="footer-element" id="contact">
                    <span className="footer-header">Contact Us</span>
                    <span className="footer-text">14 Shepherd Avenue, Boston, MA, 02110</span>
                    <div>
                        <span className="sub-header">Tel : </span><span>+1 (351) 666 9088 </span>
                    </div>
                    <div>
                        <span className="sub-header">Email : </span><span>info@helpinghands.net</span>
                    </div>
                </div>
                <div className="footer-links">
                    <div>
                        <span className="footer-link-header">
                            Join the conversation
                        </span>
                        <div className="links">
                            <a href="https://www.facebook.com/">
                                <img src="../../assets/icons/facebook.png" className="icon" />
                            </a>
                            <a href="https://www.twitter.com/">
                                <img src="../../assets/icons/twitter.png" className="icon" />
                            </a>
                            <a href="https://www.youtube.com/">
                                <img src="../../assets/icons/youtube.png" className="icon" />
                            </a>
                            <a href="https://www.instagram.com/">
                                <img src="../../assets/icons/instagram.png" className="icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="maps-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.463500578101!2d-71.11112628454455!3d42.332640479188726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3798ffec361a5%3A0xf2beba6dd631c0ad!2s14-14R%20Shepherd%20Ave%2C%20Boston%2C%20MA%2002115!5e0!3m2!1sen!2sus!4v1638240439541!5m2!1sen!2sus" className="google-map" loading="lazy"></iframe>
            </div>
        </div>
    )
}

export default Footer
