import { useState } from "react";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmOrder = ({ onClose }) => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (cartItems.length === 0) {
    alert("عربة التسوق فارغة");
    return;
  }

  const cleanedProducts = cartItems.map(item => ({
    ...item,
    price: typeof item.price === "string"
      ? parseFloat(item.price.replace(/[^\d.]/g, ""))
      : item.price
  }));

  const order = {
    customer: { name, address, phone },
    products: cleanedProducts,
    date: new Date().toISOString(),
  };

  try {
    const token = localStorage.getItem("token"); // ✅ صح

    await axios.post("http://localhost:5000/api/orders", order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("✅ تم إرسال الطلب بنجاح");
    clearCart();
    onClose();
    navigate("/user");
  } catch (error) {
    console.error("❌ خطأ أثناء إرسال الطلب:", error);
    alert(error.response?.data?.message || "حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى");
  }
};


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (cartItems.length === 0) {
//     alert("عربة التسوق فارغة");
//     return;
//   }

//   const cleanedProducts = cartItems.map(item => ({
//     ...item,
//     price: typeof item.price === "string"
//       ? parseFloat(item.price.replace(/[^\d.]/g, ""))
//       : item.price
//   }));

//   const order = {
//     customer: { name, address, phone },
//     products: cleanedProducts,
//     date: new Date().toISOString(),
//   };

//   try {
// const token = localStorage.getItem("userToken");

// await axios.post("http://localhost:5000/api/orders", order, {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });


//     alert("✅ تم إرسال الطلب بنجاح");
//     clearCart();
//     onClose();
//     navigate("/user");
//   } catch (error) {
//     console.error("❌ خطأ أثناء إرسال الطلب:", error);
//     alert("حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى");
//   }
// };



  return (
    <div className="confirm-order-container">
      <button className="close-btn" onClick={onClose}>✖</button>
      <h2>تأكيد الطلب</h2>
      <form onSubmit={handleSubmit} className="confirm-order-form">
        <label>الاسم:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>العنوان:</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} required />

        <label>رقم الهاتف:</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <button type="submit">إرسال الطلب</button>
      </form>
    </div>
  );
};

export default ConfirmOrder;



