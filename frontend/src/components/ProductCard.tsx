import { Link } from "react-router-dom";

type ProductCardProps = {
  id: string;
  title: string;
  price: string;
  category?: string;
};

function ProductCard({
  id,
  title,
  price,
  category,
}: ProductCardProps) {
  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">

      <div className="h-48 bg-slate-800 flex items-center justify-center">
        <span className="text-5xl">📦</span>
      </div>

      <div className="p-4">

        <h3 className="font-bold text-lg">
          {title}
        </h3>

        {category && (
          <p className="text-slate-400 text-sm mt-1">
            {category}
          </p>
        )}

        <p className="text-blue-400 mt-2 font-semibold">
          {price}
        </p>

        <p className="text-slate-400 text-sm mt-1">
          Verified Vendor
        </p>

        <Link
          to={`/products/${id}`}
          className="block text-center mt-4 w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
        >
          View Product
        </Link>

      </div>
    </div>
  );
}

export default ProductCard;