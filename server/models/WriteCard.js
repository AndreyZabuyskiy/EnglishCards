import mongoose from "mongoose";

const shcema = new mongoose.Schema({
  index: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true,
    default: 0
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  },
  /*value: {
    type: String,
    required: true
  },
  translate: {
    type: String
  },
  imgUrl: {
    type: String
  },*/
  writeModule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WriteModule',
    required: true
  }
});

export default mongoose.model('WriteCard', shcema);