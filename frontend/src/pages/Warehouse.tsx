import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Plus, Minus, Truck, ShieldCheck } from "lucide-react";

interface WarehouseProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice?: number;
  stock: number;
  image?: string;
  minimumOrder: number;
  category: string;
}

function Warehouse() {
  const [products, setProducts] = useState<WarehouseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const categories = [
    "All", "Vehicles", "Fashion", "Electronics", "Home", 
    "Agriculture", "Beauty", "Sports", "Health", "Stationary", "Education"
  ];

  useEffect(() => {
    const fetchWarehouseProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/warehouse");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching warehouse products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouseProducts();
  }, []);

  const updateQuantity = (productId: string, newQty: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, newQty)
    }));
  };

  const addToCart = (product: WarehouseProduct) => {
    const qty = quantities[product._id] || product.minimumOrder;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    for (let i = 0; i < qty; i++) {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ ${qty} x ${product.name} added to cart!`);
  };

  const filteredProducts = products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading Warehouse...</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">ArmorCovers Warehouse</h1>
          <p className="text-xl text-gray-600">Bulk & Retail Orders - Direct from Warehouse</p>
          <div className="flex justify-center gap-8 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Truck size={20} /> Fast Delivery
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} /> Verified Stock
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-medium whitespace-nowrap transition ${
                selectedCategory === cat 
                  ? "bg-orange-500 text-white" 
                  : "bg-white border hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const qty = quantities[product._id] || product.minimumOrder;
            return (
              <div key={product._id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-64 bg-gray-100 relative">
                  <img
                    src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/400"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                    In Stock
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-bold text-2xl mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">{product.description}</p>

                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Retail Price</p>
                      <p className="text-3xl font-bold text-orange-600">KSh {product.price.toLocaleString()}</p>
                    </div>
                    {product.wholesalePrice && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Wholesale</p>
                        <p className="text-2xl font-bold">KSh {product.wholesalePrice.toLocaleString()}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => updateQuantity(product._id, qty - 1)} className="p-3 border rounded-xl">
                      <Minus size={20} />
                    </button>
                    <span className="text-2xl font-semibold w-12 text-center">{qty}</span>
                    <button onClick={() => updateQuantity(product._id, qty + 1)} className="p-3 border rounded-xl">
                      <Plus size={20} />
                    </button>
                  </div>

                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} /> Add {qty} to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Warehouse;