import FetchData from "./fetch.js";

/**
 * @module projectUtils
 * @description Utilities for handling projects with CRUD operations calling the FetchData function.
 */



/**
 * Get all projects. It calls the FetchData function with the route /project
 * @function
 * @returns -> projects
 */

const getAllProjects = async () => {
  const projects = await FetchData("/project");
  return projects;
};

/**
 * Get a project by id. It calls the FetchData function with the route /project/:id
 * @function
 * @param {string} projectId - The id of the project
 * @returns -> project
 */

const getProjectById = async (projectId) => {
  const project = await FetchData(`/project/${projectId}`);
  return project;
};

/**
 * Get a project by user id. It calls the FetchData function with the route /project/user
 * @function
 * @param {string} userId -> the id of the user
 * @returns -> user projects
 */

const getProjectsByUserId = async () => {
  const userProjects = await FetchData(`/project/user`);
  return userProjects;
};


const getProjectsFullInfo = async (userId) => {
  const userProjects = await FetchData(`/project/full/${userId}`);
  return userProjects;
};

/**
 * Create a project. It calls the FetchData function with the route /project with the method POST
 * @function
 * @param {*} project - The project to create
 * @returns -> new project
 */

const createProject = async (data) => {
  const result = await FetchData("/project", "POST", data);
  return result;
};

/**
 * Remove a project. It calls the FetchData function with the route /project/:id with the method DELETE
 * @function
 * @param {string} projectId - The id of the project
 * @returns -> project
 */
const removeProject = async (projectId) => {
  const result = await FetchData(`/project/${projectId}`, "DELETE");
  return result;
};


/**
 * Update a project. It calls the FetchData function with the route /project/:id with the method PUT
 * @function
 * @param {string} projectId  - The id of the project
 * @param {*} project - The project to update
 * @returns -> updated project
 */
const updateProject = async (projectId, data) => {
  const result = await FetchData(`/project/${projectId}`, "PUT", data);
  return result;
};

export {
  updateProject,
  getAllProjects,
  getProjectById,
  getProjectsByUserId,
  getProjectsFullInfo,
  createProject,
  removeProject,
};
