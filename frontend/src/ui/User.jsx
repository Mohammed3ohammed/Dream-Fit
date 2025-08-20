import { useEffect, useState } from "react";
import axios from "axios";

const UserPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("❌ خطأ أثناء جلب الطلبات:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete order by ID
  const deleteOrder = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف الطلب؟")) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        setOrders(orders.filter((order) => order._id !== id));
      } catch (error) {
        console.error("❌ خطأ أثناء حذف الطلب:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>جارِ تحميل الطلبات...</p>;

  return (
    <div className="user-orders">
      <h2 className="orders-title">طلباتي</h2>
      {orders.length === 0 ? (
        <p className="empty-message">لا توجد طلبات بعد</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h3>طلب بتاريخ: {new Date(order.date).toLocaleString()}</h3>
              <button
                className="delete-order-btn"
                onClick={() => deleteOrder(order._id)}
              >
                حذف الطلب ✖
              </button>
            </div>
            <p>الاسم: {order.customer.name}</p>
            <p>العنوان: {order.customer.address}</p>
            <p>الهاتف: {order.customer.phone}</p>
            <h4>المنتجات:</h4>
            <ul className="order-products">
              {order.products.map((item, i) => (
                <li key={`${item.id}-${i}`} className="order-item">
                  <img
                    src={item.img || (item.images && item.images[0])}
                    alt={item.name}
                    className="order-item-img"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <span>
                    {item.name} - {item.size} - {item.price} ج.م
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default UserPage;




