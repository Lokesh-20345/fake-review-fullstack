import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">AI-POWERED REVIEW ANALYSIS</p>

          <h1>
            Detect Fake Reviews
            <span> with Machine Learning</span>
          </h1>

          <p className="hero-description">
            Analyze product reviews and identify whether they are
            genuine or potentially fake using our machine learning
            system.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="primary-button">
              Explore Products
            </Link>

            <Link to="/analyzer" className="secondary-button">
              Analyze a Review
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="shield-icon">✓</div>

          <h2>Review Analyzer</h2>

          <p>
            Enter a product review and get an instant
            classification.
          </p>

          <div className="demo-result">
            <span>Sample Result</span>
            <strong>✓ Genuine Review</strong>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>Machine Learning</h3>
          <p>
            Reviews are analyzed using a trained machine learning
            model.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast Analysis</h3>
          <p>
            Submit a review and receive the prediction through our
            API.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Simple & Secure</h3>
          <p>
            A clean interface designed for easy review analysis.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;