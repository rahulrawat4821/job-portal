import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. CORS FIRST (Always before other middlewares and routes)
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portal-gj9j.netlify.app"
];

// app.use(cors({
//   origin:[
//     "http://localhost:5173",
//     "https://job-portal-gj9j.netlify.app"
//   ],
//   credentials: true
// }));

//fix cors
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url );
  next();
});






// 2. OTHER MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3. ROUTES
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// 4. DB CONNECTION
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
});