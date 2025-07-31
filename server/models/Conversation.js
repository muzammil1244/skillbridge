import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  members: {
    type: Array, 
  },
 
});

export const Conversation = mongoose.model("Conversation", ConversationSchema);
