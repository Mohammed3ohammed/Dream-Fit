import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    navigate("/"); 
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#e63946",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      تسجيل الخروج
    </button>
  );
};

export default Logout;


