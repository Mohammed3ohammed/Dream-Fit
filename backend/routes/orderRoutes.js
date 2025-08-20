import express from "express";
import Order from "../models/Order.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    console.log("📦 Order Received:", req.body); 
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "✅ Order added successfully" });
  } catch (error) {
    console.error("❌ Error saving order:", error.message); 
    res.status(500).json({ error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "✅ Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
