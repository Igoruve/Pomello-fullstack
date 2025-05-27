import listModel from "../models/listModel.js";
import projectModel from "../models/projectModel.js";
import Errors from "../utils/errors.js"; // ✅ Importación correcta

const {
  ListTitleNotProvided,
  ListNotFound,
  ProjectNotFound
} = Errors;



/**
 * Creates a new list.
 *
 * @param {Object} req - Express request object containing the list title and project ID in the body.
 * @param {Object} res - Express response object used to send the created list data or an error message.
 * @throws {ListTitleNotProvided} If the list title is not provided in the request body.
 * @throws {ProjectNotFound} If the project with the specified ID does not exist.
 * @returns {Promise<void>}
 */

const createList = async (req, res) => {
    try {
         if (!req.body.title) {
             throw new ListTitleNotProvided();
         }

        // Validar si el proyecto existe
        const projectExists = await projectModel.findById(req.body.project);
        if (!projectExists) {
            throw new ProjectNotFound();
        }

        const listCreated = await listModel.create(req.body);
        res.json(listCreated);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};


/**
 * @api {get} /lists Get all lists
 * @apiName GetLists
 * @apiGroup Lists
 * @apiSuccess {Object[]} lists Array of lists
 * @apiError {Object} 500 Internal Server Error
 */
const getLists = async (req, res) => {
    try {
        const lists = await listModel.find();
        res.json(lists);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}


/**
 * @api {get} /lists/:id Get list by ID
 * @apiName GetListById
 * @apiGroup Lists
 * @apiParam {String} id List ID
 * @apiSuccess {Object} list List data
 * @apiError {Object} 404 List not found
 * @apiError {Object} 500 Internal Server Error
 */
const getListById = async (req, res) => {
    try {
        const listFound = await listModel.findById(req.params.id);
        
        if (!listFound) {
            throw new ListNotFound();
        }
        
        res.json(listFound);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

/**
 * Retrieves all lists associated with a specific project.
 * 
 * @param {Object} req - Express request object, includes the project ID in params.
 * @param {Object} res - Express response object, used to return the JSON response.
 * @throws {Error} If there's an issue retrieving the lists, responds with an error message.
 * @returns {Promise<void>}
 */

const getListsByProject = async (req, res) => {
    try {
        const lists = await listModel.find({ project: req.params.projectId });
        res.json(lists);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

/**
 * Updates a list by its ID with the provided data.
 * 
 * @param {Object} req - Express request object, containing the list ID in params and updated data in body.
 * @param {Object} res - Express response object, used to return the updated list data.
 * @throws {ListTitleNotProvided} If the title of the list is not provided in the request body.
 * @throws {ListNotFound} If the list with the specified ID does not exist.
 * @returns {Promise<void>}
 */

const updateList = async (req, res) => {
    try {
        if (req.body.title === '') {
            throw new ListTitleNotProvided();
        }
        
        const listUpdated = await listModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!listUpdated) {
            throw new ListNotFound();
        }
        
        res.json(listUpdated);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

/**
 * Deletes a list by its ID.
 * 
 * @param {Object} req - Express request object, containing the list ID in params.
 * @param {Object} res - Express response object, used to return the deleted list data.
 * @throws {ListNotFound} If the list with the specified ID does not exist.
 * @returns {Promise<void>}
 */
const deleteList = async (req, res) => {
    try {
        const listDeleted = await listModel.findByIdAndDelete(req.params.id);
        
        if (!listDeleted) {
            throw new ListNotFound();
        }
        
        res.json(listDeleted);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

/**
 * Updates the positions of multiple lists in a single operation.
 * 
 * @param {Object} req - Express request object, containing an array of lists with their new positions in the body.
 * @param {Object} res - Express response object, used to return the updated list data.
 * @throws {Error} If there's an issue updating the list positions, responds with an error message.
 * @returns {Promise<void>}
 */
const updateListPositions = async (req, res) => {
  try {
    const { lists } = req.body; // Recibir un array de listas con sus nuevas posiciones

    if (!Array.isArray(lists)) {
      return res.status(400).json({ message: "Invalid lists format" });
    }

    const bulkOperations = lists.map((list) => ({
      updateOne: {
        filter: { _id: list._id },
        update: { position: list.position },
      },
    }));

    const result = await listModel.bulkWrite(bulkOperations); // Actualizar las posiciones en una sola operación

    res.status(200).json({ message: "List positions updated successfully", result });
  } catch (error) {
    console.error("Error updating list positions:", error);
    res.status(500).json({ message: "Error updating list positions" });
  }
};

export default {
    createList,
    getListsByProject,
    getLists,
    getListById,
    updateList,
    deleteList,
    updateListPositions
};