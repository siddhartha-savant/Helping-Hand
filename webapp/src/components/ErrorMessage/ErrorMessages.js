import React from "react";
import { Alert } from "react-bootstrap";
import './ErrorMessage.scss';

//  This cmponent is used to display the error messages on screen to the user

const ErrorMessages = ({ variant = "info", children }) => {
    return (
        <Alert variant={variant} className="error">
            <strong>{children}</strong>
        </Alert>
    );
};

export default ErrorMessages;