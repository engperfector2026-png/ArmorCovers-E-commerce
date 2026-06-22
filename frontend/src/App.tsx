import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SellerRoute from "./components/SellerRoute";
import BuyerRoute from "./components/BuyerRoute";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// Seller Pages
import SellerDashboard from "./pages/SellerDashboard";
import MyProducts from "./pages/MyProducts";
import MyOrders from "./pages/MyOrders";
import AddProduct from "./pages/AddProduct";

// Buyer Pages
import BuyerDashboard from "./pages/BuyerDashboard";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-100">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* ===================== PUBLIC ROUTES ===================== */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            {/* Static & Footer Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ===================== SELLER ROUTES ===================== */}
            <Route path="/seller-dashboard" element={
              <SellerRoute>
                <SellerDashboard />
              </SellerRoute>
            } />
            <Route path="/my-products" element={
              <SellerRoute>
                <MyProducts />
              </SellerRoute>
            } />
            <Route path="/my-orders" element={
              <SellerRoute>
                <MyOrders />
              </SellerRoute>
            } />
            <Route path="/add-product" element={
              <SellerRoute>
                <AddProduct />
              </SellerRoute>
            } />

            {/* ===================== BUYER ROUTES ===================== */}
            <Route path="/buyer-dashboard" element={
              <BuyerRoute>
                <BuyerDashboard />
              </BuyerRoute>
            } />
            <Route path="/cart" element={
              <BuyerRoute>
                <Cart />
              </BuyerRoute>
            } />
            <Route path="/wishlist" element={
              <BuyerRoute>
                <Wishlist />
              </BuyerRoute>
            } />
            <Route path="/checkout" element={
              <BuyerRoute>
                <Checkout />
              </BuyerRoute>
            } />
            <Route path="/success" element={<Success />} />

            {/* 404 Route */}
            <Route path="*" element={
              <div className="text-center py-20">
                <h1 className="text-5xl font-bold text-gray-800">404</h1>
                <p className="text-gray-600 mt-4">Page Not Found</p>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;