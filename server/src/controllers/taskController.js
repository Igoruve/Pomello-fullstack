import taskModel from "../models/taskModel.js";
import listModel from "../models/listModel.js";
import Errors from "../utils/errors.js"; // ✅ Importación del default export

const {
  TaskTitleNotProvided,
  TaskNotFound,
  ListNotFound
} = Errors;


const createTask = async (req, res) => {
    try {
        if (!req.body.title) {
            throw new TaskTitleNotProvided();
        }

        // Validar si la lista existe
        const listExists = await listModel.findById(req.body.list);
        if (!listExists) {
            throw new ListNotFound();
        }

        const taskCreated = await taskModel.create(req.body);
        res.json(taskCreated.toObject());
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.json(tasks);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

const getTaskbyId = async (req, res) => {
    try {
        const taskFound = await taskModel.findById(req.params.id);
        
        if (!taskFound) {
            throw new TaskNotFound();
        }
        
        res.json(taskFound);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

const getTasksByList = async (req, res) => {
    try {
        const tasks = await taskModel.find({ list: req.params.listId }).sort({ position: 1 }); // Ordenar por posición
        res.json(tasks);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        if (req.body.title === '') {
            throw new TaskTitleNotProvided();
        }
        
        const taskUpdated = await taskModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!taskUpdated) {
            throw new TaskNotFound();
        }
        
        res.json(taskUpdated);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskDeleted = await taskModel.findByIdAndDelete(req.params.id);
        
        if (!taskDeleted) {
            throw new TaskNotFound();
        }
        
        res.json(taskDeleted);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}  

const updateTaskPositions = async (req, res) => {
    try {
        const { tasks } = req.body; // Recibir un array de tareas con sus nuevas posiciones

        if (!Array.isArray(tasks)) {
            return res.status(400).json({ message: "Invalid tasks format" });
        }

        const bulkOperations = tasks.map((task) => ({
            updateOne: {
                filter: { _id: task._id },
                update: { position: task.position },
            },
        }));

        const result = await taskModel.bulkWrite(bulkOperations); // Actualizar las posiciones en una sola operación

        res.status(200).json({ message: "Task positions updated successfully", result });
    } catch (error) {
        console.error("Error updating task positions:", error);
        res.status(500).json({ message: "Error updating task positions" });
    }
};

export default {
    createTask,
    getTasks,
    getTaskbyId,
    updateTask,
    deleteTask,
    getTasksByList,
    updateTaskPositions
}