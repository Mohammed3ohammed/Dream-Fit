import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// ✅ Admin Login Route
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const admin = await Admin.findOne({ phone });
    if (!admin) return res.status(400).json({ message: "الأدمن غير موجود" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "كلمة المرور غير صحيحة" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "تم تسجيل دخول الأدمن", token, role: "admin" });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "خطأ في السيرفر" });
  }
});

export default router;
