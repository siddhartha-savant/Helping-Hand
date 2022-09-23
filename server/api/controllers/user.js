import { request, response } from 'express';
import * as userService from '../services/users.js';
import regUser from '../models/users.js';
import App from "../models/users.js";
import bcrypt from "bcryptjs";
import generateToken from '../utils/generateToken.js';
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";


// This I have used to display or send the errors if arrived and set it's status

const errorhandler = (message, response) => {
    response.status(500);
    response.json({ error: message });
}

// This I have used to set the success reponse and and convert data of response to json

const setSuccessResponse = (data, response) => {
    response.status(200);
    response.json(data);
}

// This is used to call service SEARCH method of USER from controller after flow comes from route to controller
export const index = async (request, response) => {

    try {
        const users = await userService.search();
        setSuccessResponse(users, response);
    }
    catch (e) {
        errorhandler(e.message, response);
    }

};

// This is used to call service SEARCH method of VISIT from controller after flow comes from route to controller
export const index1 = async (request, response) => {

    try {
        const visit = await userService.searchVisit();
        setSuccessResponse(visit, response);
    }
    catch (e) {
        errorhandler(e.message, response);
    }

};

// This is used to call service CREATE method from controller after flow comes from route to controller to create new object

export const save = async (request, response) => {
    try {
        const user = { ...request.body };


        // Here I am checking if user already exists with the same email ID before regitering it as a new user

        const userExists = await userService.getByEmail(user);

        if (userExists) {
            response.status(400);

            // This throws error if user with same email is found in DB
            throw new Error("User Already Exists");
        }

        // If no user with same email is found then here I have called Create/Save method in service to create a new user

        const newUser = await userService.create(user);
        const email = newUser.email;
        if (newUser) {
            // response.status(200).json({
            //     _id: newUser._id,
            //     // role: newUser.role,
            //     // username: newUser.username,
            //     // address: newUser.address,
            //     // city: newUser.city,
            //     // state: newUser.state,
            //     // zipcode: newUser.zipcode,
            //     // phonenum: newUser.phonenum,
            //     email: newUser.email,
            //     // pic: newUser.pic,
            //     // isVerified:newUser.isVerified,
            //     // token: generateToken(user._id),
            //     // request: newUser.request
            // });

            // Here we are creating a verification token to check the authenticity of the email used during registration
            const verificationToken = newUser.generateVerificationToken();

            const url = `http://localhost:3001/users/verify/${verificationToken}`
            
            transporter.sendMail({
                to: email,
                subject: 'Verify Account on our portal - Helping Hands',
                html: `Thanks for filling up the registration form. Click <a href = '${url}'>here</a> to confirm your email.`
            })
            
            return response.status(201).send({
                message: `Sent a verification email to ` + email
            });

        }
        setSuccessResponse(newUser, response);
    }
    catch (e) {
        errorhandler(e.message, response);
    }
};

// This method is used to create a new visit request from a donor

export const saveVisit = async (request, response) => {
    try {
        const user = { ...request.body };

        const newUser = await userService.createVisit(user);
        if (newUser) {
            response.status(200).json({
                _id: newUser._id,
                role: newUser.role,
                username: newUser.username,
                status: newUser.status
            });
        }
        //setSuccessResponse(newUser, response);
    }
    catch (e) {
        errorhandler(e.message, response);
    }
};

// This is used to call service GET method from controller after flow comes from route to controller to get object

export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await userService.get(id);
        setSuccessResponse(user, response);
    }
    catch (e) {
        errorhandler(e.message, response);
    }
};


// This is used to call service GET method from controller after flow comes from route to controller to get object

export const getVisit = async (request, response) => {
    try {
        const id = request.params.id;
        const visit = await userService.getVisit(id);
        setSuccessResponse(visit, response);
    }
    catch (e) {
        errorhandler(e.message, response);
    }
};

// This method calls the Service method's update to update a user.

export const update = async (request, response) => {
    try {
        console.log("CONTROLEER UPDATE");
        const id = request.params.id;
        const user = { ...request.body, id };
        console.log(user);
        const updatedUser = await userService.update(user);
        setSuccessResponse(updatedUser, response);
    }
    catch (e) {
        errorhandler(e.message, response);
    }
};

// This method calls the Service method's update to update a visit.

export const updateVisit = async (request, response) => {
    try {
        const id = request.params.id;
        const visit = { ...request.body, id };
        const updatedVisit = await userService.updateVisit(visit);
        setSuccessResponse(updatedVisit, response);
    }
    catch (e) {
        errorhandler(e.message, response);
    }
};

// This method deletes or removes a user by calling remove method in Service

export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await userService.remove(id);
        setSuccessResponse({ message: `Todo ${id} removed successfully` }, response);
    }
    catch (e) {
        errorhandler(e.message, response);
    }

};

// This method is used to authentiate a user when he tries to login it checks if username and password is correct or not

export const authUser = async (request, response) => {

    try {

        const user = { ...request.body };

        console.log("Password is : " + user.password);

        const userValid = await userService.authUser(user);

        // This message is to signal the user the account is not verified yet
        if (!userValid.isVerified) {
            return response.status(403).send({
                message: "Verify your Account."
            });
        }

        // Here it is checking if role matches while user tries to login.

        if (user.role === userValid.role) {
            console.log("BACK TO AUTH CONTROLLER");

            const password = userValid.password;

            //const comparePassword = await bcrypt.compare(user.password, password);
            console.log("MATCH RESULT" + (await bcrypt.compare(user.password, password)));

            // Here I am comparing the input password with encrypted password stored in db

            const comparePassword = await bcrypt.compare(user.password, password);

            if (userValid && (await bcrypt.compare(user.password, password))) {
                console.log("Password matched");
                response.status(200).json({
                    _id: userValid._id,
                    role: userValid.role,
                    username: userValid.username,
                    address: userValid.address,
                    city: userValid.city,
                    state: userValid.state,
                    zipcode: userValid.zipcode,
                    phonenum: userValid.phonenum,
                    email: userValid.email,
                    pic: userValid.pic,
                    isVerified: userValid.isVerified,
                    token: generateToken(userValid._id),
                    request: userValid.request
                });
            }
            else {
                errorhandler("INVALID EMAIL OR PASSWORD", response);
            }
        }
        else {
            errorhandler("INVALID EMAIL OR PASSWORD", response);
        }
    }
    catch (e) {
        errorhandler(e.message, response);
    }
};

//This method is used to verify the user using the nodemailer module. The generated token is compared with the token sent on email to check
//whether both of them are same or not
export const verifyUser = async (request, response) => {
    const token = request.params.id;
    
    if (!token) {
        return response.status(422).send({
            message: "Missing Token"
        });
    }
    let payload = null

    try {
        payload = jwt.verify(
            token,
            "dgfgpspdifgskdfngussj490385jsp8ms",
        );
    } catch (err) {
        console.log("error");
        return response.status(500).send(err);
    }

    try {
        // Here we are finding user with matching ID
        const userValid = await App.User.findOne({ _id: payload.ID }).exec();
        //const user = await User.findOne({ _id: payload.ID }).exec();
        
        if (!userValid) {
            return res.status(404).send({
                message: "User does not exists"
            });
        }
        // Update user verification status to true
        userValid.isVerified = true;
        await userValid.save();
        return response.status(200).send({
            message: "Account Verified"
        });
    } catch (err) {
        return response.status(500).send(err);
    }
};

// These are the transporter details, through which the mail would be sent to the user
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "hh.helpinghands123@gmail.com",
        pass: "helpinghands"
    },
});


