import mongoose from "mongoose";

const schema = mongoose.Schema({
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearnModule',
    require: true
  },
  round: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearnModuleRound',
    require: false
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    require: true
  }
});

export default mongoose.model('LearnModuleCard', schema);