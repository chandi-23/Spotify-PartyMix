import mongoose from 'mongoose';
import commentSchema from './comments-schema.js';

const CommentModel = mongoose.model('CommentModel', commentSchema);

export default CommentModel;

