import express from "express";
import {
  getPayment,
  updatePaymentById,
} from "../model/payment/PaymentModel.js";
import { insertPayment } from "../model/payment/PaymentModel.js";
import { NewPaymentValidation } from "../middleware/joiValidation.js";

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

router.post("/", NewPaymentValidation, async (req, res, next) => {
  try {
    const result = await insertPayment(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New payment has been added",
        })
      : res.json({
          status: "error",
          message: "Error, payment cannot be added.",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
