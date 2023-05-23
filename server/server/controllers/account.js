import { Account } from "../schemas/accountSchema.js";
import { FriendList } from "../schemas/friendListSchema.js";
import { RoomChat } from "../schemas/roomChatSchema.js";
import { nanoid } from "nanoid";

// add friend controller function
export async function addFriend(req, res, next) {
  try {
    //initialize
    const room = nanoid(16);
    const { username, friend } = req.body;
    const userAccount = await Account.findOne({ username });
    const friendAccount = await Account.findOne({ username: friend });
    const friendListUser = await FriendList.findOne({
      username: userAccount.username,
    });
    const friendListFriend = await FriendList.findOne({
      username: friendAccount.username,
    });
    //create friend list for both empty friend user
    if (!friendListUser && !friendListFriend) {
      const newRoomChat = new RoomChat();

      newRoomChat.room = room;
      newRoomChat.member.push(userAccount.username);
      newRoomChat.member.push(friendAccount.username);

      const newFriendListUser = new FriendList();

      newFriendListUser.username = userAccount.username;
      newFriendListUser.friends.push(friendAccount.username);
      userAccount.room.push(room);

      const newFriendListFriend = new FriendList();

      newFriendListFriend.username = friendAccount.username;
      newFriendListFriend.friends.push(userAccount.username);
      friendAccount.room.push(room);

      await newRoomChat.save();
      await newFriendListFriend.save();
      await newFriendListUser.save();
      await userAccount.save();
      await friendAccount.save();

      return res.status(200).json({
        msg: "Add friend success",
        data: {
          user: { newFriendListUser, userAccount },
          friend: { newFriendListFriend, friendAccount },
        },
      });
    }
    //create new friend list for friend user
    else if (friendListUser && friendListFriend == null) {
      const newFriendListFriend = new FriendList();
      const newRoomChat = new RoomChat();

      newRoomChat.room = room;
      newRoomChat.member.push(userAccount.username);
      newRoomChat.member.push(friendAccount.username);

      newFriendListFriend.username = friendAccount.username;
      newFriendListFriend.friends.push(userAccount.username);

      friendListUser.friends.push(friendAccount.username);

      userAccount.room.push(room);
      friendAccount.room.push(room);

      await newRoomChat.save();
      await friendListUser.save();
      await newFriendListFriend.save();
      await userAccount.save();
      await friendAccount.save();

      return res.status(200).json({
        msg: "Add friend success",
        data: { user: friendListUser, friend: newFriendListFriend },
      });
    }
    //create new friend list for user
    else if (friendListUser == null && friendListFriend) {
      const newFriendListUser = new FriendList();
      const newRoomChat = new RoomChat();

      newRoomChat.room = room;
      newRoomChat.member.push(userAccount.username);
      newRoomChat.member.push(friendAccount.username);

      newFriendListUser.username = userAccount.username;
      newFriendListUser.friends.push(friendAccount.username);

      friendListFriend.friends.push(userAccount.username);

      userAccount.room.push(room);
      friendAccount.room.push(room);

      await friendListFriend.save();
      await newFriendListUser.save();
      await newRoomChat.save();
      await userAccount.save();
      await friendAccount.save();

      return res.status(200).json({
        msg: "Add friend success",
        data: { user: newFriendListUser, friend: friendListFriend },
      });
    }
    // add friend when both user and friend existed friend lists
    else if (
      !friendListUser.friends.includes(friendAccount.username) &&
      !friendListFriend.friends.includes(userAccount.username)
    ) {
      const newRoomChat = new RoomChat();

      newRoomChat.room = room;
      newRoomChat.member.push(userAccount.username);
      newRoomChat.member.push(friendAccount.username);

      friendListUser.friends.push(friendAccount.username);
      friendListFriend.friends.push(userAccount.username);

      userAccount.room.push(room);
      friendAccount.room.push(room);

      await friendListFriend.save();
      await friendListUser.save();
      await newRoomChat.save();
      await userAccount.save();
      await friendAccount.save();

      return res.status(200).json({
        msg: "Add friend success",
        data: { user: friendListUser, friend: friendListFriend },
      });
    } else {
      return res.status(400).json({
        msg: "Friend is existed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Failed to add account",
    });
  }
}

// get friends of user
export async function getFriends(req, res, next) {
  try {
    const { username } = req.body;
    const userAccount = await Account.findOne({ username });
    const friendList = await FriendList.findOne({
      username: userAccount.username,
    });
    return res.status(200).json({
      msg: "Success",
      friends: friendList.friends,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Failed to fetch data",
    });
  }
}
