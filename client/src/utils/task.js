import listsData from "../data/listsData.js";
import tasksData from "../data/tasksData.js";
import FetchData from "./fetch.js";

/**
 * Simulates a network request to fetch all tasks.
 *
 * @return {Promise} Resolves to an array of tasks, or rejects with an error.
 */
const getAllTasks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasksData);
    }, 500);
  });
};

/**
 * Simulates a network request to fetch a task by its ID.
 *
 * @param {string} id - The ID of the task to fetch.
 * @return {Promise<Object|null>} Resolves to the task object if found, or null if not found.
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
 * Simulates a network request to fetch all tasks for a given list.
 *
 * @param {string} listId - The ID of the list to fetch tasks for.
 * @return {Promise<Object[]>} Resolves to an array of tasks, or an empty array if the list was not found.
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
 * Simulates a network request to create a new task.
 *
 * @param {Object} task - The task object to create.
 * @return {Promise<Object>} Resolves to the newly created task object.
 */
const createTask = async (task) => {
  const newTask = await FetchData("/task", "POST", task);
  return newTask;
};

/**
 * Simulates a network request to delete a task by its ID.
 *
 * @param {string} taskId - The ID of the task to be deleted.
 * @return {Promise<void>} Resolves when the task is successfully deleted.
 */

const removeTask = async (taskId) => {
  await FetchData(`/task/${taskId}`, "DELETE");
};

/**
 * Simulates a network request to update a task by its ID.
 *
 * @param {string} taskId - The ID of the task to be updated.
 * @param {Object} task - The updated task object.
 * @return {Promise<void>} Resolves when the task is successfully updated.
 */
const updateTask = async (taskId, task) => {
  await FetchData(`/task/${taskId}`, "PUT", task);
};

/**
 * Simulates a network request to update the positions of multiple tasks at once.
 *
 * @param {Object[]} tasks - An array of task objects with their new positions.
 * @return {Promise<void>} Resolves when the task positions are successfully updated.
 */
const updateTaskPositions = async (tasks) => {
 return  await FetchData("/task/tasks/positions", "PUT", { tasks });
};

export { getAllTasks, getTaskById, getTaskByListId, createTask, removeTask, updateTask, updateTaskPositions };
