import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

const addToCart = (product) => {
  setCartItems((prev) => [
    ...prev,
    { 
      ...product, 
      id: Date.now(),
      img: product.img || (product.images ? product.images[0] : null) 
    }
  ]);
};

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

    const deleteOrder = (index) => {
  setOrders((prev) => prev.filter((_, i) => i !== index));
};

  // ✅ إضافة طلب جديد
  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
    clearCart(); // فضي السلة بعد الطلب
  };

  // ✅ حفظ السلة والطلبات في localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);



  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, orders, addOrder, deleteOrder }}>
      {children}
    </CartContext.Provider>
  );
};

