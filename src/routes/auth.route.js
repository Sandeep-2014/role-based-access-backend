const express = require("express")
const router = express.Router()
const {signupUser, loginUser, logoutUser} = require("../controllers/auth.controller.js")
const {verifyCookie} = require("../middlewares/auth.middleware.js")


router.post('/register', signupUser)

router.post('/login', loginUser)

router.post('/logout', logoutUser)


module.exports = router