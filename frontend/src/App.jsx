
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// User pages
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetailsPage.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/CheckOut.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import About from './pages/About.jsx';
import Disclaimer from './pages/Disclaimer.jsx';
import ReturnPolicy from './pages/ReturnPolicy.jsx';

// Admin pages
import AdminDashboard from './admin/AdminDashboard.jsx';
import AddProduct from './admin/AddProduct.jsx';
import AdminProducts from './admin/AdminProducts.jsx';
import EditProduct from './admin/EditProduct.jsx';
import AdminOrders from './admin/AdminOrders.jsx';
import AdminUsers from './admin/AdminUsers.jsx';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />

        {/* Static Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/return" element={<ReturnPolicy />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
