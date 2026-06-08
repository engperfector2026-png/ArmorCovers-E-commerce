import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        {
          user: "000000000000000000000001",
          product: product?._id,
          quantity: 1,
        }
      );

      alert("Product added to cart!");
    } catch (error) {
      console.error(error);
      alert("Failed to add product to cart");
    }
  };

  if (!product) {
    return (
      <div className="bg-orange-50 min-h-screen flex justify-center items-center text-xl font-semibold text-slate-700">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen py-12 px-6">

      <div className="max-w-6xl mx-auto">

        <Link
          to="/products"
          className="text-orange-500 hover:text-orange-600 font-semibold"
        >
          ← Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-10 mt-8">

          {/* Product Image */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden h-[500px]">

            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">
                📦
              </div>
            )}

          </div>

          {/* Product Information */}
          <div>

            <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold mb-4">
              {product.category}
            </span>

            <h1 className="text-5xl font-extrabold text-slate-900">
              {product.name}
            </h1>

            <p className="text-slate-600 mt-6 text-lg leading-relaxed">
              {product.description}
            </p>

            <h2 className="text-4xl font-bold text-orange-500 mt-8">
              KES {product.price.toLocaleString()}
            </h2>

            <div className="mt-8 space-y-4">

              <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4">
                <strong className="text-slate-800">
                  Category:
                </strong>{" "}
                {product.category}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4">
                <strong className="text-slate-800">
                  Available Stock:
                </strong>{" "}
                {product.stock}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4">
                <strong className="text-slate-800">
                  Marketplace:
                </strong>{" "}
                ArmorCovers Verified Listing
              </div>

            </div>

            <div className="mt-10 flex gap-4 flex-wrap">

              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Contact Seller
              </button>

              <button
                onClick={handleAddToCart}
                className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition"
              >
                Add To Cart
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;