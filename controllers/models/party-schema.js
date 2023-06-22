import mongoose from 'mongoose';

const partySchema = new mongoose.Schema({
  partyName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  hostName: {
    type: String,
    required: true
  }
},{collection:'party'});


export default partySchema;
