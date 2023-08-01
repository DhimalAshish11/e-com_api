import SessionSchema from "./SessionSchema.js";

export const insertNewSession = (obj) => {
  return SessionSchema(obj).save();
};

export const DeleteSession = async (token) => {
  const data = await SessionSchema.findOneAndDelete({ token });
};
