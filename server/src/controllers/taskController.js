import taskModel from "../models/taskModel.js";
import listModel from "../models/listModel.js";
import Errors from "../utils/errors.js"; // ✅ Importación del default export

const {
  TaskTitleNotProvided,
  TaskNotFound,
  ListNotFound
} = Errors;


/**
 * Creates a new task in the database.
 *
 * @param {Object} req - Express request object containing the task title and list ID in the body.
 * @param {Object} res - Express response object used to send the created task data or an error message.
 * @throws {TaskTitleNotProvided} If the task title is not provided in the request body.
 * @throws {ListNotFound} If the list with the specified ID does not exist.
 * @returns {Promise<void>} Responds with the created task object or an error message.
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
 * Retrieves all tasks from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object used to send the list of tasks.
 * @returns {Promise<void>} Responds with the list of tasks or an error message.
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
 * Retrieves a task by its ID.
 *
 * @param {Object} req - Express request object containing the task ID in params.
 * @param {Object} res - Express response object used to send the task data or an error message.
 * @throws {TaskNotFound} If the task with the specified ID does not exist.
 * @returns {Promise<void>} Responds with the task object or an error message.
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
 * Retrieves all tasks associated with a specific list, sorted by position.
 *
 * @param {Object} req - Express request object containing the list ID in params.
 * @param {Object} res - Express response object used to send the list of tasks or an error message.
 * @returns {Promise<void>} Responds with the list of tasks or an error message.
 * @throws {Error} If there's an issue retrieving the tasks, responds with an error message.
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
 * Updates a task by its ID.
 *
 * @param {Object} req - Express request object containing the task ID in params and updated data in body.
 * @param {Object} res - Express response object used to send the updated task data or an error message.
 * @throws {TaskNotFound} If the task with the specified ID does not exist.
 * @throws {TaskTitleNotProvided} If the task title is not provided in the request body.
 * @returns {Promise<void>} Responds with the updated task object or an error message.
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
 * Deletes a task by its ID.
 *
 * @param {Object} req - Express request object containing the task ID in params.
 * @param {Object} res - Express response object used to send the deleted task data or an error message.
 * @throws {TaskNotFound} If the task with the specified ID does not exist.
 * @returns {Promise<void>} Responds with the deleted task object or an error message.
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
 * Updates multiple tasks' positions in a single operation.
 *
 * @param {Object} req - Express request object containing an array of tasks with their new positions in the body.
 * @param {Object} res - Express response object used to return the updated task data or an error message.
 * @throws {Error} If there's an issue updating the task positions, responds with an error message.
 * @returns {Promise<void>}
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