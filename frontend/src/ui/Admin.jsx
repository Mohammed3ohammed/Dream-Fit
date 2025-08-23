import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      // حفظ التوكن في localStorage
      localStorage.setItem("adminToken", res.data.token);

      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <h2 className="login-title">تسجيل دخول المدير</h2>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label">البريد الإلكتروني</label>
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="input-label">كلمة المرور</label>
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">دخول</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
