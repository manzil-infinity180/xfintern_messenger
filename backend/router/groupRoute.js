import { Router } from 'express';
import {isAuthenticated} from "../controller/userController.js";
import {createGroup, joinedGroup, getGroup} from "../controller/groupController.js";
export const router = Router();

router.use(isAuthenticated);
router.get('/:groupId', getGroup);
router.post('/create', createGroup);
router.get('/join/:groupId', joinedGroup);