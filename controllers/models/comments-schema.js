import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  
  hostName: {
    type: String,
    ref: 'users',
    required: true
  },
  comment: {
      type: String,
      required: true
    }
},{collection:'comments'});

export default commentSchema;
