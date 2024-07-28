import { config } from 'dotenv';
config({path: './config.env'});
import passport from "passport";
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import {User} from '../model/userModel.js';
import {sendCookiesAndToken} from "../utils/sendCookiesAndToken.js";
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
},
    async function verify(accessToken, refreshToken, profile, cb) {
               const option={
                   accessToken,
                   refreshToken,
                   profile
               };
               const userData = {
                   providerId: profile.id,
                   name: profile.displayName,
                   provider: profile.provider,
                   picture : profile._json.picture
               };
               const alreadyExistedUser = await User.findOne({
                   "provider": userData.provider, "providerId": userData.providerId});
               if(alreadyExistedUser){
                   return cb(null, alreadyExistedUser);
               }else{
                   const user = new User({
                       providerId: profile.id,
                       name: profile.displayName,
                       provider: profile.provider,
                       picture : profile._json.picture
                   });
                   const newUser = await user.save();
                   if(newUser){
                   return cb(null, user);
                   }
               }
    }
));
export var currentLoginedUser;
passport.serializeUser(function(user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

// not Using this middleware will look later if we want
// try to use it as middleware using - app/router.use() in that way
export const userAuthentication =  async (req,res,next) => {
    passport.authenticate('google',  async function (err,info, user) {
        if(err || !user) {
            res.redirect(
                process.env.CLIENT_URL + "/login?error="
            );
        }
        const lookIntoDatabase = await User.findOne(user._id);
        if(!lookIntoDatabase){
            res.redirect(
                process.env.CLIENT_URL + "/login?error="
            );
        }


        // res.redirect(
        //     process.env.CLIENT_URL
        // );
    });
    await sendCookiesAndToken(currentLoginedUser,res);
    next();
}


