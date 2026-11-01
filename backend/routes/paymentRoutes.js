const express = require("express");

const router=express.Router();

const {createOrder,verifyPayment}=require("../controllers/paymentController.js");

const {protect}=require("../middleware/authMiddleware.js");



router.post("/order",protect,createOrder);
router.post("/verify",verifyPayment);

module.exports=router;
