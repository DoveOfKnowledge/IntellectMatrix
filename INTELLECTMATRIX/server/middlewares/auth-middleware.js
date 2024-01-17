const jwt = require('jsonwebtoken');
const User = require("../models/user-model");

const authMiddleware = async(req, res, next) => {
    const token = req.header('Authorization');

//if you attempt to use expired token, you will receive 401 unauthorized http response
    if(!token){
        return res.status(401).json({message: "Unauthorized HTTP, Token not provided"});
    }

    //assuming token is in the format Bearer <jwtToken>, Removing the Bearer prefix
    const jwtToken = token.replace('Bearer',"").trim();
    console.log("token from auth middleware", jwtToken);

    try{

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY );
  
        const userData = await User.findOne({email:isVerified.email}).
        select({
            password: 0,
        });
        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        next();
    }catch(erro){
        return res.status(401).json({message: "Unauthorized HTTP, Token not provided"});
    }
   
};

module.exports = authMiddleware;