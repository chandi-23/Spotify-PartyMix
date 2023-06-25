import CommentModel from '../models/comment-model.js';

// Create a new comment
export const createComment = async (party_id, user_id, content) => {
  const comment = new CommentModel({
    party_id,
    user_id,
    content
  });
  return CommentModel.create(comment);
};

// Get all comments for a party
export const getComments = () => CommentModel.find();
