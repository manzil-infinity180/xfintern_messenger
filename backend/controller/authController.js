import { config } from 'dotenv';
config({path: './config.env'});
import passport from "passport";
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import {User} from '../model/userModel.js';
console.log(process.env.GOOGLE_CLIENT_ID)
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
               console.log(option);
               const userData = {
                   providerId: profile.id,
                   name: profile.displayName,
                   provider: profile.provider,
                   picture : profile._json.picture
               };
               console.log(userData);
               const alreadyExistedUser = await User.findOne({
                   "provider": userData.provider, "providerId": userData.provider});
               console.log("already");
               console.log(alreadyExistedUser);
               if(alreadyExistedUser){
                   return cb(null, alreadyExistedUser);
               }else{
                   console.log("iam here");
                   const user = new User({
                       providerId: profile.id,
                       name: profile.displayName,
                       provider: profile.provider,
                       picture : profile._json.picture
                   });
                   console.log(user);
                   const newUser = await user.save();
                   console.log(newUser);
                   if(newUser){

                   return cb(null, user);
                   }
               }
    }
));

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