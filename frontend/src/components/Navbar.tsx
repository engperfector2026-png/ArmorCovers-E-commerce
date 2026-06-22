import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart, LogOut, Menu, X } from "lucide-react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (token) {
      setIsLoggedIn(true);
      setUserName(name || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">

          {/* Logo + Business Name */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/business Logo.jpg" 
              alt="ArmorCovers" 
              className="h-11 w-auto"
            />
            <div className="hidden sm:block">
              <span className="text-3xl font-bold tracking-tighter text-gray-900">ARMOR</span>
              <span className="text-3xl font-bold tracking-tighter text-orange-500">COVERS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-9 text-gray-700 font-medium">
            <Link to="/" className="hover:text-orange-600 transition">Home</Link>
            <Link to="/products" className="hover:text-orange-600 transition">Shop</Link>
            <Link to="/seller-dashboard" className="hover:text-orange-600 transition">Sell</Link>
            <Link to="/about" className="hover:text-orange-600 transition">About</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link to="/cart" className="p-3 hover:bg-gray-100 rounded-2xl transition">
                  <ShoppingCart size={24} />
                </Link>

                <div className="flex items-center gap-3 pl-4 border-l">
                  <span className="text-sm font-medium hidden md:block">Hi, {userName}</span>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-2xl transition"
                  >
                    <LogOut size={22} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden md:block px-6 py-3 text-gray-700 hover:text-orange-600 font-medium transition">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-2xl font-semibold transition"
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-3 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 py-6 border-t flex flex-col gap-6 text-lg font-medium">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link to="/seller-dashboard" onClick={() => setIsMenuOpen(false)}>Sell</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            
            {!isLoggedIn && (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;