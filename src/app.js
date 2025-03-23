import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PORT } from "./helpers/constants.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
