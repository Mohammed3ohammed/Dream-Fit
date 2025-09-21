import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// ✅ Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "الرجاء إدخال جميع الحقول" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "رقم الهاتف مسجل بالفعل" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, phone, password: hashedPassword, role: "user" });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    return res.json({ message: "تم إنشاء الحساب بنجاح", token, role: user.role });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "خطأ في السيرفر" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "رقم الهاتف وكلمة المرور مطلوبان" });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "المستخدم غير موجود" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "كلمة المرور غير صحيحة" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    return res.json({ message: "تم تسجيل الدخول بنجاح", token, role: user.role });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "خطأ في السيرفر" });
  }
});

export default router;
