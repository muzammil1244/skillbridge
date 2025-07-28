import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: String, 
  },
 senderId:{
    type:String
 },
 message:{
    type:String
 },
 file:{
   type:String
 }

});

export const Message = mongoose.model("Message", MessageSchema);
