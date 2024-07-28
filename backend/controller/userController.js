import {User} from '../model/userModel.js';
import passport from 'passport';
import {sendCookiesAndToken} from "../utils/sendCookiesAndToken.js";
import jwt from 'jsonwebtoken';
/*
* Quick Note regarding auth system with Passport Js
* you can get every information what ever you have entered into the cb(null,user)
* from "req.user" from that route where you are redirect after the success from google auth
* */
export const handleSuccessLogin = async (req,res) => {
    try{
        await sendCookiesAndToken(req.user,res);
        // res.send(req.user); // contains what you have submitted to cb(null,user) ---> passportJs
        
        res.redirect(process.env.CLIENT_URL);
    }catch(err){
      res.redirect(process.env.CLIENT_URL+'login');
    }
}

export const handleFailedLogin = async (req,res) => {
    res.status(400).json({
        status:'failed',
        err:"Authenication Failed"
    });
}

export const getUser = async (req,res) => {
    try{
        if(!req.user){
            throw new Error("not logined");
        }

        const data = await User.findById(req.user)
            .populate('joinedGroup')
            .populate('groupOwner');

        res.status(200).json({
            status:"success",
            data:data
        });

    }catch(err){
        res.status(400).json({
            status:"error",
            err:err.message
        })
    }
}

export const getOtherProfile = async (req,res) => {
    try{
        if(!req.user){
            throw new Error("You are not Logined In");
        }
        const loginedUser = await User.findById(req.user);
        // need to add more
        // we need to populate here for fetching his own group id (creator) not the group
        // he has joined
        // show them if your and his group is similar
        // something like in getUser tooooo!!!!!!!!!!!!!
        const user = await User.findById(req.params.userId).populate('joinedGroup');
        if(!user){
            throw new Error("No data in database");
        }

        res.status(200).json({
            status:"success",
            data:user
        });
    }catch(err) {
        res.status(400).json({
            status:"failed",
            err:err.message
        });
    }
}

export const logout = async (req,res) => {
    try{
        res.clearCookie('jwt');
        req.logout();
    }catch(err){

    }
}

export const isAuthenticated = async (req,res,next) =>{
    try{
        let token;
        if(req.cookies.jwt){
            token = req.cookies.jwt;
        }
        if(!token){
            throw new Error("OOPs, Firstly you have to logined in !!");
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const currentloginedUser = await User.findById(decode.id);
        req.user = currentloginedUser;
        next();

    }catch(err){
        res.status(404).json({
            status:"Failed",
            err: err.message
        })
    }
}