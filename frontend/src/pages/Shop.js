import { useState, useEffect } from 'react';

function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Load products from localStorage (temporary)
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '30px' }}>Shop - Browse Products</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
        {products.length === 0 ? (
          <p>No products available yet. Vendors need to upload products first.</p>
        ) : (
          products.map(product => (
            <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '20px', background: 'white' }}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>
                KSh {product.price}
              </p>
              <button 
                onClick={() => addToCart(product)}
                style={{ 
                  marginTop: '15px', 
                  padding: '12px 25px', 
                  background: '#10b981', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#f0fdf4', borderRadius: '12px' }}>
        <h2>Cart ({cart.length} items)</h2>
        {cart.map((item, index) => (
          <div key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            {item.name} - KSh {item.price}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;