import { Router } from 'express';
import {savedChatMessage, getChatMessage} from "../controller/chatController.js";
export const router = Router();

router.post("/chat", savedChatMessage);
router.get('/chat/:roomId', getChatMessage);