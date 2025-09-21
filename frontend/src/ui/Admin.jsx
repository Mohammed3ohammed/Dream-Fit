import { useEffect, useState } from "react";
import axios from "axios";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";


const Admin = () => {
    const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    img: "",
  });

  useEffect(() => {
const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
    fetchOrders(token);
    fetchProducts(token);
    }
  }, [navigate]); 



  const fetchOrders = async () => {
  try {
      const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data);
  } catch (err) {
    console.error("❌ خطأ في جلب الطلبات:", err);
  } finally {
    setLoadingOrders(false);
  }
};

const fetchProducts = async (token) => {
  try {
    const res = await axios.get("http://localhost:5000/api/products", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(res.data);
  } catch (err) {
    console.error("❌ خطأ في جلب المنتجات:", err);
  } finally {
    setLoadingProducts(false);
  }
};

const confirmOrder = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.patch(
      `http://localhost:5000/api/orders/${id}/status`,
      { status: "confirmed" },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("✅ تم تأكيد الطلب بنجاح");
    fetchOrders();
  } catch (err) {
    console.error("❌ خطأ في تأكيد الطلب:", err);
  }
};


  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", newProduct);
      alert("✅ تم إضافة المنتج بنجاح");
      setNewProduct({ name: "", price: "", img: "" });
      fetchProducts(); 
    } catch (err) {
      console.error("❌ خطأ في إضافة المنتج:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("هل تريد حذف هذا المنتج؟")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("❌ خطأ في حذف المنتج:", err);
      }
    }
  };

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
  

  return (
    <div className="admin-dashboard">
      <h1>لوحة تحكم المدير</h1>


<section className="orders-section">
  <h2>قائمة الطلبات</h2>
  {loadingOrders ? (
    <p>جاري تحميل الطلبات...</p>
  ) : orders.length === 0 ? (
    <p>لا توجد طلبات حتى الآن</p>
  ) : (
    <div className="orders-container">
      {orders.map((order, i) => (
        <div className="order-card" key={i}>
              <button
                    className="delete-order-btn"
                    onClick={() => deleteOrder(order._id)}
                  >
                    حذف الطلب ✖
               </button>
          <div className="order-info">
            <p><strong>العميل:</strong> {order.customer.name}</p>
            <p><strong>الهاتف:</strong> {order.customer.phone}</p>
            <p><strong>العنوان:</strong> {order.customer.address}</p>
            <p><strong>التاريخ:</strong> {new Date(order.date).toLocaleString()}</p>
          </div>
          <div className="products-list">
            {order.products.map((product, j) => (
              <div className="product-item" key={j}>
                <img src={product.img} alt={product.name} />
                <div>
                  <p><strong>المنتج:</strong> {product.name}</p>
                  <p><strong>السعر:</strong> {product.price} جنيه</p>
                  <p><strong>الكمية:</strong> {product.quantity || 1}</p>
                </div>
              </div>
            ))}
          </div>
<div className="confirm-btn-container">
  {order.status !== "confirmed" && (
    <button className="confirm-btn" onClick={() => confirmOrder(order._id)}>
      تأكيد الطلب
    </button>
  )}
</div>
        </div>
      ))}
    </div>
  )}
</section>


      <section className="add-product-section">
        <h2>إضافة منتج جديد</h2>
        <form onSubmit={handleAddProduct} className="add-product-form">
          <input
            type="text"
            placeholder="اسم المنتج"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="السعر"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="رابط الصورة"
            value={newProduct.img}
            onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
            required
          />

          <button type="submit">إضافة المنتج</button>
        </form>
      </section>


      <section className="manage-products-section">
        <h2>إدارة المنتجات</h2>
        {loadingProducts ? (
          <p>جاري تحميل المنتجات...</p>
        ) : products.length === 0 ? (
          <p>لا توجد منتجات</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>المنتج</th>
                <th>السعر</th>
                <th>الصورة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price} جنيه</td>
                  <td>
                    {/* <img src={product.img} alt={product.name} width="60" /> */}
<img
  src={
    product.images && product.images.length > 0
      ? product.images[0] 
      : product.img || "/placeholder.jpg"  
  }
  alt={product.name}
  width="60"
/>
                  </td>
                  <td>
                    <button onClick={() => deleteProduct(product._id)}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <div>
        <Logout />
      </div>
    </div>
  );
};

export default Admin;





//   useEffect(() => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token || role !== "admin") {
//     navigate("/login");
//   } else {
//     fetchOrders(token);
//     fetchProducts(token);
//   }
// }, [navigate]);

  // const fetchOrders = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/orders");
  //     setOrders(res.data);
  //   } catch (err) {
  //     console.error("❌ خطأ في جلب الطلبات:", err);
  //   } finally {
  //     setLoadingOrders(false);
  //   }
  // };

  // const fetchProducts = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/products");
  //     setProducts(res.data);
  //   } catch (err) {
  //     console.error("❌ خطأ في جلب المنتجات:", err);
  //   } finally {
  //     setLoadingProducts(false);
  //   }
  // };