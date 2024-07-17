import { Router } from 'express';
export const router = Router();
import passport from "passport";
import '../controller/authController.js';
import {userAuthentication} from "../controller/authController.js";
const client_url = 'http://localhost:5173/';
router.get("/google", passport.authenticate('google',{
    scope: ['https://www.googleapis.com/auth/plus.login']
}));
router.get("/google/callback", passport.authenticate('google',{
        successReturnToOrRedirect: '/login/success',
        failureRedirect: '/login/fail',
}));
