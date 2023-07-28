import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//api

import adminRouter from "./src/router/AdminRouter.js";
import categoryRouter from "./src/router/CategoryRouter.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/category", categoryRouter);

import morgan from "morgan";
import cors from "cors";
import { mongoConnect } from "./src/config/mongoConfig.js";
mongoConnect();

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server is live",
  });
});

app.use((error, req, res, next) => {
  res.json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});
