import listModel from "../models/listModel.js";
import projectModel from "../models/projectModel.js";
import Errors from "../utils/errors.js"; // ✅ Importación correcta

const {
  ListTitleNotProvided,
  ListNotFound,
  ProjectNotFound
} = Errors;


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

const getLists = async (req, res) => {
    try {
        const lists = await listModel.find();
        res.json(lists);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

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

const getListsByProject = async (req, res) => {
    try {
        const lists = await listModel.find({ project: req.params.projectId });
        res.json(lists);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

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