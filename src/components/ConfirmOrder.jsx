import { useState } from "react";

const ConfirmOrder = ({ onClose }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, address, phone });
    alert("تم إرسال الطلب بنجاح ✅");
    onClose();
  };

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

