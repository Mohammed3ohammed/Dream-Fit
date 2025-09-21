
import { useEffect, useState } from "react";
import { useCart } from "../context/useCart";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});
 const [currentIndexes, setCurrentIndexes] = useState({});


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        console.log("✅ البيانات:", res.data);
        setProducts(res.data);

                  const initialIndexes = {};
        res.data.forEach((p, i) => {
          initialIndexes[i] = 0;
        });
        setCurrentIndexes(initialIndexes);

      } catch (err) {
        console.error("❌ خطأ أثناء جلب المنتجات:", err);
      }
    };

    fetchProducts();
  }, []);


 useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexes((prevIndexes) => {
        const updated = {};
        products.forEach((product, i) => {
          const lastIndex = product.images.length - 1;
          updated[i] =
            prevIndexes[i] === lastIndex ? 0 : prevIndexes[i] + 1;
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [products]);

  const handleSizeSelect = (index, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [index]: size
    }));
  };

  const handleAdd = (product, index) => {
    const size = selectedSizes[index];
    if (!size) {
      alert("من فضلك اختر المقاس قبل الإضافة");
      return;
    }

    addToCart({ ...product, size });
    console.log("تمت الإضافة:", { ...product, size });
  };

  return (
    <main className="products-container">
      {products.length === 0 ? (
        <p>لا توجد منتجات حاليا</p>
      ) : (
        products.map((product, index) => (
          <div key={product._id} className="product-wrapper">
            <div className="product-card">

                              <img
                src={
                  (product.images && product.images.length > 0
                    ? product.images[currentIndexes[index] || 0]
                    : product.img) || "/placeholder.jpg"
                }
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price} EGP</p>

              <div className="size-options">
                {["L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSizes[index] === size ? "active" : ""}`}
                    onClick={() => handleSizeSelect(index, size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => handleAdd(product, index)}>
              اضافه الي العربه
            </button>
          </div>
        ))
      )}
    </main>
  );
};

export default Products;
