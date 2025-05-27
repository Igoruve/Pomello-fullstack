import projectModel from "../models/projectModel.js";
import userModel from "../models/userModel.js";
import Errors from "../utils/errors.js";

import listModel from "../models/listModel.js";
import taskModel from "../models/taskModel.js";


const {
  ProjectTitleNotProvided,
  ProjectDescriptionNotProvided,
  ProjectNotFound,
  UserNotFound
} = Errors;


/**
 * Creates a new project in the database.
 *
 * @param {Object} req - Express request object containing the project title and description in the body, and authenticated user information.
 * @param {Object} res - Express response object used to send the created project data or an error message.
 * @throws {ProjectTitleNotProvided} If the project title is not provided in the request body.
 * @returns {Promise<void>} Responds with the created project object or an error message.
 */

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      throw new ProjectTitleNotProvided();
    }

    const projectData = {
      title,
      description,
      user: req.user.id, // Asegúrate de que el usuario autenticado esté asignado
    };

    const projectCreated = await projectModel.create(projectData);
    res.status(201).json(projectCreated);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

/**
 * Retrieves all projects from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object used to send the list of projects.
 * @returns {Promise<void>} Responds with the list of projects or an error message.
 */
const getProjects = async (req, res) => {
  try {
    const projects = await projectModel.find();
    res.json(projects);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

/**
 * Retrieves a project by its ID and returns it with its associated lists and tasks.
 *
 * @param {Object} req - Express request object containing the project ID in params.
 * @param {Object} res - Express response object used to send the project data or an error message.
 * @throws {ProjectNotFound} If the project with the specified ID does not exist.
 * @returns {Promise<void>} Responds with the project object, including its lists and tasks, or an error message.
 */
const getProjectbyId = async (req, res) => {
  try {
    const projectId = req.params.id.trim();

    const project = await projectModel.findById(projectId);
    if (!project) {
      throw new ProjectNotFound();
    }

    const lists = await listModel.find({ project: projectId });

    const listIds = lists.map((list) => list._id);
    const tasks = await taskModel.find({ list: { $in: listIds } });

    const listsWithTasks = lists.map((list) => {
      const listTasks = tasks.filter(
        (task) => task.list.toString() === list._id.toString()
      );
      return {
        ...list.toObject(),
        tasks: listTasks,
      };
    });

    // devolver el proyecto con listas y tareas
    const projectWithListsAndTasks = {
      ...project.toObject(),
      lists: listsWithTasks,
    };

    res.json(projectWithListsAndTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves projects associated with the authenticated user.
 *
 * @param {Object} req - Express request object containing authenticated user information.
 * @param {Object} res - Express response object used to send the list of projects.
 * @throws {UserNotFound} If the user ID is not found in the request.
 * @returns {Promise<void>} Responds with an array of projects or an empty array if no projects are found.
 */

const getProjectsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      throw new Errors.UserNotFound();
    }

    const projects = await projectModel.find({ user: userId });

    if (!projects.length) {
      return res.status(200).json([]);
    }

    res.json(projects);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

/**
 * Retrieves all projects associated with a specific user, including their lists and tasks.
 *
 * @param {Object} req - Express request object containing the user ID in params.
 * @param {Object} res - Express response object used to send the aggregated project data or an error message.
 * @returns {Promise<void>} Responds with an array of projects, each containing its lists and tasks, or an error message.
 * @throws {Error} If there's an issue retrieving the data, responds with an error message.
 */

const getFullUserData = async (req, res) => {
  try {
    const userId = req.params.userId.trim();

    const projects = await projectModel.find({ user: userId });

    const projectIds = projects.map((project) => project._id);
    const lists = await listModel.find({ project: { $in: projectIds } });

    const listIds = lists.map((list) => list._id);
    const tasks = await taskModel.find({ list: { $in: listIds } });

    const projectsWithListsAndTasks = projects.map((project) => {
      const projectLists = lists.filter(
        (list) => list.project.toString() === project._id.toString()
      );

      const listsWithTasks = projectLists.map((list) => {
        const listTasks = tasks.filter(
          (task) => task.list.toString() === list._id.toString()
        );
        return {
          ...list.toObject(),
          tasks: listTasks,
        };
      });

      return {
        ...project.toObject(),
        lists: listsWithTasks,
      };
    });

    res.json(projectsWithListsAndTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Updates a project.
 *
 * @param {Object} req - Express request object containing the project data to update in the body.
 * @param {Object} res - Express response object used to send the updated project data or an error message.
 * @throws {ProjectTitleNotProvided} If the project title is not provided in the request body.
 * @throws {ProjectNotFound} If the project with the specified ID does not exist.
 * @returns {Promise<void>} Responds with the updated project data or an error message.
 */
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

/**
 * Deletes a project by its ID.
 *
 * @param {Object} req - Express request object, containing the project ID in params.
 * @param {Object} res - Express response object, used to return the deleted project data.
 * @throws {ProjectNotFound} If the project with the specified ID does not exist.
 * @returns {Promise<void>} Responds with the deleted project data or an error message.
 */
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
};

export default {
  createProject,
  getProjects,
  getProjectsByUser,
  updateProject,
  deleteProject,
  getProjectbyId,
  getFullUserData,
};
