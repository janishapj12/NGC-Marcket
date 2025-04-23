import express from "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectdb from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import pproductroute from './routes/pproductroute.js'
const app = express();
const PORT = process.env.PORT || 1000
connectdb()

app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  }));
app.options("*" ,cors())
app.use(cookieParser());
app.use(express.json());
app.get("/" , (req,res) => res.send("hello"))
app.use("/api/user" , userRouter)
app.use("/api/product" , pproductroute)


app.listen(PORT,() => console.log("server runing " , PORT))

