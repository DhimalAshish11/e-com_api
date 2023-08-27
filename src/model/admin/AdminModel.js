import AdminSchema from "./AdminSchema.js";

export const insertAdmin = (obj) => {
  return AdminSchema(obj).save();
};

export const getAdminByEmail = (email) => {
  return AdminSchema.findOne({ email });
};

export const getAdminById = (_id) => {
  return AdminSchema.findOne({ _id });
};

export const getAdminDisplay = () => {
  return AdminSchema.find();
};

export const getOneAdmin = (filter) => {
  return AdminSchema.findOne(filter);
};

export const updateAdminById = (_id, rest) => {
  return AdminSchema.findByIdAndUpdate(_id, rest);
};

export const updateAdminByEmail = (email) => {
  return AdminSchema.findOneAndUpdate({ email });
};

export const updateAdmin = (filter, updateObj) => {
  return AdminSchema.findOneAndUpdate(filter, updateObj, { new: true });
};

export const updatePassword = (filter, updateObj) => {
  return AdminSchema.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteAdminById = (email) => {
  return AdminSchema.findById(_id);
};
