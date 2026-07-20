import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { ShoppingCart, ArrowRight, Star, Truck, Users, Shield, Award, ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";
=======
import { ShoppingCart, ArrowRight, Star, Truck, Users } from "lucide-react";
>>>>>>> 9fb3c69fabe9c74dd467f3d4032cdea50d79da3c

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
}

<<<<<<< HEAD
const heroImage = "https://picsum.photos/id/1060/1920/1080";

const storeHighlights = [
  { image: "https://picsum.photos/id/1077/1200/800", title: "Vehicle ArmorCovers", desc: "Heavy-duty protection for modern cars & SUVs" },
  { image: "https://picsum.photos/id/201/1200/800", title: "Premium Seat Covers", desc: "Luxury & durability for your interior" },
  { image: "https://picsum.photos/id/367/1200/800", title: "Electronics & Gadgets", desc: "Latest smartphones, laptops & accessories" },
  { image: "https://picsum.photos/id/1060/1200/800", title: "Home & Living", desc: "Modern furniture & lifestyle products" },
  { image: "https://picsum.photos/id/133/1200/800", title: "Motorcycle & Outdoor", desc: "All-weather protection built tough" }
];

const testimonials = [
  { name: "Elijah Rakoro", location: "Nairobi", text: "The quality of products here is unmatched. Fast delivery and excellent service!", rating: 5 },
  { name: "Hedricks Nagweya", location: "Nairobi", text: "I found everything I needed in one place. Highly recommended marketplace.", rating: 5 },
  { name: "Elline", location: "Nairobi", text: "Beautiful products and very reliable. My go-to platform now.", rating: 4 },
  { name: "Mary Kyalo", location: "Nairobi", text: "Great variety from electronics to home items. Very satisfied customer.", rating: 5 }
];

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentStoreSlide, setCurrentStoreSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentStoreSlide((prev) => (prev + 1) % storeHighlights.length), 4000);
    return () => clearInterval(timer);
  }, []);
=======
function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
>>>>>>> 9fb3c69fabe9c74dd467f3d4032cdea50d79da3c

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
<<<<<<< HEAD
        setProducts(res.data);
=======
        setProducts(res.data.slice(0, 8)); // Show 8 featured products
>>>>>>> 9fb3c69fabe9c74dd467f3d4032cdea50d79da3c
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD
=======

>>>>>>> 9fb3c69fabe9c74dd467f3d4032cdea50d79da3c
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    alert(`✅ ${product.name} added to cart!`);
  };

<<<<<<< HEAD
  const nextProduct = () => setCurrentProductSlide((prev) => (prev + 1) % Math.max(1, Math.ceil(products.length / 2)));
  const prevProduct = () => setCurrentProductSlide((prev) => (prev - 1 + Math.max(1, Math.ceil(products.length / 2))) % Math.max(1, Math.ceil(products.length / 2)));

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Trust Banner */}
      <div className="bg-orange-600 text-white py-3 text-center text-sm font-medium px-4">
        🇰🇪 Trusted by 25,000+ Kenyans • 30-Day Money Back • Free Delivery in Roysambu
      </div>

      {/* Static Hero */}
      <section className="relative h-[75vh] md:h-screen overflow-hidden">
        <img src={heroImage} alt="ArmorCovers Store" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight leading-tight">
              HOME OF PLEASURE
            </h1>
            <p className="text-lg md:text-2xl mb-8 md:mb-10 max-w-xl mx-auto">
              Discover premium ArmorCovers, electronics, home &amp; living, vehicles and more
            </p>
            <Link to="/products" className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 md:px-12 py-4 rounded-2xl font-semibold text-lg md:text-xl hover:bg-gray-100 transition">
              Shop Now <ArrowRight size={26} />
=======
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 via-red-500 to-amber-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
            Kenya's Most Trusted<br />Marketplace
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Buy and sell quality products from trusted vendors across Kenya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition flex items-center justify-center gap-3"
            >
              Start Shopping <ArrowRight size={24} />
            </Link>
            <Link 
              to="/seller-dashboard" 
              className="border-2 border-white text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition"
            >
              Become a Seller
>>>>>>> 9fb3c69fabe9c74dd467f3d4032cdea50d79da3c
            </Link>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* PROFESSIONAL CONTACT BLOCK */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 text-white text-center border border-white/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">Contact Us</h3>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-lg mx-auto">
              {/* Phone */}
              <a href="tel:0796985894" className="group flex flex-col items-center gap-4 hover:scale-105 transition-all">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center group-hover:bg-white/30 transition">
                  <Phone size={40} className="text-white" />
                </div>
                <div>
                  <p className="text-sm opacity-75">Call Us</p>
                  <p className="text-2xl font-semibold">0796 985 894</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:engperfector2026@gmail.com" className="group flex flex-col items-center gap-4 hover:scale-105 transition-all">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center group-hover:bg-white/30 transition">
                  <Mail size={40} className="text-white" />
                </div>
                <div>
                  <p className="text-sm opacity-75">Email Us</p>
                  <p className="text-xl font-semibold break-all">engperfector2026@gmail.com</p>
                </div>
              </a>
            </div>
=======
      {/* STATS BAR */}
      <div className="bg-white py-8 border-b">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-orange-500">25K+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-500">1.5K+</div>
            <p className="text-gray-600">Active Sellers</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-500">47</div>
            <p className="text-gray-600">Counties</p>
>>>>>>> 9fb3c69fabe9c74dd467f3d4032cdea50d79da3c
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Stats */}
      <div className="bg-white py-6 md:py-8 border-b">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><div className="text-3xl md:text-4xl font-bold text-orange-500">25K+</div><p className="text-sm">Happy Customers</p></div>
          <div><div className="text-3xl md:text-4xl font-bold text-orange-500">1.5K+</div><p className="text-sm">Active Sellers</p></div>
          <div><div className="text-3xl md:text-4xl font-bold text-orange-500">47</div><p className="text-sm">Counties</p></div>
          <div><div className="text-3xl md:text-4xl font-bold text-orange-500">4.9★</div><p className="text-sm">Rating</p></div>
        </div>
      </div>

      {/* MAIN 3-COLUMN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-bold text-xl md:text-2xl mb-6 flex items-center gap-3">
                <Shield className="text-orange-500" size={28} /> Why ArmorCovers?
              </h3>
              <ul className="space-y-6 text-gray-700 text-sm md:text-base">
                <li className="flex gap-4"><Truck size={26} className="text-orange-500 mt-1 flex-shrink-0" /><div><strong>Fast Delivery</strong><p>Same day in Roysambu</p></div></li>
                <li className="flex gap-4"><Award size={26} className="text-orange-500 mt-1 flex-shrink-0" /><div><strong>Premium Quality</strong><p>All categories</p></div></li>
                <li className="flex gap-4"><Users size={26} className="text-orange-500 mt-1 flex-shrink-0" /><div><strong>Local Support</strong><p>Real Kenyans helping Kenyans</p></div></li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-bold text-lg md:text-xl mb-4">Our Location - Roysambu</h3>
              <div className="h-64 md:h-72 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.817!2d36.821!3d-1.210!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10a5b5c5b5b5%3A0x5b5b5b5b5b5b5b5b!2sRoysambu%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1721123456789"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Featured Products - Middle */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
              <Link to="/products" className="text-orange-500 hover:underline flex items-center gap-2 text-sm md:text-base">View All <ArrowRight /></Link>
            </div>

            {loading ? (
              <p className="text-center py-12">Loading products...</p>
            ) : (
              <div className="relative">
                <div className="overflow-hidden">
                  <div className="flex gap-4 md:gap-6 transition-transform duration-500" style={{ transform: `translateX(-${currentProductSlide * 100}%)` }}>
                    {products.map((product) => (
                      <div key={product._id} className="min-w-[88%] sm:min-w-[48%] lg:min-w-[48%] bg-white rounded-3xl shadow-md overflow-hidden">
                        <div className="h-52 md:h-64">
                          <img src={product.image ? `http://localhost:5000${product.image}` : "https://picsum.photos/id/1060/600/400"} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-5 md:p-6">
                          <p className="uppercase text-xs text-orange-500">{product.category}</p>
                          <h3 className="font-semibold text-lg md:text-xl my-3 line-clamp-2">{product.name}</h3>
                          <div className="flex justify-between items-center">
                            <p className="text-2xl md:text-3xl font-bold text-orange-600">KSh {product.price.toLocaleString()}</p>
                            <button onClick={() => addToCart(product)} className="bg-orange-500 text-white p-3 md:p-4 rounded-2xl hover:bg-orange-600"><ShoppingCart size={24} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={prevProduct} className="absolute -left-3 md:-left-5 top-1/2 bg-white shadow-xl p-3 rounded-full z-10"><ChevronLeft size={26} /></button>
                <button onClick={nextProduct} className="absolute -right-3 md:-right-5 top-1/2 bg-white shadow-xl p-3 rounded-full z-10"><ChevronRight size={26} /></button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 order-3 lg:order-3">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-3xl p-6 md:p-9 shadow-xl sticky top-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Home of Pleasure</h3>
              <p className="mb-8 text-sm md:text-base">Discover premium products across Electronics, Vehicles, Home &amp; Living and more.</p>
              <Link to="/products" className="block bg-white text-orange-600 py-4 rounded-2xl text-center font-semibold">Shop All Categories →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Store Carousel */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">ArmorCovers Store</h2>
            <p className="text-gray-600">Premium modern commodities for every lifestyle</p>
          </div>
          <div className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl">
            {storeHighlights.map((item, index) => (
              <div key={index} className={`absolute inset-0 transition-all duration-700 ${index === currentStoreSlide ? 'opacity-100' : 'opacity-0'}`}>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                  <h3 className="text-3xl md:text-5xl font-bold mb-3">{item.title}</h3>
                  <p className="text-lg md:text-2xl mb-6 md:mb-8">{item.desc}</p>
                  <Link to="/products" className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 md:px-10 py-4 rounded-2xl font-semibold hover:bg-gray-100">
                    Shop Now <ArrowRight size={26} />
                  </Link>
                </div>
              </div>
            ))}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {storeHighlights.map((_, i) => (
                <button key={i} onClick={() => setCurrentStoreSlide(i)} className={`w-3 h-3 rounded-full transition-all ${i === currentStoreSlide ? 'bg-white scale-125' : 'bg-white/60'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-3xl shadow">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, k) => <Star key={k} className="text-orange-500" size={18} />)}
                </div>
                <p className="italic text-gray-700 mb-6 text-sm md:text-base">"{t.text}"</p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            ))}
          </div>
=======
      {/* FEATURED PRODUCTS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-4xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-orange-500 hover:underline flex items-center gap-2">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
                  <div className="h-56 bg-gray-100 relative">
                    <img
                      src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/400"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="uppercase text-xs tracking-widest text-orange-500 mb-1">{product.category}</p>
                    <h3 className="font-semibold text-lg line-clamp-2 mb-3">{product.name}</h3>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-bold text-orange-600">KSh {product.price.toLocaleString()}</p>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-orange-500 text-white p-3 rounded-2xl hover:bg-orange-600 transition"
                      >
                        <ShoppingCart size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SELLER CALL TO ACTION */}
      <section className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-2xl text-gray-400 mb-10">Join thousands of successful Kenyan entrepreneurs on ArmorCovers</p>
          <Link 
            to="/seller-dashboard" 
            className="inline-block bg-orange-500 hover:bg-orange-600 px-16 py-6 rounded-3xl text-2xl font-semibold transition"
          >
            Start Selling Today →
          </Link>
>>>>>>> 9fb3c69fabe9c74dd467f3d4032cdea50d79da3c
        </div>
      </section>
    </div>
  );
}

export default Home;