import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";

export default function AddFriend() {
  const [friendUsername, setfriendUsername] = useState("");
  const [cookies] = useCookies(["username"]);
  const handleChange = (event: any) => {
    setfriendUsername(event.target.value);
  };

  const addFriend = async (friendUsername: any) => {
    const jsonData = {
      username: cookies.username,
      friend: friendUsername,
    };
    const resData = await axios.post(
      "http://localhost:9000/addFriend",
      jsonData
    );
    if (resData) {
      window.alert("Add friend success");
      return;
    } else {
      window.alert("Add friend failed");
    }
  };
  return (
    <>
      <Grid item lg={9} md={9} sm={9} xs={9}>
        <TextField
          sx={{ backgroundColor: "#83f4bf" }}
          onChange={handleChange}
          margin="normal"
          fullWidth
          id="friendUsername"
          name="friendUsername"
          autoComplete="username"
          label="Add friend"
          onKeyUp={(event) => {
            event.key == "Enter" && addFriend(friendUsername);
          }}
          variant="filled"
        />
      </Grid>
      <Grid item lg={1.5} md={1.5} sm={1.5} xs={1.5}>
        <Button
          sx={{
            width: "100%",
            marginTop: "18px",
            height: "52px",
            color: "#f0f0f0",
          }}
          onClick={() => addFriend(friendUsername)}
          variant="contained"
        >
          {/* <IconButton sx={{ color: "#f0f0f0" }}>
            <PersonAddIcon />
          </IconButton> */}
          Add Friend
        </Button>
      </Grid>
    </>
  );
}
