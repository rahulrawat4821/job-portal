import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config({});
const app = express();


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http//localhost:5173',
    Credentials:true
}
app.use(cors(corsOptions));


const PORT  = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on PORT: ${PORT}`);
})