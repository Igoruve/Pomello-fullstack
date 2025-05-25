import FetchData from "./fetch";

const getAllLists = async () => {
const lists = await FetchData("/list");
  return lists;
};

const getListById = async (listId) => {
  const list = await FetchData(`/list/${listId}`);
  return list;
};

const getListByProjectId = async (projectId) => {
  const lists = await FetchData(`/list/project/${projectId}`);
  return lists;
};

const createList = async (list) => {
  const newList = await FetchData("/list", "POST", list);
  return newList;
};

const removeList = async (listId) => {
  const response = await FetchData(`/list/${listId}`, "DELETE");
  return response;
}

const updateList = async (listId, list) => {
  const updatedList = await FetchData(`/list/${listId}`, "PUT", list);
  return updatedList;
};

const updateListPositions = async (lists) => {
  await FetchData("/list/lists/positions", "PUT", { lists });
};

export { getAllLists, getListById, getListByProjectId, createList, removeList, updateList, updateListPositions };
