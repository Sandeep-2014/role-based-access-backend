const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables
const User = require("../model/signup.model.js")

// Middleware to verify JWT token
const verifyCookie = async (req, res, next) => {
    console.log(req.cookies['token-cookie'])
    const token = req.cookies['token-cookie'] || req.header('Authorization')?.replace("Bearer ", "")
    console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id).select("-password")
        console.log("this is output of db user : ",user)

        if(!user){
            return res.status(401).json({message: "Invalid Access Token"})
        }
        console.log(user)
        req.user = user; // Attach user data to req.user
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid Access Token' });
    }
};

module.exports = {
    verifyCookie
}
