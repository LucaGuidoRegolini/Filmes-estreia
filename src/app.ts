require("dotenv").config();
import "express-async-errors";
import express from "express";
import { errors } from "celebrate";
import cors from "cors";

import router from "./routers";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errors());

export default app;
