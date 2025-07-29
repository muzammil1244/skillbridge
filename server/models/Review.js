import mongoose from "mongoose";

const model = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  },
  rate:{
    type:Number,
    required:true
  },
  profileImage: {
    type: String,
  },
  Comment: {
    type: String,
    required: true,
  },
 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Review = mongoose.model("review", model);
