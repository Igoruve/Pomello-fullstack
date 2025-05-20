import listModel from "../models/listModel.js";
import projectModel from "../models/projectModel.js"; // Importar el modelo de proyectos
import { ListTitleNotProvided, ListNotFound, ProjectNotFound } from "../utils/errors.js";

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

export default {
    createList,
    getListsByProject,
    getLists,
    getListById,
    updateList,
    deleteList
};