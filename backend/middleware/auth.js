// import jwt from "jsonwebtoken";

// export const auth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "غير مصرح بالدخول" });

//     const decoded = jwt.verify(token, "secretkey");
//     req.userId = decoded.id; // حفظ الـ id بتاع المستخدم
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "التوكن غير صالح" });
//   }
// };


// import jwt from "jsonwebtoken";

// export const auth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "غير مصرح بالدخول" });

//     const decoded = jwt.verify(token, "secretkey");
//     req.userId = decoded.id;
//     req.role = decoded.role;
//     next();
//   } catch {
//     return res.status(401).json({ message: "التوكن غير صالح" });
//   }
// };

// export const adminAuth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "غير مصرح بالدخول" });

//     const decoded = jwt.verify(token, "secretkey");
//     if (decoded.role !== "admin") {
//       return res.status(403).json({ message: "غير مصرح" });
//     }

//     // ✅ نحفظ البيانات في req
//     req.userId = decoded.id;
//     req.role = decoded.role;

//     next();
//   } catch {
//     return res.status(401).json({ message: "التوكن غير صالح" });
//   }
// };


import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "غير مصرح بالدخول" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // يحوي id والـ role
    next();
  } catch (error) {
    return res.status(401).json({ message: "التوكن غير صالح" });
  }
};


export const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "غير مصرح بالدخول" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "غير مصرح" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "التوكن غير صالح" });
  }
};
