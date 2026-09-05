import express from "express";
import runGraph from "./ai/graph.ai.js";
const app = express();

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


export default app;