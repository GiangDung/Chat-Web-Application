import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema({
  name: {
    type:String, 
    require: true
  },
  username: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  room: {
    type: Array,
    require: false,
  },
});
export const Account = mongoose.model("accounts", accountSchema);
