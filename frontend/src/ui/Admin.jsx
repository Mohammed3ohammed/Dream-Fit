import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
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
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("❌ خطأ في جلب الطلبات:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("❌ خطأ في جلب المنتجات:", err);
    } finally {
      setLoadingProducts(false);
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
              {orders.map((order, i) =>
                order.products.map((product, j) => (
                  <tr key={`${i}-${j}`}>
                    <td>{order.customer.name}</td>
                    <td>{order.customer.phone}</td>
                    <td>{order.customer.address}</td>
                    <td>{product.name}</td>
                    <td>{product.price} جنيه</td>
                    <td>{product.quantity || 1}</td>
                    <td>
                      <img src={product.img} alt={product.name} width="60" />
                    </td>
                    <td>{new Date(order.date).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
                    <img src={product.img} alt={product.name} width="60" />
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
    </div>
  );
};

export default Admin;