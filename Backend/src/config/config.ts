import dotenv from "dotenv";

dotenv.config();



const config = {
    PORT: Number(process.env.PORT || 3000),
    MONGO_URI: process.env.MONGO_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "change-me-in-development",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
    SERVER_URL: process.env.SERVER_URL || "http://localhost:3000",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
}


export default config;