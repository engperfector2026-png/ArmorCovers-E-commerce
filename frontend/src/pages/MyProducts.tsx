import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock?: number;
  image?: string;
}

function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      setProducts(
        products.filter(
          (product) => product._id !== id
        )
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-md border border-orange-100 p-8 mb-8">

          <h1 className="text-4xl font-extrabold text-slate-900">
            My Products
          </h1>

          <p className="text-slate-600 mt-2">
            Manage all products listed in your ArmorCovers store.
          </p>

        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-md p-10 text-center">
            <p className="text-slate-500 text-lg">
              No products found.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >

                {/* Product Image */}
                <div className="h-56 overflow-hidden bg-slate-100">

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-7xl">
                      📦
                    </div>
                  )}

                </div>

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

                    {product.stock !== undefined && (
                      <span className="text-sm text-slate-400">
                        Stock: {product.stock}
                      </span>
                    )}

                  </div>

                  <div className="flex gap-3 mt-6">

                    <button
                      className="
                        flex-1
                        bg-orange-500
                        hover:bg-orange-600
                        text-white
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteProduct(product._id)
                      }
                      className="
                        flex-1
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyProducts;