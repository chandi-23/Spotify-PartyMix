import * as commentDao from './comment-dao.js';

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { party_id, user_id, content } = req.body;

    const comment = await commentDao.createComment(party_id, user_id, content);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all comments for a party
export const getCommentsByParty = async (req, res) => {
  try {
    const party_id = req.params.party_id;
    const comments = await commentDao.getCommentsByParty(party_id);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
