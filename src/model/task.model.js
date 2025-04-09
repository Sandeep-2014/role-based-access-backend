const mongoose = require("mongoose")

const userTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        reuired: true
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})


const Task = mongoose.model("Task", userTaskSchema)

module.exports = Task