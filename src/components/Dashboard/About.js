import React from "react";
import "../Styles/About.css"; // Importing the external CSS file

const About = () => {
  return (
    <section className="about-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Connecting Parents & Teachers, Building a Better Future</h1>
        <p>Our AI-powered communication portal enhances student performance through real-time insights.</p>
      </div>

      {/* Mission & Vision Section */}
      <div className="mission-vision">
        <div className="mission">
          <h2>🎯 Our Mission</h2>
          <p>
            To revolutionize parent-teacher communication with <strong>AI-driven analytics, real-time updates</strong>, 
            and a seamless interaction platform for better student outcomes.
          </p>
        </div>
        <div className="vision">
          <h2>🚀 Our Vision</h2>
          <p>
            Empower educators and parents with smart tools to track <strong>student progress, attendance, and assignments</strong> 
            efficiently, fostering academic excellence.
          </p>
        </div>
      </div>

      {/* AI Features Section */}
      <div className="features-section">
        <h2>🔍 AI-Powered Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span>📊</span>
            <h3>Graphical Insights</h3>
            <p>Interactive charts for attendance & performance trends.</p>
          </div>
          <div className="feature-card">
            <span>🤖</span>
            <h3>AI Chatbot</h3>
            <p>Instant academic queries & student progress updates.</p>
          </div>
          <div className="feature-card">
            <span>📩</span>
            <h3>Real-time Alerts</h3>
            <p>Instant notifications on attendance, remarks & assignments.</p>
          </div>
          <div className="feature-card">
            <span>📝</span>
            <h3>Smart Study Plans</h3>
            <p>Personalized learning recommendations for students.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>💬 What People Say</h2>
        <div className="testimonial-box">
          <p>"This platform has made tracking my child's progress effortless. A game changer!"</p>
          <span>— A Happy Parent</span>
        </div>
        <div className="testimonial-box">
          <p>"The AI recommendations and attendance tracking save so much time. Love it!"</p>
          <span>— A School Teacher</span>
        </div>
      </div>
    </section>
  );
};

export default About;
