import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import models from './models/index.js';
import cors from 'cors';

const app = express();

//This is used to connect to the database using mongoose
//mongoose.connect('mongodb://localhost:27017/todolist');
mongoose.connect('mongodb://127.0.0.1:27017/helpinghands')
    .then(() => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

routes(app);

export default app;