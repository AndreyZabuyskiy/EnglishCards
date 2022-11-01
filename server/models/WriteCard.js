import mongoose from "mongoose";

const shcema = new mongoose.Schema({
  index: {
    type: Number,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true,
    default: false
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  },
  writeModule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WriteModule',
    required: true
  }
});

export default mongoose.model('WriteCard', shcema);