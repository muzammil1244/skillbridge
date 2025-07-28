import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  members: {
    type: Array, // 👈 naam string me store hoga
  },
 
});

export const Conversation = mongoose.model("Conversation", ConversationSchema);
