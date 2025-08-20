import { useState } from "react";
import { useCart } from "../context/useCart";
import ConfirmOrder from "./ConfirmOrder";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
      const [showForm, setShowForm] = useState(false);


  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 عربة التسوق</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">العربة فارغة</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item">
          <img src={item.images[0]} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">{item.price}</p>
              {item.size && <p className="cart-item-size">المقاس: {item.size}</p>}
            </div>
<button
  className="remove-btn"
  onClick={() => removeFromCart(item.id)}
>
  حذف
</button>
          </div>
        ))
      )}
      <button
        className="confirm-order-btn"
        onClick={() => setShowForm(true)}
      >
        تأكيد الطلب
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ConfirmOrder onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
