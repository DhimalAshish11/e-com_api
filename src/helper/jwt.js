import jwt from "jsonwebtoken";
import { insertNewSession } from "../model/session/SessionModel.js";
import { updateAdmin } from "../model/admin/AdminModel.js";

export const createAccessJWT = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });

  await insertNewSession({ token, associate: email });
  return token;
};

export const createRefreshJWT = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  await updateAdmin({ email }, { refreshJWT });
  return refreshJWT;
};
