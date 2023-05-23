import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useAuth } from "../../hooks/AuthHooks";
import { SignInData } from "../../contexts/AuthGuard";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import getFriendsList from "../DisplayUser/userData";

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["username", "password"]);
  const cookiesSignIn = async () => {
    const signInData = {
      username: cookies.username,
      password: cookies.password,
    } as SignInData;
    await signIn(signInData);
  };

  cookiesSignIn();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setCookies("username", data.get("username"), {
      path: "/",
    });
    setCookies("password", data.get("password"), {
      path: "/",
    });
    const signInData = {
      username: data.get("username"),
      password: data.get("password"),
    } as SignInData;
    await signIn(signInData);
  };

  function SignUp() {
    navigate("/signup");
  }

  return (
    <>
      <Box
        sx={{
          paddingTop: "70px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#c7b8f6",
          border: "2px solid black",
          width: "30%",
          margin: "auto",
          borderRadius: " 50px",
          padding: "150px 30px 150px 30px",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          marginBottom="100px"
          align="center"
        >
          Welcome To Multiple Chat Application
        </Typography>
        <LoginOutlinedIcon />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={SignUp}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
