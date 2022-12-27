import mongoose, { model } from "mongoose";

const schema = mongoose.Schema({
  round: {
    type: Number
  },
  numberCurrentCard: {
    type: Number
  }
});

export default mongoose.model('LearnModuleRound', schema);