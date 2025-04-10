const jwt = require('jsonwebtoken');
const User = require("../model/signup.model.js")

// Middleware to verify JWT token
const verifyCookie = async (req, res, next) => {
    // console.log(req.cookies['token-cookie'])
    const token = req.cookies['token-cookie'] || req.header('Authorization')?.replace("Bearer ", "")
    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Token expired User is unauthorized please Login again' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id).select("-password")
        // console.log("this is output of db user : ",user)

        if(!user){
            return res.status(400).json({success: false, message: "User is Not found"})
        }
        // console.log(user)
        req.user = user; 
        next();
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error' });
    }
}

module.exports = {
    verifyCookie
}
