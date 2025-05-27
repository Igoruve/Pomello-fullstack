import usersData from "../data/usersData";
import FetchData from "../data/FetchData";

/**
 * Fetches all users from the server.
 * 
 * Makes an API call to the "/users" endpoint to retrieve a list of users.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of user objects.
 */

const getAllUsers = async () => {
  const users = await FetchData("/users");
  return users;
};

/**
 * Gets a single user by its ID.
 *
 * Simulates a server delay of 500ms before resolving the promise with
 * the user object.
 *
 * @param {string} id - The ID of the user to be retrieved.
 * @returns {Promise<Object>} Resolves with the user object.
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
