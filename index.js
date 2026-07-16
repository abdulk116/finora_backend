import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./src/config/dataBase.js";
import authRoutes from "./src/routes/auth.routes.js";
import errorHandler from "./src/middleware/error.middleware.js";
import loanRoutes from "./src/routes/loan.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";


const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "*",
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Finora API 🚀",
  });
});

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/payments", paymentRoutes);

// error handler
app.use(errorHandler);

await connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;