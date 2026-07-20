import { useEffect, useState } from "react";
import "./shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const categories = ["All", ...new Set(products.map(p => p.category || "Other"))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || p.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="shop-container">

      {/* HERO */}
      <div className="shop-hero">
        <h1>Armor Marketplace</h1>
        <p>Shop quality products at the best prices in Kenya</p>
      </div>

      {/* CONTROLS */}
      <div className="shop-controls">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="cart-indicator">
          🛒 {cart.length}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="product-grid">

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            No products found
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card" key={product._id}>

              <div className="image-box">
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                />

                {product.stock > 0 ? (
                  <span className="badge in">In Stock</span>
                ) : (
                  <span className="badge out">Out</span>
                )}
              </div>

              <div className="product-body">
                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <div className="price-row">
                  <span>KES {product.price}</span>
                  <small>{product.category}</small>
                </div>

                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Shop;