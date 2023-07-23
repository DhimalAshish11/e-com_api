import AdminSchema from "./AdminSchema.js";

export const insertAdmin = (obj) => {
  return AdminSchema(obj).save();
};

export const getAdminByEmail = (email) => {
  return AdminSchema.findOne({ email });
};
export const updateAdminById = (_id, ...rest) => {
  return AdminSchema.findByIdAndUpdate(_id, rest);
};

export const updateAdmin = (filter, updateObj) => {
  return AdminSchema.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteAdminById = (email) => {
  return AdminSchema.findById(_id);
};
