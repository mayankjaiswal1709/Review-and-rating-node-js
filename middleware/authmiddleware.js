const jwt=require("jsonwebtoken");
require('dotenv').config()

const checkUserAuth=async(req,res,next)=>{
    let token;
    const { authorization } = req.headers;
    console.log(authorization);
    if(authorization&&authorization.startsWith("Bearer")){
        try{
            token = authorization.split(" ")[1];
            console.log("Token",token);
            console.log("Authorization", authorization);
            jwt.verify(token, process.env.JWT);
            next();
        }
        catch(error){
            res.status(500).json({
            status:"failed",message:"unauthorized user NO token" + error.stack
            })
        }
    }else{
    res.status(500).json({
        message : "Token not found"
    })
    }
};

module.exports= { checkUserAuth } ;