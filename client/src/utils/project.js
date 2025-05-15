import FetchData from "./fetch.js";

const getAllProjects = async () => {
  const projects = await FetchData("/projects");
  return projects;
};

const getProjectById = async (id) => {
  const project = await FetchData(`/projects/${id}`);
  return project;
};

const getProjectsByUserId = async (userId) => {
  const userProjects = await FetchData(`/project/user/${userId}`);
  return userProjects;
};

export { getAllProjects, getProjectById, getProjectsByUserId };
