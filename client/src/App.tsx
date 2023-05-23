import Grid from "@mui/material/Grid";
import { Outlet } from "react-router";
import AddFriend from "./components/AddFriend/AddFriend";
import DisplayUser from "./components/DisplayUser/DisplayUser";
import Box from "@mui/material/Box";
import MessageBox from "./components/MessageBox/MessageBox";
import { Container } from "@mui/material";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { socket } from "./main";
import { RoomContextProvider } from "./contexts/RoomContext";

function App() {
  return (
    <>
      <RoomContextProvider>
        <Grid container spacing={2}>
          <DisplayUser socket={socket} />
          <Outlet />
          <AddFriend />
          <MessageBox socket={socket} />
        </Grid>
      </RoomContextProvider>
    </>
  );
}

export default App;
