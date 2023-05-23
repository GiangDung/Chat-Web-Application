import mongoose from "mongoose";
const { Schema } = mongoose;

const friendListSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
  },
});

export const FriendList = mongoose.model("friendList", friendListSchema);
