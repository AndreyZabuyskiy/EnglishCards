import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  status: {
    type: String,
    require: true
  }
}, {
  timestamps: true
});

export default mongoose.model('MemorizationOfModule', schema);