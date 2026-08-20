function About() {
  return (
    <div className="page">
      <h1>About Fake Review Detection</h1>

      <p>
        This application uses Machine Learning to analyze product
        reviews and classify them as Fake or Genuine.
      </p>

      <h2>How It Works</h2>

      <div>
        <h3>1. Enter Review</h3>
        <p>
          The user enters a product review into the Review Analyzer.
        </p>
      </div>

      <div>
        <h3>2. Text Processing</h3>
        <p>
          The review is processed and converted into numerical
          features using the trained text vectorizer.
        </p>
      </div>

      <div>
        <h3>3. Machine Learning Model</h3>
        <p>
          The processed review is passed to the trained machine
          learning model.
        </p>
      </div>

      <div>
        <h3>4. Prediction</h3>
        <p>
          The model predicts whether the review is Fake or Genuine.
        </p>
      </div>

      <div>
        <h3>5. Result</h3>
        <p>
          The prediction is returned from Django to the React
          frontend and displayed to the user.
        </p>
      </div>

      <h2>Technology Stack</h2>

      <ul>
        <li>React.js - Frontend</li>
        <li>Django REST Framework - Backend API</li>
        <li>Python - Machine Learning</li>
        <li>Machine Learning - Review Classification</li>
        <li>SQLite - Database</li>
        <li>Axios - API Communication</li>
      </ul>
    </div>
  );
}

export default About;