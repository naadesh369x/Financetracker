import express from "express";
import mongoose from "mongoose";
import expenseRouter from "./routers/expenseRouter.js"; // make sure path is correct
import userRouter from "./routers/userRouter.js";

const app = express();

// middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// MongoDB URL
const mongodbURI =
  "mongodb+srv://gona:12345678m@cluster0.eqnilse.mongodb.net/expensesDB?appName=Cluster0";

// MongoDB connect
mongoose
  .connect(mongodbURI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// routes
app.use("/expenses", expenseRouter);
app.use("/users", userRouter);

// server start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
