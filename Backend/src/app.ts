import express from "express";
import cors from "cors";
import runGraph from "./ai/graph.ai.js";

const app = express();

const allowedOrigins = (process.env.FRONTEND_ORIGINS ||
  "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://127.0.0.1:5173,http://127.0.0.1:5174,http://127.0.0.1:5175")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin is not allowed by CORS policy"));
  },
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());

app.get("/", async(req, res) => {
  const result = await runGraph(`You are given an array of integers and a target integer.

Write a JavaScript function that returns the indices of two numbers whose sum equals the target.

Requirements:
- Return the indices of the two numbers.
- You may not use the same array element twice.
- Aim for better than O(n²) time complexity.
- Handle edge cases appropriately.

Also provide Jest test cases and briefly explain the time and space complexity.`)
  res.json(result)
});


app.post("/invoke", async(req, res) => {
const {input} = req.body;
const result = await runGraph(input);
res.status(200).json({
  message:"Graph invoked successfully",
  success: true,
  data: result
});
});


export default app;