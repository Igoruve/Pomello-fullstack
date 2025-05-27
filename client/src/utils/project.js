import FetchData from "./fetch.js";

/**
 * Gets all projects.
 * @returns {Promise<Object[]>} Resolves with an array of project objects.
 */
const getAllProjects = async () => {
  const projects = await FetchData("/project");
  return projects;
};

/**
 * Gets a single project by ID.
 * @param {string} projectId - The ID of the project to be retrieved.
 * @returns {Promise<Object>} Resolves with the project object.
 */
const getProjectById = async (projectId) => {
  const project = await FetchData(`/project/${projectId}`);
  return project;
};

/**
 * Gets all projects associated with the current user.
 * @returns {Promise<Object[]>} Resolves with an array of project objects.
 */
const getProjectsByUserId = async () => {
  const userProjects = await FetchData(`/project/user`);
  return userProjects;
};

/**
 * Gets all projects associated with the user along with their lists and tasks.
 * @param {string} userId - The ID of the user whose projects are to be retrieved.
 * @returns {Promise<Object[]>} Resolves with an array of project objects with lists and tasks nested inside.
 */
const getProjectsFullInfo = async (userId) => {
  const userProjects = await FetchData(`/project/full/${userId}`);
  return userProjects;
};

/**
 * Creates a new project.
 * @param {Object} data - Data for the new project to be created.
 * @property {string} title - Title of the new project.
 * @property {string} description - Description of the new project.
 * @returns {Promise<Object>} Resolves with the newly created project object.
 */
const createProject = async (data) => {
  const result = await FetchData("/project", "POST", data);
  return result;
};

/**
 * Deletes a project from the server.
 * @param {string} projectId - The ID of the project to be deleted.
 * @returns {Promise<Object>} Resolves with the response object.
 */

/**
 * Deletes a project from the server.
 * @param {string} projectId - The ID of the project to be deleted.
 * @returns {Promise<Object>} Resolves with the response object.
 */
const removeProject = async (projectId) => {
  const result = await FetchData(`/project/${projectId}`, "DELETE");
  return result;
};

/**
 * Updates a project on the server.
 * @param {string} projectId - The ID of the project to be updated.
 * @param {Object} data - The data to update the project with.
 * @returns {Promise<Object>} Resolves with the updated project object.
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
