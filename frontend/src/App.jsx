import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ReviewAnalyzer from "./pages/ReviewAnalyzer";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
  <div className="navbar-container">
    <Link to="/" className="logo">
      ReviewGuard
    </Link>

    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/analyzer">Review Analyzer</Link>
      <Link to="/about">About</Link>
    </div>
  </div>
</nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/analyzer" element={<ReviewAnalyzer />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <footer className="footer">
  <div className="footer-container">
    <div>
      <h3>ReviewGuard</h3>
      <p>
        AI-powered fake review detection using machine learning.
      </p>
    </div>

    <div className="footer-links">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/analyzer">Review Analyzer</Link>
      <Link to="/about">About</Link>
    </div>
  </div>

  <div className="footer-bottom">
    © 2026 ReviewGuard. All rights reserved.
  </div>
</footer>
    </BrowserRouter>
  );
}

export default App;

