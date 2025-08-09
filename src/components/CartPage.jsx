import { useCart } from "../context/useCart";


const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 عربة التسوق</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">العربة فارغة</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.img} alt={item.name} className="cart-item-image" />

            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">{item.price}</p>
              {item.size && <p className="cart-item-size">المقاس: {item.size}</p>}
            </div>
                                      <button
                className="remove-btn"
                onClick={() => removeFromCart(index)}
              >
              حذف
              </button>
          </div>
        ))
      )}

        <button class="confirm-order-btn">تأكيد الطلب</button>
    </div>
  );
};

export default CartPage;
