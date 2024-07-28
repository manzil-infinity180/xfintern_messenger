import { Router } from 'express';
import {isAuthenticated} from "../controller/userController.js";
import {createGroup, joinedGroup, getGroup, getAllGroups, addNewMessage, updateMessage, deleteContent} from "../controller/groupController.js";
export const router = Router();

router.use(isAuthenticated);
router.get('/:groupId', getGroup);
router.post('/create', createGroup);
router.get('/join/:groupId', joinedGroup);
router.get('/v1/all', getAllGroups);
router.post('/add/message/:groupId', addNewMessage);
router.post('/update/message/:groupId', updateMessage);
router.delete('/delete/message/:groupId', deleteContent);