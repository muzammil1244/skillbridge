import express, { json } from "express";
import { connectDB } from "./config/db.js";
import { config } from "dotenv";
import mongoose from "mongoose"; // ✅ Missing import added
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import protectedRoutes from "./routes/protectedRoutes.js";
import jobRoutes from "./routes/jobRouts.js";
import profileRoutes from "./routes/profileRoutes.js";
import reviewroutes from "./routes/review.js"
import Chat from "./routes/Chat.js"
import http from "http";
import {Server} from "socket.io"
// ✅ Load environment variables
config();

// ✅ Create express app
const app = express();


// io connection 

const server = http.createServer(app)

let users = []
const io = new Server(server, {
  cors: {
    origin: "https://skillbridge-indol.vercel.app/login", // ✅ No space, no trailing slash
    methods: ["GET", "POST"],
  },
});





io.on("connection",(socket)=>{
console.log(socket.id);

socket.on("addUser",userId=>{

  const isExist = users.find(users=>users.userId === userId)
  if(!isExist){
  let user = {userId,socketId:socket.id}
  console.log("yess this is cheking ")

     users.push(user)
console.log("get user data for send",users)
  io.emit("getUser",users)
  }
  io.emit("getUser",users)


 

})

socket.on("sendMessage", ({ conversationId, senderId, message, reciverId ,file }) => {
  const iseixstreciver = users.find(user => user.userId === reciverId);
  console.log("receiver found:", iseixstreciver);
  const issenderexist = users.find(user => user.userId === senderId);

  // Emit message to receiver if exists
  if (iseixstreciver) {
    console.log("receiver socketId", iseixstreciver.socketId);
    io.to(iseixstreciver.socketId).emit("getMessage", {
      conversationId,
      senderId,
      message,
      reciverId,
      file
    });
    console.log("data sent to receiver by io");
  }

  // Optionally, emit message to sender as well (if needed)
  if (issenderexist) {
    io.to(issenderexist.socketId).emit("getMessage", {
      conversationId,
      senderId,
      message,
      reciverId,
      file
    });
    console.log("data sent to sender by io");
  }
});


socket.on("disconnect",()=>{

   users = users.filter((users=>users.socketId !== socket.id))
  io.emit("getUser",users)

})

})


// ✅ Connect MongoDB
connectDB();

// ✅ Middlewares
app.use("/uploads", express.static("uploads"));
app.use(cors(


 
));
app.use(json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", jobRoutes);
app.use("/api", profileRoutes);
app.use("/review",reviewroutes)
app.use("/api",Chat)

const PORT = process.env.portnum || 5000;
  server.listen(PORT,()=>console.log('server is started'))