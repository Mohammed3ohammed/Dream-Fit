import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ بيانات المدير ثابتة
const ADMIN_EMAIL = "assem@gmail.com";
const ADMIN_PASSWORD = "123456789"; // ممكن تشفّره لو حبيت، لكن هنا ثابت

// ✅ تسجيل الدخول
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ تحقق من البريد وكلمة السر
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(400).json({ message: "البريد أو كلمة المرور غير صحيحة" });
    }

    // ✅ إنشاء JWT
    const token = jwt.sign({ email: ADMIN_EMAIL }, "secretkey", { expiresIn: "1h" });

    res.json({ message: "تم تسجيل الدخول بنجاح", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

