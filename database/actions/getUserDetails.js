import userListModel from "../models/userListModel.js";

export default async function getUserDetails(username) {
    const userExists = await userListModel.findOne({ username: username });
    if (userExists === null) {
        return {error : "User not found!"};
    } else {
        return {userExists}
    }
};
