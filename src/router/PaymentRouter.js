import express from "express";
import {
  getPayment,
  updatePaymentById,
} from "../model/payment/PaymentModel.js";
import { insertPayment } from "../model/payment/PaymentModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getPayment();

    res.json({
      status: "success",
      message: "Payment method",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title } = req.body;

    !title &&
      res.json({
        status: "error",
        message: "title is required",
      });

    const obj = {
      title,
      slug: slugify(title, { trim: true, lower: true }),
    };

    const result = await insertPayment(obj);

    result?._id
      ? res.json({
          status: "success",
          message: "New payment has been added",
        })
      : res.json({
          status: "error",
          message: "Error, payment cannot be added",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
