const mongoose = require("mongoose")
const Task = require("../model/task.model.js")
const User = require("../model/signup.model.js")


const addTask = async (req, res) => {
    console.log(req.user)
    const {title, description} = req.body

    
    const data ={
        title: title,
        description: description,
        userId: req.user._id
    }

    try {
        const tasks = await Task.insertOne(data)
        console.log(tasks)
        return res.status(201).json({ message: "Task Created Succefully" })
    } catch (error) {
        return res.status(501).json({ message: "Something went wront while creating task" })
    }

}


const getAdminTask = async (req, res) => {
    try {
        const userId = req.user._id
        console.log("this is id: ", userId)
        

        let tasks = await Task.find().select("-updatedAt -createdAt -__v").lean()
        const users = await User.find().select("-password -updatedAt -createdAt -__v").lean()
        console.log(tasks)

        const allTask = [];

        users.forEach((user) => {
            const userTasks = tasks.filter(task => user._id.toString() === task.userId.toString());

            if (userTasks.length === 0) return; 

            const data = userTasks.map((task) => ({
                ...task,
                createdBy: user.name
            }));

            allTask.push(...data);
        });

        console.log(allTask);
        console.log(allTask.length)


        // console.log(dataaa)
        // for (const task of tasks) {
        //     const user = await User.findById(task.userId);
        //     task.createdBy = user.name
        // }
        // // console.log(tasks);
        // let allTask = tasks

        // console.log("This is the data after finding all task with admin id")
        // console.log(allTask)
        // console.log("this request.user")
        // console.log(req.user)
        // console.log("this is the length of task")
        // console.log(allTask.length)
        // console.log(req.user.role)
        // console.log(req.user.name)
        return res.status(200).json({ message: "all task find with user id", allTask, role: req.user.role, name: req.user.name })
    } catch (error) {
        console.log(error)
    }


}


const getUserTask = async (req, res) => {

    try {
        const userId = req.user._id
        let allTask = await Task.find({ userId })

        console.log("This is the data after finding all task with user id")
        console.log(allTask)
        console.log("this request.user")
        // console.log(req.user)
        console.log("this is the length of task")
        // console.log(allTask.length)
        // console.log(req.user.role)
        // console.log(req.user.name)
        return res.status(200).json({ message: "all task find with user id", allTask, role: req.user.role, name: req.user.name })
    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    addTask,
    getAdminTask,
    getUserTask,
}