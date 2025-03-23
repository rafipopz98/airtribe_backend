import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PORT, DB_URL } from "./helpers/constants.js";
import mongoose from "mongoose";

const app = express();

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(bodyParser.json());

import userRoutes from  "./API/user.js"
import conversationRoutes from "./API/configuration.js"


// DB Connect:
mongoose.connect(DB_URL)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use("/user", userRoutes)
app.use("/conversations", conversationRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
