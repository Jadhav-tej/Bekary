// models/Address.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // ensures 10-digit phone numbers (India standard)
    },
    pincode: {
      type: String,
      required: true,
      match: /^[0-9]{6}$/, // 6-digit postal code (India)
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // relates address to a user
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false, // mark default address for orders
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
