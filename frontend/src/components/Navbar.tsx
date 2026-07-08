import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Package, LogOut, User, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          
          {/* Logo - Letter A + Business Name */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">A</div>
            <div>
              <span className="text-3xl font-bold text-gray-900 tracking-tight">ARMOR</span>
              <span className="text-3xl font-bold text-orange-500 tracking-tight">COVERS</span>
            </div>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <Link to="/products" className="hover:text-orange-500 transition">Shop</Link>
            <Link to="/warehouse" className="hover:text-orange-500 transition">Warehouse</Link>
            <Link to="/about" className="hover:text-orange-500 transition">About Us</Link>
          </div>

          {/* Right Side - Role Aware */}
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                {/* Buyer Cart */}
                {user?.role === 'buyer' && (
                  <Link to="/cart" className="relative hover:text-orange-500 transition">
                    <ShoppingCart size={26} />
                  </Link>
                )}

                {/* Seller Hub */}
                {(user?.role === 'seller' || user?.role === 'vendor') && (
                  <Link to="/seller-dashboard" className="flex items-center gap-2 hover:text-orange-500 transition">
                    <Package size={24} />
                    <span className="hidden md:inline">Seller Hub</span>
                  </Link>
                )}

                {/* Admin */}
                {user?.role === 'admin' && (
                  <Link to="/admin-dashboard" className="flex items-center gap-2 hover:text-orange-500 transition">
                    <Settings size={24} />
                    <span className="hidden md:inline">Admin</span>
                  </Link>
                )}

                {/* My Account */}
                <Link 
                  to={user?.role === 'buyer' ? "/buyer-dashboard" : user?.role === 'admin' ? "/admin-dashboard" : "/seller-dashboard"}
                  className="flex items-center gap-2 hover:text-orange-500 transition font-medium"
                >
                  <User size={24} />
                  <span className="hidden md:inline">My Account</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 transition"
                  title="Logout"
                >
                  <LogOut size={24} />
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-2xl font-medium transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;