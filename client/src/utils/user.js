import usersData from "../data/usersData";

const getAllUsers = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(usersData);
        }, 500);
    });
};

const getUserById = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const userItem = usersData.find((user) => user._id.$oid === id);
            resolve(userItem);
        }, 500);
    });
}

export { getAllUsers, getUserById };