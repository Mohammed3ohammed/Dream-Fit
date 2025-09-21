import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ تحقق قبل الإرسال
  if (!phone || !password || (isRegister && !name)) {
    alert("من فضلك أدخل جميع الحقول");
    return;
  }

  try {
    const url = isRegister
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";


    const data = isRegister
      ? { name, phone, password }
      : { phone, password };

    console.log("📤 إرسال البيانات:", data);

    const res = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("✅ رد السيرفر:", res.data);

    alert(res.data.message || "تم بنجاح");

        if (res.data.token && res.data.role) {
      localStorage.setItem("token", res.data.token);
      // localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }else {
      alert("الرد من السيرفر غير مكتمل");
    }
  } catch (err) {
    console.error("❌ Login/Register error:", err);
    alert(err.response?.data?.message || "حدث خطأ غير متوقع");
  }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isRegister ? "إنشاء حساب جديد" : "تسجيل الدخول"}</h2>

        {isRegister && (
          <input
            type="text"
            placeholder="الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="text"
          placeholder="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isRegister ? "تسجيل" : "دخول"}</button>

        <p>
          {isRegister ? "لديك حساب؟" : "ليس لديك حساب؟"}{" "}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "تسجيل الدخول" : "إنشاء حساب"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
