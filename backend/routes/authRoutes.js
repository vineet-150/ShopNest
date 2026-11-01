const express = require("express");
const router=express.Router();
const {registerUser,loginUser,getUsers}=require("../controllers/authController.js");
const {protect}=require("../middleware/authMiddleware.js");
const {admin}= require("../middleware/adminMiddleware.js");





// router.post("/register",registerUser)
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/user").get(protect,admin,getUsers);// only admin can see the all products





module.exports=router;
