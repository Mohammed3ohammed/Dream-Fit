import { useState } from "react";
import { useCart } from "../context/useCart";

const Products = () => {
  const products = [
    { img: "/6_da10268e-3712-467a-a489-475f6660ce3e.webp", name: "تيشيرت رجالي أسود", price: "250 EGP" },
    { img: "/7_70ccf409-a754-4efd-9ab0-f9f2105ddc10.webp", name: "هودي شتوي رمادي", price: "300 EGP" },
    { img: "/6_da10268e-3712-467a-a489-475f6660ce3e.webp", name: "تيشيرت رجالي أسود", price: "250 EGP" },
    { img: "/7_70ccf409-a754-4efd-9ab0-f9f2105ddc10.webp", name: "هودي شتوي رمادي", price: "300 EGP" },
  ];

  const { addToCart } = useCart();

  const [selectedSizes, setSelectedSizes] = useState({});

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
      {products.map((product, index) => (
        <div key={index} className="product-wrapper">
          <div className="product-card">
            <img src={product.img} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>

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

          <button onClick={() => handleAdd(product, index)}>اضافه الي العربه</button>
        </div>
      ))}
    </main>
  );
};

export default Products;
