import listsData from "../data/listsData.js";
import tasksData from "../data/tasksData.js";
import FetchData from "./fetch.js";


/**
 * @module tasksUtils
 * @description Utilities for handling tasks with CRUD operations calling the FetchData function.
 */

/**
 * Get all tasks. It calls the FetchData function with the route /tasks
 * @function
 * @returns -> tasks
 */
const getAllTasks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasksData);
    }, 500);
  });
};

/**
 * Get a task by id. It calls the FetchData function with the route /task/:id
 * @function
 * @param {string} taskId - The id of the task
 * @returns -> task
 */
const getTaskById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const taskItem = tasksData.find((task) => task._id.$oid === id);
      resolve(taskItem);
    }, 500);
  });
};

/**
 * Get a tasks by list id.
 * @function
 * @param {string} userId -> the id of the list
 * @returns -> tasks
 */
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

/**
 * Create a task. It calls the FetchData function with the route /task with the method POST
 * @function
 * @param {*} task - The task to create
 * @returns -> new task
 */
const createTask = async (task) => {
  const newTask = await FetchData("/task", "POST", task);
  return newTask;
};

/**
 * Remove a task. It calls the FetchData function with the route /task/:id with the method DELETE
 * @function
 * @param {string} taskId - The id of the task
 * @returns -> task
 */
const removeTask = async (taskId) => {
  await FetchData(`/task/${taskId}`, "DELETE");
};

/**
 * Update a task. It calls the FetchData function with the route /task/:id with the method PUT
 * @function
 * @param {string} taskId  - The id of the task
 * @param {*} task - The task to update
 * @returns -> updated task
 */
const updateTask = async (taskId, task) => {
  await FetchData(`/task/${taskId}`, "PUT", task);
};


export { getAllTasks, getTaskById, getTaskByListId, createTask, removeTask, updateTask };
