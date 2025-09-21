import express from "express";
import Order from "../models/Order.js";
import { auth} from "../middleware/auth.js";


const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    console.log("📦 Order Received:", req.body);

    const cleanedProducts = req.body.products.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      size: item.size,
      img: item.img,
      images: item.images
    }));

    const newOrder = new Order({
      customer: req.body.customer,
      products: cleanedProducts,
      userId: req.user.id,
      date: req.body.date
    });

    await newOrder.save();
    res.status(201).json({ message: "✅ Order added successfully" });
  } catch (error) {
    console.error("❌ Error saving order:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// routes/orders.js
router.get("/", auth, async (req, res) => {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.find();
    } else {
      orders = await Order.find({ userId: req.user.id });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب الطلبات" });
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