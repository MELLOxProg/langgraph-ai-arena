import dotenv from "dotenv";

dotenv.config();



const config = {
    PORT: Number(process.env.PORT || 3000),
    MONGO_URI: process.env.MONGO_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "change-me-in-development",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
    SERVER_URL: process.env.SERVER_URL || "http://localhost:3000",
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || `${process.env.SERVER_URL || "http://localhost:3000"}/api/auth/google/callback`,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
    TAVILY_API_KEY: process.env.TAVILY_API_KEY || "",
    REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
    REDIS_PORT: Number(process.env.REDIS_PORT || 6379),
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,
}


export default config;