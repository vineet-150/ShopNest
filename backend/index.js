const express= require("express");
const path = require("path");
const cors=require("cors");
const dotenv = require("dotenv");
const connectDB=require("./config/db");
const authroute=require("./routes/authRoutes");
const productroute=require("./routes/productsRoutes");
const orderroute=require("./routes/orderRoutes");
const analyticsroutes= require("./routes/analyticsRoute");
const paymentroute=require("./routes/paymentRoutes");

dotenv.config();
// connectDB();





const app= express();
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        process.env.FRONTEND_URL
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get("/",(req,res)=>{
    res.send("shopNest backend is working properly");
});

app.use("/api/auth",authroute);
app.use("/api/products",productroute);
app.use("/api/orders",orderroute);
app.use("/api/payment",paymentroute);
// Keep the old path working for anyone using an older frontend build.
app.use("/api/paymnet",paymentroute);
app.use("/api/analystics",analyticsroutes);



// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on Port ${PORT}`);

    connectDB()
        .then(() => console.log("MongoDB Connected successfully"))
        .catch((error) => {
            console.error("MongoDB connection failed:", error.message);
        });
});