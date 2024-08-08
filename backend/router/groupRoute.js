import { Router } from 'express';
import {isAuthenticated} from "../controller/userController.js";
import {createGroup, joinedGroup, getGroup, getAllGroups, addNewMessage, updateMessage, deleteContent, getAllContent, checkMessageOwner} from "../controller/groupController.js";
export const router = Router();

router.use(isAuthenticated);
router.get('/:groupId', getGroup);
router.post('/create', createGroup);
router.get('/join/:groupId', joinedGroup);
router.get('/v1/all', getAllGroups);
router.post('/add/message/:groupId', addNewMessage);
router.patch('/update/message/:groupId', updateMessage);
router.post('/check/message/:groupId', checkMessageOwner);
router.delete('/delete/message/:groupId', deleteContent);
router.get('/allmessage/:groupId', getAllContent);