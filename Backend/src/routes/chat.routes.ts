import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { deleteChat, getChats, getMessages, sendMessage } from "../controllers/chat.controller.js";

const router = Router();
router.use(authUser);
router.get("/", getChats);
router.post("/message", sendMessage);
router.get("/:chatId/messages", getMessages);
router.delete("/:chatId", deleteChat);

export default router;