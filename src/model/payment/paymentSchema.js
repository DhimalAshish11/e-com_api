import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },

    title: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    amount: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Payment", PaymentSchema);
