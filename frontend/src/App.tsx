import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SellerRoute from "./components/SellerRoute";
import BuyerRoute from "./components/BuyerRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

import SellerDashboard from "./pages/SellerDashboard";
import MyProducts from "./pages/MyProducts";
import MyOrders from "./pages/MyOrders";
import AddProduct from "./pages/AddProduct";

import BuyerDashboard from "./pages/BuyerDashboard";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";     // ← Make sure this line is exact
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-100">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/seller-dashboard" element={
              <SellerRoute><SellerDashboard /></SellerRoute>
            } />
            <Route path="/my-products" element={
              <SellerRoute><MyProducts /></SellerRoute>
            } />
            <Route path="/my-orders" element={
              <SellerRoute><MyOrders /></SellerRoute>
            } />
            <Route path="/add-product" element={
              <SellerRoute><AddProduct /></SellerRoute>
            } />

            <Route path="/buyer-dashboard" element={
              <BuyerRoute><BuyerDashboard /></BuyerRoute>
            } />
            <Route path="/cart" element={
              <BuyerRoute><Cart /></BuyerRoute>
            } />
            <Route path="/wishlist" element={
              <BuyerRoute><Wishlist /></BuyerRoute>
            } />
            <Route path="/checkout" element={
              <BuyerRoute><Checkout /></BuyerRoute>
            } />
            <Route path="/success" element={<Success />} />

            <Route path="*" element={
              <div className="text-center py-20">
                <h1 className="text-5xl font-bold">404</h1>
                <p>Page Not Found</p>
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