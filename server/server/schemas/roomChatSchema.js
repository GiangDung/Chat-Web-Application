import mongoose from "mongoose";
const { Schema } = mongoose;
const roomsChatSchema = new Schema({
  room: { type: String },
  member: { type: Array },
});
export const RoomChat = mongoose.model("roomchat", roomsChatSchema);
