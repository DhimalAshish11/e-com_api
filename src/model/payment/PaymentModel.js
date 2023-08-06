import PaymentSchema from "./paymentSchema.js";

export const insertPayment = (obj) => {
  return PaymentSchema(obj).save();
};

export const getPayment = () => {
  return PaymentSchema.find();
};

export const updatePaymentById = (_id, obj) => {
  return PaymentSchema.findByIdAndUpdate(_id, obj, { new: true });
};

export const updatePayment = (filter, updateObj) => {
  return PaymentSchema.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deletePaymentById = (_id) => {
  return PaymentSchema.findByIdAndDelete(_id);
};
