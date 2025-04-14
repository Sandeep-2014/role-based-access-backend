const express = require("express")
const router = express.Router()
const {verifyCookie} = require("../middlewares/auth.middleware.js")
const {roleValidation} = require("../middlewares/role.middleware.js")
const {addTask, getAdminTask, getUserTask} = require("../controllers/task.controller.js")


router.post("/addUserTask", verifyCookie, roleValidation(["user"]), addTask)

router.get("/admin/dashboard", verifyCookie, roleValidation(["admin"]), getAdminTask)

router.get("/user/dashboard", verifyCookie, roleValidation(["user"]),  getUserTask)

module.exports = router