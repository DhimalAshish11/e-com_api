import express from "express";

import {
  deletePaymentById,
  getNewPayment,
  insertPayment,
  updatePaymentById,
} from "../model/payment/PaymentModel.js";
import {
  NewPaymentValidation,
  updatePaymentValidation,
} from "../middleware/joiValidation.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getNewPayment();

    res.json({
      status: "success",
      message: "Payment method has been added",
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

router.put("/", updatePaymentValidation, async (req, res, next) => {
  try {
    const result = await updatePaymentById(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "The Payment option has been updated",
        })
      : res.json({
          status: "error",
          message: "Error, Unable to udpate Payment option.",
        });
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  const { _id } = req.params;
  try {
    if (_id) {
      const result = await deletePaymentById(_id);
      result?._id &&
        res.json({
          status: "success",
          message: "The Payment options has been deleted",
        });

      return;
    }

    res.json({
      status: "error",
      message: "Error, Unable to process your request.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
