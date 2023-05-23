import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
  room: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
    required: true,
  },
  messId: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Message = mongoose.model("messages", messageSchema);
