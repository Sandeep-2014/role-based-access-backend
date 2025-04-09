const express = require("express")
const router = express.Router()
const {signupUser, loginUser, logoutUser} = require("../controllers/auth.controller.js")
const {verifyCookie} = require("../middlewares/auth.middleware.js")

// console.log(signupUser)

router.post('/register', signupUser)

router.post('/login', loginUser)

router.post('/logout', verifyCookie, logoutUser)


// router.get('/validate', verifyCookie)


module.exports = router