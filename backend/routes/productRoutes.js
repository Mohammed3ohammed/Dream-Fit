import express from "express";
import Product from "../models/Product.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();
// ✅ جلب كل المنتجات
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "خطأ في جلب المنتجات" });
  }
});

// ✅ إضافة منتج جديد
router.post("/", async (req, res) => {
  try {
    const { name, price, img } = req.body;
    const newProduct = new Product({ name, price, img });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "خطأ في إضافة المنتج" });
  }
});

// ✅ حذف منتج
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "تم حذف المنتج" });
  } catch (err) {
    res.status(500).json({ message: "خطأ في حذف المنتج" });
  }
});


// ✅ إضافة منتج جديد (أدمن فقط)
router.post("/", adminAuth, async (req, res) => {
  try {
    const { name, price, img } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "الاسم والسعر مطلوبان" });
    }
    const newProduct = new Product({ name, price, img });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "خطأ في إضافة المنتج" });
  }
});

// ✅ حذف منتج (أدمن فقط)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "تم حذف المنتج" });
  } catch (err) {
    res.status(500).json({ message: "خطأ في حذف المنتج" });
  }
});


export default router;

