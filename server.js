import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const __dirname = path.resolve();

console.log(__dirname);

//converting public folder to static serving folder

app.use(express.static(path.join(__dirname + "/public")));

//api

import adminRouter from "./src/router/AdminRouter.js";
import categoryRouter from "./src/router/CategoryRouter.js";
import paymentRouter from "./src/router/PaymentRouter.js";
import productRouter from "./src/router/ProductRouter.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/category", auth, categoryRouter);
app.use("/api/v1/payment", auth, paymentRouter);
app.use("/api/v1/product", auth, productRouter);

import morgan from "morgan";
import cors from "cors";
import { mongoConnect } from "./src/config/mongoConfig.js";
import { auth } from "./src/middleware/authMiddleware.js";
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
