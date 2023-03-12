import mongoose from "mongoose";

const schema = new mongoose.Schema({
  term: {
    type: String,
    required: true
  },
  definition: {
    type: String
  },
  pathToFile: {
    type: String
  },
  urlToImage: {
    type: String
  },
  position: {
    type: Number
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MemorizationOfModule',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('MemorizationOfCard', schema);