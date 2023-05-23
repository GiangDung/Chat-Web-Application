import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./routers/index.js";
import sockio from "./controllers/chatLogic.js";
import http from "http";
import cors from "cors";

const PORT = 9000;
const app = express();
const db = mongoose;
const server = http.createServer(app);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());

await db.connect("mongodb://127.0.0.1:27017/mca_app").catch((error) => {
  console.log(error);
});

app.use("/", router);

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

sockio(server);
