import mongoose from "mongoose";

const schema = ({
  value: {
    type: String,
    required: true
  },
  translate: {
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

export default mongoose.model('Word', schema);