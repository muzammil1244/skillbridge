import { Conversation } from "../models/Conversation.js"
import { Message } from "../models/Message.js" // Fixed typo: Messege.js -> Message.js
import User from "../models/User.js"

export const StoreSenderAndReciver = async (req, res) => {



  const { senderId, reciverId } = req.body


  try {

    const newconversation = new Conversation({ members: [senderId, reciverId] })

    await newconversation.save()

    res.status(200).send("conversation created succefully ")
  } catch (err) {
    res.status(401).send(err)
  }


}


export const ConverSationList = async (req, res) => {
  const id = req.params?.userId;
  try {
    const list = await Conversation.find({ members: { $in: [id] } });

    const conversationdata = await Promise.all(
      list
        .filter((conv) => conv.members.length === 2) // ensure valid structure
        .map(async (conv) => {
          const receiverId = conv.members.find((member) => member !== id);

          if (!receiverId) return null;

          const user = await User.findById(receiverId).select("name email profileImage");
          if (!user) return null;

          return {
            user: {
              reciverId: user._id,
              name: user.name,
              email: user.email,
              image: user.profileImage,
            },
            conversationId: conv._id,
          };
        })
    );

    // Filter out null values (invalid entries)
    const validData = conversationdata.filter(Boolean);
    res.status(200).json(validData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" , err });
  }
};





export const Messages = async (req, res) => {
  const { conversationId, senderId, message, reciverId = "" } = req.body;
  let file = "";

  if (req.file) {
    file =   req.file ? req.file.filename : null;

  }

  try {
    let convid = conversationId;

    if (!convid || convid === "new") {
      if (!reciverId) {
        return res.status(400).json({ error: "Receiver ID is required" });
      }

      let isexist = await Conversation.findOne({ members: { $all: [senderId, reciverId] } });

      if (isexist) {
        convid = isexist._id;
      } else {
        const newconvid = new Conversation({ members: [senderId, reciverId] });
        await newconvid.save();
        convid = newconvid._id;
      }
    }

    if (!message && !file) {
      return res.status(400).json({ error: "Message or file is required" });
    }

    const newMessage = new Message({ conversationId: convid, senderId, message, file });
    await newMessage.save();

   return res.status(200).json({ ...newMessage._doc }); // ✅ file include hoga yahan


  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to send message" });
  }
};


export const MessagesList = async (req, res) => {
  const conversationId = req.params?.conversationId
  if (conversationId === "new") res.status(200).json([])

  try {

    const newmessage = await Message.find({ conversationId })

    const senderData = Promise.all(newmessage.map(async (message) => {
      const user = await User.findById(message.senderId)

      return {
        user: { id: user._id, name: user.name, email: user.email }, Messages: message.message, fileUrl: message.file || "", // ✅ send file url if exists
      }

    }))
    res.status(200).json(await senderData)



  } catch (err) {

    console.log(err);

  }


}