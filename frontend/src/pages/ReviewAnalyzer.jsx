import { useState } from "react";
import axios from "axios";

function ReviewAnalyzer() {
  const [review, setReview] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeReview = () => {
    if (!review.trim()) {
      alert("Please enter a review.");
      return;
    }

    setLoading(true);
    setPrediction("");

    axios
      .post("https://fake-review-fullstack.onrender.com/api/predict/", {
        review: review,
      })
      .then((response) => {
        setPrediction(response.data.prediction);
      })
      .catch((error) => {
        console.error("Prediction error:", error);
        setPrediction("Unable to analyze review.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearReview = () => {
    setReview("");
    setPrediction("");
  };

  const isGenuine = prediction.includes("Genuine");
  const isFake = prediction.includes("Fake");

  return (
    <div className="page analyzer-page">
      <div className="section-heading">
        <p className="hero-label">AI REVIEW ANALYZER</p>

        <h1>Check Your Review</h1>

        <p>
          Enter a product review below and our machine learning
          model will analyze it.
        </p>
      </div>

      <div className="analyzer-card">
        <div className="analyzer-header">
          <div className="analyzer-icon">🤖</div>

          <div>
            <h2>Review Analysis</h2>
            <p>Enter the review you want to analyze.</p>
          </div>
        </div>

        <textarea
          rows="8"
          placeholder="Example: This product is amazing and works perfectly..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="character-count">
          {review.length} characters
        </div>

        <div className="analyzer-buttons">
          <button
            onClick={analyzeReview}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Review"}
          </button>

          <button
            className="clear-button"
            onClick={clearReview}
          >
            Clear
          </button>
        </div>

        {prediction && (
          <div
            className={`prediction-result ${
              isGenuine
                ? "genuine-result"
                : isFake
                ? "fake-result"
                : "unknown-result"
            }`}
          >
            <div className="result-icon">
              {isGenuine ? "✓" : isFake ? "✕" : "!"}
            </div>

            <div>
              <span>Analysis Result</span>
              <h2>{prediction}</h2>
            </div>
          </div>
        )}
      </div>

      <div className="analyzer-info">
        <h2>How does it work?</h2>

        <div className="analysis-steps">
          <div>
            <strong>1</strong>
            <span>Enter Review</span>
          </div>

          <div>
            <strong>2</strong>
            <span>Text Processing</span>
          </div>

          <div>
            <strong>3</strong>
            <span>ML Prediction</span>
          </div>

          <div>
            <strong>4</strong>
            <span>Get Result</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewAnalyzer;