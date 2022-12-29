import mongoose from "mongoose";

const schema = mongoose.Schema({
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearnModule',
    require: true
  },
  round: {
    type: Number
  },
  totalNumberCards: {
    type: Number
  },
  passedCards: {
    type: Number
  },
  numberCurrentCard: {
    type: Number
  }
});

export default mongoose.model('LearnModuleRound', schema);