import listsData from "../data/listsData.js";
import tasksData from "../data/tasksData.js";
import FetchData from "./fetch.js";

const getAllTasks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasksData);
    }, 500);
  });
};

const getTaskById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const taskItem = tasksData.find((task) => task._id.$oid === id);
      resolve(taskItem);
    }, 500);
  });
};

const getTaskByListId = async (listId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = listsData.find((list) => list._id.$oid === listId);
      
      if (!list) return resolve([]);

      const listTaskIds = list.tasks.map((task) => task.$oid);

      const listTasks = tasksData.filter((task) =>
        listTaskIds.includes(task._id.$oid)
      );

      resolve(listTasks);
    }, 500);
  });
};

const createTask = async (task) => {
  const newTask = await FetchData("/task", "POST", task);
  return newTask;
};


export { getAllTasks, getTaskById, getTaskByListId, createTask };
