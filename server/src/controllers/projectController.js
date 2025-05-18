import projectModel from "../models/projectModel.js";
import userModel from "../models/userModel.js";
import { ProjectTitleNotProvided, ProjectDescriptionNotProvided, ProjectNotFound, UserNotFound } from "../utils/errors.js";

const createProject = async (req, res) => {
    try {
        if (!req.body || !req.body.length) {
            throw new ProjectTitleNotProvided();
        }
        
        const data = req.body.map((item) => {
            if (!item.title) {
                throw new ProjectTitleNotProvided();
            }
            
            if (!item.description) {
                throw new ProjectDescriptionNotProvided();
            }
            
            return {
                ...item,
                user: req.user._id
            }
        });
        
        const projectCreated = await projectModel.create(data);
        res.json(projectCreated);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

const getProjects = async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.json(projects);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

const getProjectbyId = async (req, res) => {
    try {
        const projectFound = await projectModel.findById(req.params.id);
        
        if (!projectFound) {
            throw new ProjectNotFound();
        }
        
        res.json(projectFound);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

const getProjectsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        if (!userId) {
            throw new UserNotFound();
        }
        
        // Verificar si el usuario existe
        const userExists = await userModel.findById(userId);
        if (!userExists) {
            throw new UserNotFound();
        }
        
        const projects = await projectModel.find({ user: userId });
        
        if (projects.length === 0) {
            return res.status(200).json({ 
                message: "This user has no projects", 
                projects: [] 
            });
        }
        
        res.json(projects);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        // if (req.body.title === '') {
        //     throw new ProjectTitleNotProvided();
        // }
        
        const projectUpdated = await projectModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
    
        if (!projectUpdated) {
            throw new ProjectNotFound();
        }
    
        res.json(projectUpdated);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const projectDeleted = await projectModel.findByIdAndDelete(req.params.id);
        
        if (!projectDeleted) {
            throw new ProjectNotFound();
        }
        
        res.json(projectDeleted);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

export default {
    createProject,
    getProjects,
    getProjectsByUser,
    updateProject,
    deleteProject,
    getProjectbyId
}