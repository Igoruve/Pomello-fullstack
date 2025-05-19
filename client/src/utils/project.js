import FetchData from "./fetch.js";

const getAllProjects = async () => {
  const projects = await FetchData("/project");
  return projects;
};

const getProjectById = async (projectId) => {
  const project = await FetchData(`/project/${projectId}`);
  return project;
};

const getProjectsByUserId = async (userId) => {
  const userProjects = await FetchData(`/project/user/${userId}`);
  return userProjects;
};

const getProjectsFullInfo = async (userId) => {
  const userProjects = await FetchData(`/project/full/${userId}`);
  return userProjects;
};

const createProject = async (data) => {
  const result = await FetchData("/project", "POST", data);
  return result;
};

const removeProject = async (projectId) => {
  const result = await FetchData(`/project/${projectId}`, "DELETE");
  return result;
};

export { getAllProjects, getProjectById, getProjectsByUserId, getProjectsFullInfo, createProject, removeProject };
