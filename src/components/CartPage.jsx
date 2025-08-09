import { useCart } from "../context/useCart";

const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <div>
      <h2>عربة التسوق</h2>
      {cartItems.length === 0 ? (
        <p>العربة فارغة</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
            <img src={item.img} alt={item.name} width="100" />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            {item.size && <p>المقاس: {item.size}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
