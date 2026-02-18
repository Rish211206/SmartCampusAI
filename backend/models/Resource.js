import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  relevanceScore: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("Resource", resourceSchema);
