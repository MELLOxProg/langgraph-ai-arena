import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import { authUser } from "./middlewares/auth.middleware.js";
import { sendMessage } from "./controllers/chat.controller.js";

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
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);

app.post("/invoke", async(req, res) => {
  req.body.message = req.body.input;
  req.body.chat = req.body.chatId;
  return authUser(req, res, () => sendMessage(req, res));
});


export default app;