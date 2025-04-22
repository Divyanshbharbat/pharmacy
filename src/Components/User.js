import mongoose from "mongoose";
import Order from "./Order.js";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicates
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicates
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      id: { type: Number },
      name: { type: String },
      description: { type: String },
      quantity: { type: Number, default: 1 },
      price: { type: String },
      stock: { type: Number },
      image: { type: String },
    }
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    }
  ]
});

const User = mongoose.model("User", userSchema);

export default User;
