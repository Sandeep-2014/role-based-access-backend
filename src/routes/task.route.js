const express = require("express")
const router = express.Router()
const {verifyCookie} = require("../middlewares/auth.middleware.js")

const {addTask, getAdminTask, getUserTask} = require("../controllers/task.controller.js")

router.post("/addUserTask", verifyCookie, addTask)

router.get("/admin/dashboard", verifyCookie, getAdminTask)

router.get("/user/dashboard", verifyCookie, getUserTask)

module.exports = router