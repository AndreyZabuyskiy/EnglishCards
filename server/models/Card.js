import mongoose from "mongoose";

const schema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  translate: {
    type: String
  },
  pathToFile: {
    type: String
  },
  urlToImage: {
    type: String
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudyModule',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Card', schema);