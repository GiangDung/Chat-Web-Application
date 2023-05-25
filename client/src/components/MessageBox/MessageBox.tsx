import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { LeftMessage, RightMessage } from "./DisplayMessage";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRoomContext } from "../../contexts/RoomContext";
import { nanoid } from "nanoid";
//create array to store value
interface message {
  author: String;
  message: String;
  timeStamp: String;
  room: String;
}

export default function MessageBox(props: any) {
  const RoomContext: any = useRoomContext();
  const [message, setMessage] = useState("");

  const handleChangeMessage = (event: any) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    const messId = nanoid(8);
    const data = {
      room: RoomContext.roomData,
      author: RoomContext.cookies.username,
      // room: roomData.data.roomId,
      timeStamp:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      message: message,
      messId: messId,
    };
    RoomContext.setMessageList([
      ...RoomContext.messageList,
      <RightMessage
        message={data.message}
        time={data.timeStamp}
        author={data.author}
        key={messId}
      />,
    ]);
    props.socket.emit("from-message", data);
    setMessage("");
  };

  useEffect(() => {
    const receiveMessage = async () => {
      props.socket.on("to-message", (data: any) => {
        const messId = nanoid(8);
        RoomContext.setMessageList([
          ...RoomContext.messageList,
          <LeftMessage
            message={data.message}
            time={data.timeStamp}
            author={data.author}
            key={messId}
          />,
        ]);
      });
    };
    receiveMessage();
  }, [RoomContext.messageList]);

  return (
    <React.Fragment>
      <Grid item lg={1.3} md={2} sm={1.3} xs={1.3}></Grid>
      <Grid item lg={10.5} md={10} sm={10.5} xs={10.5}>
        <Box sx={{ bgcolor: "#edfcc5", height: "100%" }}>
          <Stack>
            <Box
              sx={{
                border: "2px solid #3C486B",
                bgcolor: "#ede4f6",
                height: "650px",
                overflow: "hidden",
                overflowY: "scroll",
              }}
            >
              {RoomContext.messageHistory.map((message: message) => message)}
              {RoomContext.messageList.map((message: message) => message)}
            </Box>
            <>
              <Typography>
                Current joined room: {RoomContext.roomData}
              </Typography>
              <TextField
                sx={{
                  width: "100%",
                  marginTop: "30px",
                  backgroundColor: "#83f4bf",
                }}
                id="message-input"
                label="Message"
                variant="filled"
                value={message}
                onKeyUp={(event) => {
                  event.key == "Enter" && sendMessage();
                }}
                onChange={handleChangeMessage}
              />

              <Button
                sx={{
                  height: "50px",
                  marginTop: "10px",
                }}
                variant="contained"
                onClick={sendMessage}
              >
                Send
              </Button>
            </>
          </Stack>
        </Box>
      </Grid>
    </React.Fragment>
  );
}
