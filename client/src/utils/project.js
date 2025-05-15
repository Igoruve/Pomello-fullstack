import FetchData from "./fetch.js";
import projectsData from "../data/projectsData.js";
import usersData from "../data/usersData.js";

const getAllProjects = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projectsData);
    }, 500);
  });
};

const getProjectById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = projectsData.find((project) => project._id.$oid === id);
      resolve(project);
    }, 500);
  });
};

const getProjectsByUserId = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = usersData.find((u) => u._id.$oid === userId);
      
      if (!user) return resolve([]);

      const userProjectIds = user.projects.map((proj) => proj.$oid);

      const userProjects = projectsData.filter((proj) =>
        userProjectIds.includes(proj._id.$oid)
      );

      resolve(userProjects);
    }, 500);
  });
};

export { getAllProjects, getProjectById, getProjectsByUserId };
