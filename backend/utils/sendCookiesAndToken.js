import jwt from 'jsonwebtoken'
const signToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
};


export const sendCookiesAndToken = async (user,res) =>{
    console.log("--------user-----------")
    console.log(user);
    if(!user._id) throw new Error("Something went wrong!");
    const token = signToken(user._id);
    // storing the token in cookie with the name 'jwt'
    console.log(token);
    await res.cookie("jwt",token,{
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        // sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        sameSite : "none",
        // secure : false // development
        secure: true   // prod
    });
}
