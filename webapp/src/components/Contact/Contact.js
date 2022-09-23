import './Contact.scss';
import React from 'react'

/**
 * This function is used to render the contact functionality, with which we can communicate with the HH organization
 */
const Contact = () => {
    return (
        <div className="contactus-header">
            <div className="contactus-box">
                <div className="cu-eh">
                <h2>Contact Us</h2>
                <div className="contactus-element">
                    <label htmlFor="email" className="contactus-label">Email</label>
                    <input type="email" id="email" required/>
                </div>
                <div className="contactus-element">
                    <label htmlFor="subject" className="contactus-label">Subject</label>
                    <input type="text" id="subject" required/>
                </div>
                <div className="contactus-element">
                    <label htmlFor="message" className="contactus-label">Message</label>
                    <textarea id="message" rows="4" cols="50" required/>
                </div>
                <button className="btn btn-outline-success">Send</button>
                </div>
            </div>
        </div>
    )
}

export default Contact;
