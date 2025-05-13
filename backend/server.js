import express from "express";
import { DBconnect } from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//Routes
import authRoutes from "./routes/authRoutes.js";
import diaryRoutes from "./routes/diaryRoutes.js";

app.use("/api/auth",authRoutes);
app.use("/api/diary",diaryRoutes);


DBconnect();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  
