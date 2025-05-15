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

export { getAllLists, getListById, getListByProjectId };
