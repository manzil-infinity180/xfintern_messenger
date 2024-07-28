import { Router } from 'express';
import {isAuthenticated} from "../controller/userController.js";
import {createGroup, joinedGroup, getGroup, getAllGroups, addNewMessage} from "../controller/groupController.js";
export const router = Router();

router.use(isAuthenticated);
router.get('/:groupId', getGroup);
router.post('/create', createGroup);
router.get('/join/:groupId', joinedGroup);
router.get('/v1/all', getAllGroups);
router.post('/post/message/:groupId', addNewMessage);