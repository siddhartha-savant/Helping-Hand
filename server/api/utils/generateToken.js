import jwt from 'jsonwebtoken';

// To generate Token used for authentication
const generateToken = (id) => {
    return jwt.sign({ id }, "Naman1234", {
        expiresIn: "30d",
    });
};

export default generateToken;