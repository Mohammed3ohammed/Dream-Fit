import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  products: [
    {
      id: String,
      name: String,
      price: Number,
      size: String,
      img: String,
      images: [String],
      _id: false
    }
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed"],
    default: "pending"
  },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
