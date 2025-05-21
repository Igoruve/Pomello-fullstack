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

export { getAllLists, getListById, getListByProjectId, createList };
