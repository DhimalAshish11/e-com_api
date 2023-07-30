import { createAccessJWT, verifyAccessJWT } from "../helper/jwt.js";
import { getAdminByEmail, getOneAdmin } from "../model/admin/AdminModel.js";

export const auth = async (req, res, next) => {
  try {
    //get the accessJWT

    const { authorization } = req.header;
    console.log(authorization);

    //Decode the JWT

    const decoded = verifyAccessJWT(authorization);

    console.log(decoded);

    //extract the email and get user by email

    if (decoded?.email) {
      ///check if user is active

      const user = await getAdminByEmail(decoded.email);
      console.log(user);

      if (user?._id && user?.status === "active") {
        user.refreshJWT = undefined;
        user.password = undefined;
        req.userInfo = user;
        return next();
      }
    }

    res.status(400).json({
      status: "error",
      message: "Unauthorized",
    });
  } catch (error) {
    if (error.message.includes("jwt expired")) {
      error.StatusCode = 403;
      error.message = error.message;
    }

    if (error.message.includes("invalid signature")) {
      error.StatusCode = 401;
      error.message = error.message;
    }

    next(error);
  }
};

export const refreshAuth = async (req, res, next) => {
  try {
    //get the accessJWT

    const { authorization } = req.header;
    console.log(authorization);

    const decoded = verifyAccessJWT(authorization);

    console.log(decoded);

    if (decoded?.email) {
      ///check if user is active

      const user = await getOneAdmin({
        email: decoded.email,
        refreshJWT: authorization,
      });
      console.log(user);
    }

    if (user?._id && user?.status === "active") {
      const accessJWT = createAccessJWT();

      return next();
    }

    res.status(400).json({
      status: "error",
      message: "Unauthorized",
    });
  } catch (error) {
    if (error.message.includes("jwt expired")) {
      error.StatusCode = 403;
      error.message = error.message;
    }

    if (error.message.includes("invalid signature")) {
      error.StatusCode = 401;
      error.message = error.message;
    }

    next(error);
  }
};
