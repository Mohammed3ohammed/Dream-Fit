import { useEffect, useState } from "react";
import axios from "axios";
import Logout from "./Logout";

const UserPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchOrders = async () => {
try {
  const token = localStorage.getItem("token");

  const res = await axios.get("http://localhost:5000/api/orders", {
    headers: {
      Authorization: `Bearer ${token}`, // ⬅️ بس كده تكفي
    },
  });

  setOrders(res.data);
} catch (error) {
  console.error("❌ خطأ أثناء جلب الطلبات:", error);
} finally {
  setLoading(false);
}

};


  // const deleteOrder = async (id) => {
  //   if (window.confirm("هل أنت متأكد من حذف الطلب؟")) {
  //     try {
  //       await axios.delete(`http://localhost:5000/api/orders/${id}`);
  //       setOrders(orders.filter((order) => order._id !== id));
  //     } catch (error) {
  //       console.error("❌ خطأ أثناء حذف الطلب:", error);
  //     }
  //   }
  // };

    const deleteOrder = async (id) => {
  if (window.confirm("هل أنت متأكد من حذف الطلب؟")) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("❌ خطأ أثناء حذف الطلب:", error);
    }
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="orders-title">جارِ تحميل الطلبات...</p>;

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

            {order.status === "confirmed" ? (
              <span className="delivery-status">🚚 خارج للتوصيل</span>
            ) : (
              <button
                className="delete-order-btn"
                onClick={() => deleteOrder(order._id)}
              >
                حذف الطلب ✖
              </button>
            )}
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
      <div>
        <Logout />
      </div>
    </div>
  );
};

export default UserPage;