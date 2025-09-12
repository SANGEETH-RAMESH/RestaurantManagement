import express, { Request, Response } from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import userroute from "./route/userRoute";



dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error:", err));


console.log(process.env.FRONTEND_URL,'Url')
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'refresh-token'],
    credentials: true,
}));

app.use(express.json());

app.use(session({
    secret: process.env.SECRET_KEY || 'defaultSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));


app.use('/api/user',userroute);

app.get('/api/test',(req,res)=>{
  res.send("HEyyy")
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
