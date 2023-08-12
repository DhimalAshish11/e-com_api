import ProductSchema from "./ProductSchema.js";

export const insertProduct = (obj) => {
  return ProductSchema(obj).save();
};

export const getProduct = () => {
  return ProductSchema.find();
};

export const getProductById = (_id) => {
  return ProductSchema.findById(_id);
};

export const findOneProductByfilter = (filter) => {
  return ProductSchema.findOne(filter);
};

export const updateProductById = ({ _id, ...rest }) => {
  return ProductSchema.findByIdAndUpdate(_id, ...rest);
};

/* export const updateProductBySlug = (_id, obj) => {
  return ProductSchema.findByIdAndUpdate(_id, obj, { new: true });
}; */

export const deleteProductById = (_id) => {
  return ProductSchema.findByIdAndDelete(_id);
};
