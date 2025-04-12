const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const User = require("../model/user.model.js")



const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({success: false, message: "Please fill the all field" })
        }

        const isUser = await User.findOne({ email })
        if (isUser) {
            return res.status(400).json({success: false, message: "User with this email already exist please use another email or go to login page to login your account" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const data = {
            name: name,
            email: email,
            password: hashPassword
        }

        const newUser = await User.create(data)
        console.log(newUser)
        return res.status(201).json({success: true, message: "User Registered Succefully", id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role })

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Internal Server Error While registering the user" });
    }
}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        // console.log(email)
        // console.log(password)
        if (!email || !password) {
            return res.status(400).json({success: false, message: "Please fill the field" })
        }

        const isUser = await User.findOne({ email })
        // console.log("this is user data", isUser)

        if (!isUser) {
            return res.status(400).json({success: false, message: "You are not the user please register yourself with this email" })
        }

        const decodePassword = await bcrypt.compare(password, isUser.password)
        // console.log(decodePassword)

        if (!decodePassword) {
            return res.status(400).json({success: false, message: "Your entered password is incorrect" })
        }

        const token  = jwt.sign({id: isUser.id}, process.env.JWT_SECRET, {expiresIn: "5m"})

        const options = {
            httpOnly: true, // Prevents JavaScript access
            secure: true,
            sameSite: "None",
            // path: '/',
            // expires: new Date(Date.now() + 60 * 60 * 1000),
            // domain: "127.0.0.1",
            maxAge: 5 * 60 * 1000, // 5 minute in milliseconds
        }

        res.cookie('token-cookie', token, options)

        return res.status(200).json({success: true, message: "Login Succefully", token, role: isUser.role })

    } catch (error) {
        // console.error(error);
        return res.status(500).json({success: false, message: "Internal Server Error" });
    }
}

const logoutUser = (req, res) => {
    const options = {
        httpOnly: true,
        secure: true, 
        sameSite: "None",
    }
    res.clearCookie("token-cookie", options)
    return res.status(200).json({success: true, message: "User logout succefully."})
} 


module.exports = {
    signupUser,
    loginUser,
    logoutUser
}