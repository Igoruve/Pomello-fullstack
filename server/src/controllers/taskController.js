import taskModel from "../models/taskModel.js"

const createTask = async (req,res) => {
    const taskCreated = await taskModel.create(req.body);
    res.json(taskCreated);
}
const getTask = async (req,res) => {
    const tasks = await taskModel.find();
    res.json(tasks);
}

const getTaskbyId = async (req,res) => {
    const taskFound = await taskModel.findById(req.params.id);
    res.json(taskFound);
}

const updateTask = async (req,res) => {
    const taskUpdated = await taskModel.findByIdAndUpdate(req.params.id,req.body);
    res.json(taskUpdated);
}

const deleteTask = async (req,res) => {
    const taskDeleted = await taskModel.findByIdAndDelete(req.params.id);
    res.json(taskDeleted);
}  

export default {
    createTask,
    getTask,
    getTaskbyId,
    updateTask,
    deleteTask
}