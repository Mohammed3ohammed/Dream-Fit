import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "assem@gmail.com" && password === "123456789") {
      localStorage.setItem("isAdmin", "true");
      navigate("/orders");
    } else {
      setError("البريد أو كلمة المرور غير صحيحة");
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
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="input-label">كلمة المرور</label>
          <input
            type="password"
            className="input-field"
            placeholder="********"
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


