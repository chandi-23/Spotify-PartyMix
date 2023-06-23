import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  party_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Party',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    text: {
      type: String,
      required: true
    }
  }]
});

export default commentSchema;
