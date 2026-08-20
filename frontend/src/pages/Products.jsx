import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="page products-page">
      <div className="section-heading">
        <p className="hero-label">PRODUCT CATALOG</p>

        <h1>Explore Our Products</h1>

        <p>
          Browse products and analyze reviews to identify
          potentially fake feedback.
        </p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <span>📦</span>
              )}
            </div>

            <div className="product-content">
              <span className="product-category">
                {product.category}
              </span>

              <h2>{product.name}</h2>

              <p>{product.description}</p>

              <div className="product-bottom">
                <strong>₹{product.price}</strong>

                <Link
                  to={`/products/${product.id}`}
                  className="view-button"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;