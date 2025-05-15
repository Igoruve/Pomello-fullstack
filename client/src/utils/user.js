import usersData from "../data/usersData";
import FetchData from "../data/FetchData";

const getAllUsers = async () => {
  const users = await FetchData("/users");
  return users;
};

const getUserById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userItem = usersData.find((user) => user._id.$oid === id);
      resolve(userItem);
    }, 500);
  });
};

export { getAllUsers, getUserById };
