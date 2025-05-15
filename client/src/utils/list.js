import listsData from "../data/listsData.js";
import projectsData from "../data/projectsData.js";
import tasksData from "../data/tasksData.js";

const getAllLists = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(listsData);
    }, 500);
  });
};

const getListById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const listItem = listsData.find((list) => list._id.$oid === id);
      resolve(listItem);
    }, 500);
  });
};

const getListByProjectId = async (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = projectsData.find((proj) => proj._id.$oid === projectId);
      if (!project) return resolve([]);

      const projectListIds = project.lists.map((list) => list.$oid);

      const projectLists = listsData
        .filter((list) => projectListIds.includes(list._id.$oid))
        .map((list) => ({
          ...list,
          tasks: tasksData.filter((task) => task.list === list._id.$oid),
        }));

      resolve(projectLists);
    }, 500);
  });
};

export { getAllLists, getListById, getListByProjectId };
