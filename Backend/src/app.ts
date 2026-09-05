import express from "express";
import runGraph from "./ai/graph.ai.js";
const app = express();

app.get("/", async(req, res) => {
  const result = await runGraph("Write code for factorial function in js along with test cases")
  res.json(result)
});


export default app;