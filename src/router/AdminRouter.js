import express from "express";
import { hassPassword } from "../helper/bcrypt.js";
import { insertAdmin } from "../model/admin/AdminModel.js";

const router = express.Router();

//create new admin

router.post("/", async (req, res, next) => {
  try {
    //encrypt password

    const { password } = req.body;

    req.body.password = hassPassword(password);

    const result = await insertAdmin(req.body);

    result?._id
      ? res.json({
          status: "success",
          message:
            "Please check your email and follow instruction to activate your account",
        })
      : res.json({
          status: "error",
          message: "Unable to create the account, please try again later",
        });
  } catch (error) {
    let msg = error.message;

    if (msg.includes("E11000 duplicate key error")) {
      error.statusCode = 400;

      error.message =
        "This email is already used by another admin, please use different email";
    }

    next(error);
  }
});

export default router;
