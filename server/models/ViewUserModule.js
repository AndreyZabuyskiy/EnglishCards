import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudyModule',
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

export default mongoose.model('ViewUserModule', schema);