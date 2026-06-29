import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart, Bell, User, LogOut, Menu, X } from "lucide-react";

function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/business Logo.jpg" 
              alt="ArmorCovers" 
              className="h-11 w-auto" 
            />
            <div className="font-bold text-2xl">
              <span className="text-orange-600">ARMOR</span>
              <span className="text-gray-800">COVERS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-orange-500">Home</Link>
            <Link to="/products" className="hover:text-orange-500">Marketplace</Link>
            <Link to="/about" className="hover:text-orange-500">About</Link>
            <Link to="/contact" className="hover:text-orange-500">Contact</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="p-2 hover:text-orange-500">
              <ShoppingCart size={24} />
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to={user.role === "seller" ? "/seller-dashboard" : "/buyer-dashboard"} 
                  className="flex items-center gap-2 hover:text-orange-500"
                >
                  <User size={22} />
                  <span className="hidden md:block">{user.name?.split(" ")[0]}</span>
                </Link>

                <button onClick={handleLogout} className="text-gray-500 hover:text-red-500">
                  <LogOut size={22} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="border border-orange-500 text-orange-500 px-5 py-2 rounded-xl hover:bg-orange-50"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-orange-500 text-white px-5 py-2 rounded-xl hover:bg-orange-600"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t flex flex-col gap-4 text-lg">
            <Link to="/" onClick={() => setMenuOpen(false)} className="py-2">Home</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)} className="py-2">Marketplace</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="py-2">About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="py-2">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;