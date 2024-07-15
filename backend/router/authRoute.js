import { Router } from 'express';
export const router = Router();
import passport from "passport";
import '../controller/authController.js';
router.get("/google", passport.authenticate('google',{
    scope: ['https://www.googleapis.com/auth/plus.login']
}));
router.get("/google/callback", passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
}));
