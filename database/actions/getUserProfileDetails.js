import userListModel from "../models/userListModel.js";

export default async function getUserProfileDetails(reviews) {
    const users = [];
    reviews["review_list"].forEach((review) => users.push(review["username"]));
    const userProfileDetails = await userListModel.find({username : {$in : users}}, "username bio avatar_path joined_date");
    return userProfileDetails;
};
