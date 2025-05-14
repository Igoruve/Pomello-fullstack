import FetchData from "./fetch.js";
import projects from "../data/projectsData.js";

const getAllProjects = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projects);
    }, 500);
  });
};

const getProjectById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = projects.find((project) => project._id.$oid === id);
      resolve(project);
    }, 500);
  });
};

export { getAllProjects, getProjectById };
