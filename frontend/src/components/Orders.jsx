import { useEffect, useState } from "react";
import axios from "axios";


const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);



  const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await axios.get("http://localhost:5000/api/orders/all", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data);
  } catch (error) {
    console.error("❌ خطأ أثناء جلب الطلبات:", error);
  } finally {
    setLoading(false);
  }
};

  if (loading) return <p className="loading">جاري التحميل...</p>;

  return (
    <div className="admin-orders-page">
      <h2>قائمة الطلبات</h2>
      {orders.length === 0 ? (
        <p>لا توجد طلبات حتى الآن</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>العميل</th>
              <th>الهاتف</th>
              <th>العنوان</th>
              <th>المنتج</th>
              <th>السعر</th>
              <th>الكمية</th>
              <th>الصورة</th>
              <th>التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) =>
              order.products.map((product, idx) => (
                <tr key={`${index}-${idx}`}>
                  <td>{order.customer.name}</td>
                  <td>{order.customer.phone}</td>
                  <td>{order.customer.address}</td>
                  <td>{product.name}</td>
                  <td>{product.price} جنيه</td>
<td>{product.quantity || 1}</td>

                  <td>
                    {/* <img
                      src={product.img || "/placeholder.jpg"}
                      alt={product.name}
                    /> */}

                    <img
  src={product.img && product.img.startsWith("http") ? product.img : "/placeholder.jpg"}
  alt={product.name}
  width="50"
/>

                  </td>
                  {/* <td>{new Date(order.date).toLocaleString()}</td> */}
                                      {new Date(order.date).toLocaleDateString()}{" "}
                    {new Date(order.date).toLocaleTimeString()}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;



  // const fetchOrders = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/orders");
  //     setOrders(response.data);
  //   } catch (error) {
  //     console.error("❌ خطأ أثناء جلب الطلبات:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //   const fetchOrders = async () => {
//   try {
//     const token = localStorage.getItem("userToken");
//     const res = await axios.get("http://localhost:5000/api/orders", {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setOrders(res.data);
//   } catch (error) {
//     console.error("❌ خطأ أثناء جلب الطلبات:", error);
//   } finally {
//     setLoading(false);
//   }
// };