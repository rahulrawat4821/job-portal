// server.js
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

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portal-gj9j.netlify.app"
];

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight OPTIONS handler for all routes
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(","));
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200);
  }
  next();
});

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Connect to DB and start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on PORT: ${PORT}`);
});
