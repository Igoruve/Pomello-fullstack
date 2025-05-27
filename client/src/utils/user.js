import usersData from "../data/usersData";
import FetchData from "../data/FetchData";

/**
 * @module userUtils
 * @description Utilities for handling users calling the FetchData function.
 */


/**
 * Get all users. It calls the FetchData function with the route /users
 * @function
 * @returns -> users
 */
const getAllUsers = async () => {
  const users = await FetchData("/users");
  return users;
};

/**
 * Get a user by id.
 * @function
 * @param {string} id - The id of the user
 * @returns -> user
 */
const getUserById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userItem = usersData.find((user) => user._id.$oid === id);
      resolve(userItem);
    }, 500);
  });
};

export { getAllUsers, getUserById };
