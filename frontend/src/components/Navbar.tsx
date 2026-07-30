import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, ShoppingBag, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo – ArmorCovers brand mark */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-orange-600 transition-colors">
              <ShoppingBag size={20} className="text-white" strokeWidth={2.25} />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              Armor<span className="text-orange-500">Covers</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, categories..."
                className="w-full bg-gray-100 border border-gray-200 rounded-2xl py-2.5 pl-11 pr-4 focus:outline-none focus:border-orange-500 text-sm"
              />
              <div className="absolute left-4 top-2.5 text-gray-400 text-sm">🔍</div>
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            <Link to="/products" className="font-medium hover:text-orange-600 transition text-sm">
              Shop
            </Link>
            <Link to="/warehouse" className="font-medium hover:text-orange-600 transition text-sm">
              Warehouse
            </Link>
            <Link
              to="/boda-express"
              className="font-medium text-orange-600 hover:text-orange-700 transition text-sm"
            >
              🚀 Become a Rider
            </Link>

            <Link to="/cart" className="relative hover:text-orange-600 transition">
              <ShoppingCart size={22} />
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={
                    user?.role === "buyer"
                      ? "/buyer-dashboard"
                      : user?.role === "admin"
                      ? "/admin-dashboard"
                      : "/seller-dashboard"
                  }
                  className="hover:text-orange-600 transition"
                >
                  <User size={22} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <LogOut size={22} />
                </button>
              </>
            ) : (
              <Link to="/login" className="font-medium hover:text-orange-600 transition text-sm">
                Sign in
              </Link>
            )}

            <Link
              to="/seller-dashboard"
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl font-semibold transition text-sm"
            >
              Sell
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-gray-100 border border-gray-200 rounded-2xl py-2.5 pl-11 pr-4 focus:outline-none focus:border-orange-500 text-sm"
            />
            <div className="absolute left-4 top-2.5 text-gray-400 text-sm">🔍</div>
          </div>
        </form>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <div className="flex flex-col gap-5 text-base font-medium">
              <Link
                to="/products"
                className="hover:text-orange-600"
                onClick={() => setIsMenuOpen(false)}
              >
                🛍️ Shop
              </Link>
              <Link
                to="/warehouse"
                className="hover:text-orange-600"
                onClick={() => setIsMenuOpen(false)}
              >
                🏬 Warehouse
              </Link>
              <Link
                to="/boda-express"
                className="hover:text-orange-600"
                onClick={() => setIsMenuOpen(false)}
              >
                🚀 Become a Rider
              </Link>
              <Link
                to="/cart"
                className="hover:text-orange-600"
                onClick={() => setIsMenuOpen(false)}
              >
                🛒 Cart
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to={
                      user?.role === "buyer"
                        ? "/buyer-dashboard"
                        : user?.role === "admin"
                        ? "/admin-dashboard"
                        : "/seller-dashboard"
                    }
                    className="hover:text-orange-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👤 My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="hover:text-orange-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
              )}

              <Link
                to="/seller-dashboard"
                className="bg-orange-600 text-white py-3 rounded-xl text-center font-semibold mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell on ArmorCovers
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;