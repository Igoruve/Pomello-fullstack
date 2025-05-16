import taskModel from "../models/taskModel.js"

const createTask = async (req,res) => {
    const taskCreated = await taskModel.create(req.body);
    res.json(taskCreated);
}
const getTasks = async (req,res) => {
    const tasks = await taskModel.find();
    res.json(tasks);
}

const getTaskbyId = async (req,res) => {
    const taskFound = await taskModel.findById(req.params.id);
    res.json(taskFound);
}

const getTasksByList = async (req, res) => {
  try {
    const tasks = await taskModel.find({ list: req.params.listId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req,res) => {
    const taskUpdated = await taskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
      new: true,
      runValidators: true
      });
    res.json(taskUpdated);
}

const deleteTask = async (req,res) => {
    const taskDeleted = await taskModel.findByIdAndDelete(req.params.id);
    res.json(taskDeleted);
}  

export default {
    createTask,
    getTasks,
    getTaskbyId,
    updateTask,
    deleteTask,
    getTasksByList
}