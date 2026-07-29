import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SellerRoute from "./components/SellerRoute";
import BuyerRoute from "./components/BuyerRoute";
import AdminRoute from "./components/AdminRoute";
import PromoAd from "./components/PromoAd";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Warehouse from "./pages/Warehouse";
import BodaExpress from "./pages/BodaExpress";
import FlashSales from "./pages/FlashSales";
import Warranty from "./pages/Warranty";
import WarrantyProducts from "./pages/WarrantyProducts";
import FAQ from "./pages/FAQ";                 // New
import Sell from "./pages/Sell";               // New
import BuyerGuide from "./pages/BuyerGuide";   // New

// Seller Pages
import SellerDashboard from "./pages/SellerDashboard";
import MyProducts from "./pages/MyProducts";
import MyOrders from "./pages/MyOrders";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

// Buyer Pages
import BuyerDashboard from "./pages/BuyerDashboard";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Returns from "./pages/Returns";
import OrderTracking from "./pages/OrderTracking";

// Rider Pages
import RiderRegister from "./pages/RiderRegister";
import RiderDashboard from "./pages/RiderDashboard";

// Chat
import Chat from "./pages/Chat";
import ChatBot from "./pages/ChatBot";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageOrders from "./pages/ManageOrders";
import PaymentReports from "./pages/PaymentReports";
import PlatformSettings from "./pages/PlatformSettings";
import ManageProducts from "./pages/ManageProducts";
import ManageCategories from "./pages/ManageCategories";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminRiders from "./pages/AdminRiders";
import AdminDeliveries from "./pages/AdminDeliveries";
import AdminReturns from "./pages/AdminReturns";

// Inner layout so we can use useLocation
function AppLayout() {
  const location = useLocation();
  const [promoProducts, setPromoProducts] = useState<any[]>([]);

  // Only fetch promo products on Shop / Warehouse
  const showPromoAd =
    location.pathname === "/products" ||
    location.pathname === "/warehouse";

  useEffect(() => {
    if (!showPromoAd) return;

    const fetchProducts = async () => {
      try {
        const url =
          location.pathname === "/warehouse"
            ? "http://localhost:5000/api/products/warehouse"
            : "http://localhost:5000/api/products";

        const res = await axios.get(url);
        setPromoProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Promo products fetch failed:", err);
        setPromoProducts([]);
      }
    };

    fetchProducts();
  }, [showPromoAd, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* ====================== PUBLIC ROUTES ====================== */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/flash-sales" element={<FlashSales />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/warranty-products" element={<WarrantyProducts />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/boda-express" element={<BodaExpress />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />                    {/* New */}
          <Route path="/sell" element={<Sell />} />                  {/* New */}
          <Route path="/buyer-guide" element={<BuyerGuide />} />     {/* New */}

          {/* ====================== AUTH ====================== */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ====================== SELLER ROUTES ====================== */}
          <Route
            path="/seller-dashboard"
            element={
              <SellerRoute>
                <SellerDashboard />
              </SellerRoute>
            }
          />
          <Route
            path="/my-products"
            element={
              <SellerRoute>
                <MyProducts />
              </SellerRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <SellerRoute>
                <MyOrders />
              </SellerRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <SellerRoute>
                <AddProduct />
              </SellerRoute>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <SellerRoute>
                <EditProduct />
              </SellerRoute>
            }
          />

          {/* ====================== BUYER ROUTES ====================== */}
          <Route
            path="/buyer-dashboard"
            element={
              <BuyerRoute>
                <BuyerDashboard />
              </BuyerRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <BuyerRoute>
                <Cart />
              </BuyerRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <BuyerRoute>
                <Wishlist />
              </BuyerRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <BuyerRoute>
                <Checkout />
              </BuyerRoute>
            }
          />
          <Route
            path="/success"
            element={
              <BuyerRoute>
                <Success />
              </BuyerRoute>
            }
          />
          <Route
            path="/returns"
            element={
              <BuyerRoute>
                <Returns />
              </BuyerRoute>
            }
          />
          <Route
            path="/track-order"
            element={
              <BuyerRoute>
                <OrderTracking />
              </BuyerRoute>
            }
          />

          {/* ====================== RIDER ROUTES ====================== */}
          <Route path="/rider-register" element={<RiderRegister />} />
          <Route path="/rider-dashboard" element={<RiderDashboard />} />

          {/* ====================== CHAT ====================== */}
          <Route path="/chat/:roomId" element={<Chat />} />

          {/* ====================== ADMIN ROUTES ====================== */}
          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <ManageOrders />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <AdminRoute>
                <PaymentReports />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <PlatformSettings />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ManageProducts />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <ManageCategories />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit-product/:id"
            element={
              <AdminRoute>
                <AdminEditProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/riders"
            element={
              <AdminRoute>
                <AdminRiders />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/deliveries"
            element={
              <AdminRoute>
                <AdminDeliveries />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/returns"
            element={
              <AdminRoute>
                <AdminReturns />
              </AdminRoute>
            }
          />

          {/* ====================== 404 ====================== */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-800">404</h1>
                  <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
                </div>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
      <ChatBot />

      {/* Popup ads only on Shop & Warehouse — not on Home */}
      {showPromoAd && <PromoAd products={promoProducts} />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;