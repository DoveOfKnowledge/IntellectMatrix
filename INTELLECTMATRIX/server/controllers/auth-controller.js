// Controllers Handels the application logic.
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// Home logic
const home = async (req, res) => {
    try{
        res.status(200).send('Welcome To Home Page');

    }catch(error){
        console.log(error)
    }
};


//Register Logic
const register = async(req , res) => {
    try{
        console.log(req.body);
        const {username , email , password} = req.body;


        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({message:"Email Already Exists"});
        }

        //hash the password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({
            username , 
            email , 
            password,
        });


        res.status(201).json({
            msg : "Registration successful", 
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString(),
        });
    }catch(error){
        res.status(500).json("internal server error")
    }       
};


// user login logic

const login = async (req, res) => {
    try{
        const {email , password} = req.body;
        const userExist = await User.findOne({email});
        console.log(userExist);

        if(!userExist){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        //const user = await bcrypt.compare(password, userExist.password);
        
        const user = await userExist.comparePassword(password);
        


        if(user){
            res.status(200).json({
                msg : "Login successful", 
                token: await userExist.generateToken(), 
                userId: userExist._id.toString(),
            }); 
        }else{
            res.status(401).json({message:"Invalid email or password"});
        }

    }catch(error){
        res.status(500).json("internal server error");
    }
};



//to send user data - user logic

const user = async (req, res) => {
    try{
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});
    }catch(error){
        console.log(`error from user route ${error}`);
    }
};

module.exports = {home, register, login, user};