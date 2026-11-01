const User= require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/sendEmail");
const generatetoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
};


        
              
// Register a new user
const registerUser= async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        //TODOS: Hash the password before saving to the batabase,
        //ToDOS: Implement JWT token generation for authentication
        //ToDOS: OPT sending and verfication for email confiramation
        //TODOS: WELECOME MAIL
        const salt =await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);  
        const user=await User.create({name,email,password:hashedPassword});
        if(user){

            const otp=Math.floor(100000+Math.random()*900000).toString();
            const message=`Welcome to ShopNest, ${name}! Thank you for registration with us. we are excited to have you as part of our community.To complete your registartion, please use the following One-Time Password(OTP): Your OTP for shopNest registration is: ${otp}`;

            await sendEmail(email,'Welcome to ShopNest- Your OTP for Registartion', message);

            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generatetoken(user._id)
            });

        }
        else{
            res.status(400).json({message:"Invalid user data"});
        }
        

    } catch (error) {
        res.status(500).json({message:'Server error'});

    }
};


//Login user
const loginUser = async(req,res)=>{
    const {email,password}= req.body;
    try {
       const user= await User.findOne({email});
       if(user&& (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generatetoken(user._id)
        });
       }
       else{
        res.status(400).json({
            message:"Invalid email and password"
        });
       }
    
    } 
    catch (error) {
        res.status(500).json({message:"Server error"});
    }
};


const getUsers= async(req,res)=>{
    try {

        const users = await User.find({}).select('-password');
        res.json(users);

        
    } catch (error) {
        res.status(500).json({message:'server error'})
        
    }
};
module.exports={
    registerUser,loginUser,getUsers
}

































