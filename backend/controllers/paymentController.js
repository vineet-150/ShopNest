const Razorpay = require("razorpay");
const crypto =require("crypto");
dotenv=require("dotenv").config();


const createOrder= async(req,res)=>{
    try {
        const amount = Number(req.body.amount);

        if (!Number.isFinite(amount) || amount <= 0) {
            return res.status(400).json({message: "A valid payment amount is required"});
        }

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({message: "Razorpay keys are not configured on the server"});
        }

        const instance=new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET,
        });

        const options={
            amount:Math.round(amount * 100), // amount in paise
            currency:"INR",
            receipt:crypto.randomBytes(10).toString("hex")

        };

        const order=await instance.orders.create(options);
        res.status(200).json({...order, key: process.env.RAZORPAY_KEY_ID});


        
    } catch (error) {
        res.status(500).json({message:"Server Error"});

    }
};

const verifyPayment=async(req,res)=>{
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
        const generated_signature=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id+"|"+razorpay_payment_id).digest("hex");
        if(generated_signature===razorpay_signature){
            res.status(200).json({message:"Payemnt verified successfully"});
        }
        else{
            res.status(400).json({message:"Payment verification falied"});
        }   
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
};

module.exports ={createOrder,verifyPayment};


