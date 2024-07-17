import { Router } from 'express';
import {savedChatMessage, getChatMessage} from "../controller/chatController.js";
import {getOtherProfile, getUser, handleSuccessLogin, isAuthenticated} from "../controller/userController.js";
export const router = Router();

router.post("/chat", savedChatMessage);
router.get('/chat/:roomId', getChatMessage);
router.get("/login/success", handleSuccessLogin);
router.use(isAuthenticated);
router.get('/user', getUser);
router.get('/user/:userId', getOtherProfile);
