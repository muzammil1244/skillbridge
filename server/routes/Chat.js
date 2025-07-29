import { Router } from "express";
import { ConverSationList, Messages, StoreSenderAndReciver,MessagesList } from "../controllers/chat.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { uploadMessage } from "../upload.js";

const route = Router()

route.post("/conversation",authenticateToken, StoreSenderAndReciver)
route.get("/conversation/list/:userId",authenticateToken, ConverSationList)
route.post("/message",authenticateToken,uploadMessage.single("file"),Messages)
route.get("/message/:conversationId",authenticateToken,MessagesList)
export default route;