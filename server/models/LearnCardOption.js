import mongoose from "mongoose";

const schema = mongoose.Schema({
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearnModuleCard',
    require: true
  },
  value: {
    type: String
  },
  isRight: {
    type: Boolean
  }
});

export default mongoose.model('LearnCardOption', schema);