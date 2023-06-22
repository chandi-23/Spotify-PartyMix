import mongoose from 'mongoose';
import userSchema from './user-schema.js';

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;

