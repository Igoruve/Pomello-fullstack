import FetchData from "./fetch.js";

const getAllProjects = async () => {
  const projects = await FetchData("/project");
  return projects;
};

const getProjectById = async (projectId) => {
  const project = await FetchData(`/project/${projectId}`);
  return project;
};

const getProjectByUserId = async (userId) => {
  const userProjects = await FetchData(`/project/user/${userId}`);
  return userProjects;
};

export { getAllProjects, getProjectById, getProjectByUserId };
