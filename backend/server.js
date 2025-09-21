import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import Order from "./models/Order.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب الطلبات", error });
  }
});

app.patch("/api/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "الطلب غير موجود" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "❌ خطأ أثناء تحديث حالة الطلب" });
  }
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
