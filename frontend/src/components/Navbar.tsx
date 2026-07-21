import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, LogOut, User, Menu, X, Package, Settings } from 'lucide-react';
import { useState } from 'react';

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
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-3xl">A</div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight">
              <span className="text-gray-900">ARMOR</span>
              <span className="text-orange-600">COVERS</span>
            </div>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, categories, brands..."
                className="w-full bg-gray-100 border border-gray-200 rounded-2xl py-3 pl-12 pr-6 focus:outline-none focus:border-orange-500 text-base"
              />
              <div className="absolute left-5 top-3.5 text-gray-400">🔍</div>
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/products" className="font-medium hover:text-orange-600 transition">Shop</Link>
            <Link to="/warehouse" className="font-medium hover:text-orange-600 transition">Warehouse</Link>

            <div className="flex items-center gap-6">
              <Link to="/cart" className="relative hover:text-orange-600 transition">
                <ShoppingCart size={26} />
              </Link>

              {isAuthenticated ? (
                <>
                  <Link 
                    to={user?.role === 'buyer' ? "/buyer-dashboard" : user?.role === 'admin' ? "/admin-dashboard" : "/seller-dashboard"} 
                    className="flex items-center gap-2 hover:text-orange-600 transition"
                  >
                    <User size={24} />
                    <span className="hidden lg:inline">Account</span>
                  </Link>
                  <button onClick={handleLogout} className="text-red-500 hover:text-red-600 transition">
                    <LogOut size={24} />
                  </button>
                </>
              ) : (
                <Link to="/login" className="font-medium hover:text-orange-600 transition">Sign in</Link>
              )}

              <Link 
                to="/seller-dashboard" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl font-semibold transition text-sm"
              >
                Sell on ArmorCovers
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-gray-700 p-2"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-gray-100 border border-gray-200 rounded-2xl py-3 pl-12 pr-6 focus:outline-none focus:border-orange-500"
            />
            <div className="absolute left-5 top-3.5 text-gray-400">🔍</div>
          </div>
        </form>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pt-6 border-t">
            <div className="flex flex-col gap-6 text-lg font-medium">
              <Link to="/products" className="hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>🛍️ Shop</Link>
              <Link to="/warehouse" className="hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>🏬 Warehouse</Link>
              
              <Link to="/cart" className="flex items-center gap-3 hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>
                🛒 Cart
              </Link>

              {isAuthenticated ? (
                <>
                  <Link 
                    to={user?.role === 'buyer' ? "/buyer-dashboard" : user?.role === 'admin' ? "/admin-dashboard" : "/seller-dashboard"} 
                    className="hover:text-orange-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👤 My Account
                  </Link>
                  <button onClick={handleLogout} className="text-red-600 text-left">Logout</button>
                </>
              ) : (
                <Link to="/login" className="hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>Sign in</Link>
              )}

              <Link 
                to="/seller-dashboard" 
                className="bg-orange-600 text-white py-4 rounded-2xl text-center font-semibold mt-4"
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