import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, default: "New Arena Match", trim: true },
  },
  { timestamps: true },
);

export default mongoose.model("Chat", chatSchema);
