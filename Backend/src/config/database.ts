import mongoose from "mongoose";
import config from "./config.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

export async function connectToDatabase() {
  if (!config.MONGO_URI) {
    throw new Error("MONGO_URI is required to start the server");
  }

  await mongoose.connect(config.MONGO_URI);
  console.log("Connected to MongoDB");
}