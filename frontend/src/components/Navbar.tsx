import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl font-bold text-orange-500"
      >
        ARMORCOVERS
      </Link>

      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="text-gray-700 hover:text-orange-500"
        >
          Home
        </Link>

        <Link
          to="/products"
          className="text-gray-700 hover:text-orange-500"
        >
          Products
        </Link>

        <Link
          to="/cart"
          className="text-gray-700 hover:text-orange-500"
        >
          Cart
        </Link>

        <Link
          to="/seller-dashboard"
          className="text-gray-700 hover:text-orange-500"
        >
          Seller
        </Link>

        <Link
          to="/my-products"
          className="text-gray-700 hover:text-orange-500"
        >
          My Products
        </Link>

        <Link
          to="/login"
          className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;