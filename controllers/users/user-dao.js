import UserModel from '../models/user-model.js'

export const createUser = (user) => UserModel.create(user);
export const getUserByCredentials = (emailId, password) => UserModel.findOne({ emailId, password});
export const updateUser = (id, user) => UserModel.updateOne({ _id: id }, { $set: user });
export const getUserType = (userId) => UserModel.findById(userId).select('usertype');
export const deleteTokensByUserID = (token) => {
    return UserModel.updateMany(
      {
        usertype: { $ne: 'host' },
        token: token
      },
      { $set: { token: null } }
    );
  };
export const getUserByUsername = (username) => UserModel.findOne({ username });
  
