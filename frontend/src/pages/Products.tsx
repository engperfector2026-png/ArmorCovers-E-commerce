import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products"
        );

        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-orange-50 min-h-screen">

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="bg-white rounded-3xl shadow-md border border-orange-100 p-8">

          <h1 className="text-5xl font-extrabold text-slate-900">
            Marketplace
          </h1>

          <p className="text-slate-600 mt-3 text-lg">
            Discover quality products from trusted vendors across ArmorCovers.
          </p>

        </div>

      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-md p-10 text-center">
            <p className="text-slate-500 text-lg">
              No products available.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">

            {products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
              >
                <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition duration-300">

                  {/* Product Image */}
                  <div className="h-56 overflow-hidden bg-slate-100">

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-7xl">
                        📦
                      </div>
                    )}

                  </div>

                  {/* Product Details */}
                  <div className="p-5">

                    <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {product.category}
                    </span>

                    <h2 className="text-xl font-bold text-slate-900">
                      {product.name}
                    </h2>

                    <p className="text-slate-500 mt-2 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">

                      <p className="text-orange-500 font-bold text-xl">
                        KES {product.price.toLocaleString()}
                      </p>

                      <span className="text-sm text-slate-400">
                        Stock: {product.stock}
                      </span>

                    </div>

                  </div>

                </div>
              </Link>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default Products;