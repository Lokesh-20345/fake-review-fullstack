import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fake-review-fullstack.onrender.com/api/products/`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page">
        <h2>Product not found.</h2>
        <Link to="/products" className="view-button">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="page product-details-page">
      <div className="product-details-card">
        <div className="details-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <span>📦</span>
          )}
        </div>

        <div className="details-content">
          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="details-description">
            {product.description}
          </p>

          <div className="details-price">
            ₹{product.price}
          </div>

          <p className="details-info">
            This product is available for review analysis.
            Check customer reviews to identify potentially
            suspicious feedback.
          </p>

          <div className="details-actions">
            <Link to="/analyzer" className="primary-button">
              Analyze a Review
            </Link>

            <Link to="/products" className="secondary-button">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;