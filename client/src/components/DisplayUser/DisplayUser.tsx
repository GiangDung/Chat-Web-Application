import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./userData";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useCookies } from "react-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import axios from "axios";
import getFriendsList from "./userData";
export let currentUser: String = "";
export let messageListArray: any;
import { useRoomContext } from "../../contexts/RoomContext";
import { LeftMessage, RightMessage } from "../MessageBox/DisplayMessage";

import { useEffect, useState } from "react";
interface message {
  author: String;
  message: String;
  timeStamp: String;
  room: String;
  messId: String;
}
getFriendsList();

export default function DisplayUser(props: any) {
  const RoomContext: any = useRoomContext();
  const [cookies, setCookies, removeCookies] = useCookies([
    "username",
    "password",
  ]);
  // useEffect(() => {
  //   if (RoomContext.roomData) {
  //     const getMess = () =>
  //       axios
  //         .post("http://localhost:9000/getMessages", {
  //           room: RoomContext.roomData,
  //         })
  //         .then((res) => {
  //           RoomContext.setMessageHistory(res.data);
  //         });
  //     getMess();
  //   }
  // }, [RoomContext.roomData]);

  let usernameCookies = cookies.username;
  const navigate = useNavigate();
  const drawerWidth = "10%";

  const Logout = () => {
    navigate("/signin");
    removeCookies("username");
    removeCookies("password");
  };
  const displayHistory = (messageHistory: any) => {
    const messageList: any = [];
    messageHistory.map((message: message) => {
      message.author === RoomContext.cookies.username
        ? messageList.push([
            <RightMessage
              message={message.message}
              time={message.timeStamp}
              author={message.author}
              key={message.messId}
            />,
          ])
        : messageList.push([
            <LeftMessage
              message={message.message}
              time={message.timeStamp}
              author={message.author}
              key={message.messId}
            />,
          ]);
    });
    RoomContext.setMessageHistory(messageList);
    console.log(messageHistory);
  };
  const sendUsernameRoom = async (
    usernameSender: String,
    usernameReceiver: String
  ) => {
    RoomContext.setMessageHistory([]);
    RoomContext.setMessageList([]);
    const userData = {
      username: usernameSender,
      friend: usernameReceiver,
    };
    const roomRes = await axios.post(
      "http://localhost:9000/getRoomId",
      userData
    );
    const { data } = roomRes;
    roomRes && RoomContext.setRoomData(data.room);
    // console.log("display user: " + RoomContext.roomData);
    axios
      .post("http://localhost:9000/getMessages", {
        room: data.room,
      })
      .then((res) => {
        displayHistory(res.data);
      });

    props.socket.emit("room", data.room);
  };

  return (
    <>
      <Grid item lg={1.3} md={1.3} sm={1.3} xs={1.3}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              // width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#8394f5",
              color: "#2c2c2c",
            },
          }}
        >
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={Logout}>
                  <ListItemIcon sx={{ color: "#2c2c2c" }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "#2c2c2c" }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={cookies.username} />
                </ListItemButton>
              </ListItem>
              <hr />
              {mainNavbarItems.map((item, index) => (
                <ListItem
                  onClick={() => {
                    sendUsernameRoom(item.label, usernameCookies);
                  }}
                  key={index}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemIcon sx={{ color: "#2c2c2c" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Grid>
    </>
  );
}
