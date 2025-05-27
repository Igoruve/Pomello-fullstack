import taskModel from "../models/taskModel.js";
import listModel from "../models/listModel.js";
import Errors from "../utils/errors.js"; // ✅ Importación del default export

const {
  TaskTitleNotProvided,
  TaskNotFound,
  ListNotFound
} = Errors;


/**
 * Creates a new task and assigns it to a list.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {TaskTitleNotProvided} - If the title is not provided.
 * @throws {ListNotFound} - If the list does not exist.
 * @returns {Promise<void>} Resolves when the task is created.
 */
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

/**
 * Returns all tasks in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the operation fails.
 * @returns {Promise<void>} Resolves when the tasks are retrieved.
 */
const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.json(tasks);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

/**
 * Returns a task by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {TaskNotFound} - If the task is not found.
 */
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

/**
 * Returns all tasks for a given list.
 * @param {Object} req - The request object. Must include the list ID in params.
 * @param {Object} res - The response object.
 * @throws {Error} - If the operation fails.
 * @returns {Promise<void>} Resolves when the tasks are retrieved.
 */
const getTasksByList = async (req, res) => {
    try {
        const tasks = await taskModel.find({ list: req.params.listId }).sort({ position: 1 }); // Ordenar por posición
        res.json(tasks);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

/**
 * Updates a task by its ID in the database.
 *
 * Accepts an Express request object containing the task ID in the URL parameters
 * and the updated task data in the request body.
 *
 * @param {Object} req - Express request object. Must include the task ID in params
 * and updated task data in the body.
 * @param {Object} res - Express response object.
 *
 * @returns {void} Sends a JSON response with the updated task object or an error message.
 *
 * @throws {TaskTitleNotProvided} If the title is not provided.
 * @throws {TaskNotFound} If the task with the specified ID is not found.
 */
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

/**
 * Deletes a task by its ID from the database.
 *
 * Accepts an Express request object containing the task ID in the URL parameters.
 *
 * @param {Object} req - Express request object. Must include the task ID in params.
 * @param {Object} res - Express response object.
 *
 * @returns {void} Sends a JSON response with the deleted task or an error message.
 *
 * @throws {TaskNotFound} If the task with the specified ID is not found.
 */
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

/**
 * Updates the positions of multiple tasks in the database.
 *
 * Accepts an Express request object containing an array of tasks with their new positions in the request body.
 *
 * @param {Object} req - Express request object. Must include the tasks array in the request body.
 * @param {Object} res - Express response object.
 *
 * @returns {void} Sends a JSON response with the update result or an error message.
 *
 * @throws {Error} If the operation fails.
 */
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