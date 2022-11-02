import mongoose from "mongoose";

const schema = new mongoose.Schema({
  currentIndex: {
    type: Number
  },
  round: {
    type: Number
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudyModule',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model('WriteModule', schema);