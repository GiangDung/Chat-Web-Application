import { Server } from "socket.io";
import { Account } from "../schemas/accountSchema.js";
import { RoomChat } from "../schemas/roomChatSchema.js";
import { Message } from "../schemas/messageSchema.js";
import { nanoid } from "nanoid";

export async function getRoomId(req, res) {
  try {
    const { username, friend } = req.body;
    const usernameAccount = await Account.findOne({ username });
    const friendAccount = await Account.findOne({ username: friend });

    const toRoom = [usernameAccount.username, friendAccount.username];
    const fromRoom = [friendAccount.username, usernameAccount.username];
    const roomChatUser = (await RoomChat.findOne({ member: toRoom }))
      ? await RoomChat.findOne({ member: toRoom })
      : await RoomChat.findOne({ member: fromRoom });
    const roomChatFriend = (await RoomChat.findOne({ member: toRoom }))
      ? await RoomChat.findOne({ member: toRoom })
      : await RoomChat.findOne({ member: fromRoom });

    if (roomChatUser || roomChatFriend) {
      return res.status(200).json({ room: roomChatUser.room });
    } else {
      return res.status(404).json({ msg: "not found" });
    }
  } catch (error) {
    return res.status(400).json({ msg: "server error" });
  }
}

export async function getMessages(req, res) {
  try {
    const { room } = req.body;
    const messages = await Message.find({ room });
    if (messages.length !== 0) {
      return res.status(200).json(messages);
    } else {
      return res.status(404).json({ msg: "cannot found messages" });
    }
  } catch (error) {
    return res.status(400).json({ msg: "server error" });
  }
}

export default async function sockio(server) {
  const io = new Server(server, { cors: { origin: "http://localhost:3000" } });
  io.on("connection", (socket) => {
    socket.on("room", (room) => {
      socket.join(room);
      socket.on("from-message", async (data) => {
        const messId = nanoid(8);
        const newMessage = new Message();
        newMessage.room = data.room;
        newMessage.author = data.author;
        newMessage.message = data.message;
        newMessage.timeStamp = data.timeStamp;
        newMessage.messId = messId;
        await newMessage.save();
        socket.to(room).emit("to-message", data);
      });
    });
  });
}
