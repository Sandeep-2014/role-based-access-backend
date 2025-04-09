const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const User = require("../model/signup.model.js")



const signupUser = async (req, res) => {
    // console.log("cookie: ", req.cookies)
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill the all field" })
        }

        const isUser = await User.findOne({ email })
        if (isUser) {
            return res.status(400).json({ message: "User with this email already exist please use another email or go to login page to login your accout" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const data = {
            name: name,
            email: email,
            password: hashPassword
        }

        const newUser = await User.create(data)
        console.log(newUser)
        return res.status(201).json({ message: "User Registered Succefully", id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


const loginUser = async (req, res) => {
    // console.log("anothjer data")
    // console.log("cookie: ", req.cookies)
    // console.log("distructre cookie : ", req.cookies['example-cookie'])
    // console.log("this is user data : ", req.user)

    try {
        const { email, password } = req.body
        console.log(email)
        console.log(password)
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill the field" })
        }

        const isUser = await User.findOne({ email })
        console.log("this is user data", isUser)

        if (!isUser) {
            return res.status(400).json({ message: "You are not the user please register yourself with this email" })
        }

        const decodePassword = await bcrypt.compare(password, isUser.password)
        console.log(decodePassword)

        if (!decodePassword) {
            return res.status(400).json({ message: "Your entered password is incorrect" })
        }

        const token  = jwt.sign({id: isUser.id}, process.env.JWT_SECRET, {expiresIn: "5m"})

        // pehle secure false rakhne ki vajah se cookies set ho rhi thi lekin devtools me cookie section ko refresh karne ke baad 
        // lekin jab mene secure true kiya to ab mughe cookies section ko refresh karne ki jaroot nahi pad rhi hai automatically cookies set kar rha hai aur show kr rha hai 
        // secure true ko vaise production me use karna chahie
        const options = {
            httpOnly: true, // Prevents JavaScript access
            secure: true, // Send only over HTTPS
            sameSite: "None",
            // path: '/',
            // expires: new Date(Date.now() + 60 * 60 * 1000),
            // domain: "127.0.0.1",
            maxAge: 5 * 60 * 1000, // 5 minute in milliseconds
        }

        res.cookie('token-cookie', token, options)

        return res.status(200).json({ message: "Login Succefully", id: isUser._id, name: isUser.name, email: isUser.email, role: isUser.role, token })

    } catch (error) {
        console.error(error); // Logs the error in the console for debugging
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const logoutUser = (req, res) => {
    const options = {
        httpOnly: true,
        secure: true, 
        sameSite: "None",
    }
    res.clearCookie("token-cookie", options)
    return res.status(200).json({message: "User logout succefully."})
} 


module.exports = {
    signupUser,
    loginUser,
    logoutUser
    // cookieValidation
}