import mongoose from 'mongoose';

const partySchema = new mongoose.Schema({
  title: {
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
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  allDay: {
    type: String,
    required: true
  },
  hostName: {
    type: String,
    required: true
  },
},{collection:'party'});


export default partySchema;
