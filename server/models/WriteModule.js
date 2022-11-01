import mongoose from "mongoose";

const schema = new mongoose.Schema({
  currentIndex: {
    type: Number
  },
  round: {
    type: Number
  }
});

export default mongoose.model('WriteModule', schema);