import app from './api/app.js';
import nodemailer from "nodemailer";

const port = 3001;

// Here the following message will be diplayed when the server is successfully running
app.listen(port, () => {
    console.log(`Helping Hands server running at http://localhost:${port}`);
})
