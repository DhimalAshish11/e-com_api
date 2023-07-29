import CategorySchema from "./categorySchema.js.js";

export const insertCategory = (obj) => {
  return CategorySchema(obj).save();
};

export const getCategories = () => {
  return CategorySchema.find();
};

export const updateCategoryById = (_id, obj) => {
  return CategorySchema.findByIdAndUpdate(_id, obj, { new: true });
};

export const updateCategory = (filter, updateObj) => {
  return CategorySchema.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteCategoryById = (_id) => {
  return CategorySchema.findByIdAndDelete(_id);
};
