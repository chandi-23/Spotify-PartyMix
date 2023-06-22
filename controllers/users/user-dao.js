import UserModel from '../models/user-model.js'

export const createUser = (user) => user.save();
export const getUserByCredentials = (emailId, password) => UserModel.findOne({ emailId, password});
export const updateUser = (id, user) => UserModel.updateOne({ _id: id }, { $set: user });
export const getUserType = (userId) => UserModel.findById(userId).select('usertype');
