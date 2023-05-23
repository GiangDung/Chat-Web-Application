import { Router } from "express";
import { register, login } from "../controllers/authentication.js";
import { addFriend, getFriends } from "../controllers/account.js";
import { getRoomId } from "../controllers/chatLogic.js";
import { getMessages } from "../controllers/chatLogic.js";

const router = Router();

router.post("/addFriend", addFriend);
router.post("/register", register);
router.post("/login", login);
router.post("/getFriendsList", getFriends);
router.post("/getRoomId", getRoomId);
router.post("/getMessages", getMessages);

export default router;
