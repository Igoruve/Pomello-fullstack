import FetchData from "./fetch";

/**
 * Gets all lists from the server.
 * @returns {Promise<Object[]>} Resolves with an array of list objects.
 */
const getAllLists = async () => {
const lists = await FetchData("/list");
  return lists;
};

/**
 * Gets a single list by its ID.
 * @param {string} listId - The ID of the list to be retrieved.
 * @returns {Promise<Object>} Resolves with the list object.
 */
const getListById = async (listId) => {
  const list = await FetchData(`/list/${listId}`);
  return list;
};

/**
 * Gets all lists for a given project.
 * @param {string} projectId - The ID of the project to be retrieved.
 * @returns {Promise<Object[]>} Resolves with an array of list objects.
 */
const getListByProjectId = async (projectId) => {
  const lists = await FetchData(`/list/project/${projectId}`);
  return lists;
};

/**
 * Creates a new list on the server.
 * @param {Object} list - The list object to be created.
 * @returns {Promise<Object>} Resolves with the newly created list object.
 */
const createList = async (list) => {
  const newList = await FetchData("/list", "POST", list);
  return newList;
};

/**
 * Deletes a list from the server.
 * @param {string} listId - The ID of the list to be deleted.
 * @returns {Promise<Object>} Resolves with the response object.
 */
const removeList = async (listId) => {
  const response = await FetchData(`/list/${listId}`, "DELETE");
  return response;
}

/**
 * Updates a list on the server.
 * @param {string} listId - The ID of the list to be updated.
 * @param {Object} list - The updated list object.
 * @returns {Promise<Object>} Resolves with the updated list object.
 */
const updateList = async (listId, list) => {
  const updatedList = await FetchData(`/list/${listId}`, "PUT", list);
  return updatedList;
};


/**
 * Updates the positions of multiple lists on the server.
 * @param {Object[]} lists - An array of list objects with their new positions.
 * @returns {Promise<void>} Resolves when the positions are updated.
 */
const updateListPositions = async (lists) => {
  await FetchData("/list/lists/positions", "PUT", { lists });
};

export { getAllLists, getListById, getListByProjectId, createList, removeList, updateList, updateListPositions };
