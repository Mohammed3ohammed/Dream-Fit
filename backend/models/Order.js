import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  products: [
    {
      id: { type: String, required: true },
      name: String,
      price: Number,
      size: String,
      img: String,
      images: [String]
    }
  ],
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
