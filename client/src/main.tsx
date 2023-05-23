import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/Authentication/SignIn";
import AuthGuard from "./contexts/AuthGuard";
import Register from "./components/Authentication/SignUp";
import { io } from "socket.io-client";
import { VideoCall } from "@mui/icons-material";

const URL = "http://localhost:9000";
export const socket = io(URL);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthGuard>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<Register />} />
      </Routes>
    </AuthGuard>
  </BrowserRouter>
);
