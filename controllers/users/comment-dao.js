import CommentModel from '../models/comments-model.js'

// Create a new comment
export const createComment = async (hostName, comment) => {
  const newComment = new CommentModel({
    hostName,
    comment
  });
  return CommentModel.create(newComment);
};

// Get all comments for a party
export const getComments = () => CommentModel.find();
