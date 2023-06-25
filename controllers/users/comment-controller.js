import * as commentDao from './comment-dao.js';

// Create a new comment
export const createComment = async (req, res) => {
  try {
    console.log(req.body)
    const { hostName, comment } = req.body;

    const commentObj = await commentDao.createComment(hostName, comment);
    res.status(201).json(commentObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getComments = async (req, res) => {
  try {
    const comments = await commentDao.getComments();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default (app) => {
  app.post('/api/comments/create', createComment);
  app.get('/api/comments/getComments', getComments);
};
