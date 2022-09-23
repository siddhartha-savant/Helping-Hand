import Mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// This defines the schema of USER the JSON object
const userSchema = new Mongoose.Schema({
    "role": {
        type: String,
        required: "Please select your role"

    },
    "username": {
        type: String,
        required: "Name is required"
    },
    "address": {
        type: String,
        required: "Address is required"
    },
    "city": {
        type: String,
        required: "City is required"

    },
    "state": {
        type: String,
        required: "State is required"
    },
    "zipcode": {
        type: String,
        required: "Zip Code is required"
    },
    "phonenum": {
        type: String,
        required: "Contact Number is required"
    },
    "role": {
        type: String,
        required: "Role is required"
    },
    "email": {
        type: String,
        required: "Role is required",
        unique: true
    },
    "password": {
        type: String,
        default: "Role is required"
    },
    "createDate": {
        type: Date,
        default: Date.now
    },
    "lastModifiedDate": {
        type: Date,
        default: Date.now
    },
    "pic": {
        type: String,
        required: "Image is required",
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    "isVerified":{
        type: Boolean, 
        required: "Verification is required",
        default: false,
        
    },
    "request": {
        type: [{}]
    }
},
    {
        versionKey: false
    });

//This declares the schema of Visit Request

const visitSchema = new Mongoose.Schema({
    "ngoName": {
        type: String,

    },
    "ngoEmail": {
        type: String,
    },
    "donorName": {
        type: String,
        required: "Name is required"
    },
    "donorContact": {
        type: String,
        required: "Contact is required"
    },
    "date": {
        type: Date,
        required: "Date is required"

    },
    "time": {
        type: String,
        required: "Time is required"
    },
    "status": {
        type: String
    },
    "createDate": {
        type: Date,
        default: Date.now
    },
    "lastModifiedDate": {
        type: Date,
        default: Date.now
    }
},
    {
        versionKey: false
    });

// This method uses salt to encrypt the password before saving it to DB

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    console.log("SAVED password is" + this.password);
})

// This method is used to generate a verification token usign jwt for account verification through nodemailer.
userSchema.methods.generateVerificationToken = function () {
    const user = this;
    const verificationToken = jwt.sign(
        { ID: user._id },
        "dgfgpspdifgskdfngussj490385jsp8ms",
        { expiresIn: "7d" }
    );
    return verificationToken;
};

userSchema.virtual('id', () => this._id.toHexString());
userSchema.set('toJSON', { virtuals: true });

visitSchema.virtual('id', () => this._id.toHexString());
visitSchema.set('toJSON', { virtuals: true });

const User = Mongoose.model('users', userSchema);
const Visit = Mongoose.model('visit', visitSchema);

export default { User, Visit };
