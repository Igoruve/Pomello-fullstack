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

export { getAllProjects, getProjectById, getProjectsByUserId, getProjectsFullInfo };
