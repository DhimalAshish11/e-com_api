import express from "express";
import { hassPassword } from "../helper/bcrypt.js";
import { insertAdmin } from "../model/admin/AdminModel.js";
import {
  newAdminValidation,
  newAdminVerificationValidation,
} from "../middleware/joiValidation.js";
import { v4 as uuidv4 } from "uuid";
import {
  accountVerificationEmail,
  accountVerifiedNotification,
} from "../helper/nodemailer.js";

const router = express.Router();

//create new admin

router.post("/", newAdminValidation, async (req, res, next) => {
  try {
    //encrypt password

    const { password } = req.body;

    req.body.password = hassPassword(password);

    req.body.verificationCode = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    const result = await insertAdmin(req.body);

    if (result?._id) {
      res.json({
        status: "success",
        message:
          "Please check your email and follow the instruction to activate your acount",
      });

      const link = ` ${process.env.WEB_DOMAIN}/admin-verification?c=${result.verificationCode}&e=${result.email}`;

      await accountVerificationEmail({
        fName: result.fName,
        email: result.email,
        link,
      });
      return;
    }
    res.json({
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

router.post(
  "/admin-verification",
  newAdminVerificationValidation,
  async (req, res, next) => {
    try {
      const { c, e } = req.body;
      const filter = {
        email: e,
        verificationCode: c,
      };
      const updateObj = {
        isVerified: true,
        verificationCode: "",
      };
      const result = await updateAdmin(filter, updateObj);

      if (result?._id) {
        await accountVerifiedNotification(result);
        res.json({
          status: "success",
          message: "Your account has been verified, you may login now!",
        });

        return;
      }
      res.json({
        status: "error",
        message: "Link is expired or invalid!",
      });
    } catch (error) {
      next(error);
    }
  }
);
export default router;
