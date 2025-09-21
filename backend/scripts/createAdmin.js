import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("123456789", 10);

    const admin = new User({
      name: "Admin",
      phone: "01012345678",
      password: hashedPassword,
      role: "admin"   // 👈 هنا بنحدد انه أدمن
    });

    await admin.save();
    console.log("✅ Admin created:", admin);
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

createAdmin();
