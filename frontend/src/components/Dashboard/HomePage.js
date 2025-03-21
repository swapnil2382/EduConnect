"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Chat from "./Chat"
import { BookOpen, Calendar, MessageSquare, FileText } from "lucide-react"
import "../Styles/HomePage.css"

const HomePage = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  const handleGetStarted = () => {
    if (user) {
      if (user.role === "parent") {
        navigate("/parent-dashboard")
      } else if (user.role === "teacher") {
        navigate("/teacher-dashboard")
      }
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to EduConnect</h1>
          <h2>{user ? `Hello, ${user.name}!` : "Connecting Parents and Teachers"}</h2>
          <p>
            A comprehensive platform designed to bridge the gap between parents and teachers, providing real-time
            insights into student performance, attendance, and more.
          </p>
          <button className="get-started-btn" onClick={handleGetStarted}>
            {user ? "Go to Dashboard" : "Get Started"}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>

        <div className="features-grid">
          {/* Feature 1 - Attendance */}
          <div className="feature-card">
            <div className="feature-icon">
              <Calendar size={32} />
            </div>
            <h3>Attendance Tracking</h3>
            <p>
              Monitor your child's attendance with real-time updates and detailed reports. Get instant notifications for
              absences and view attendance trends over time.
            </p>
            <ul className="feature-list">
              <li>Real-time attendance updates</li>
              <li>Weekly and monthly attendance reports</li>
              <li>Visual attendance analytics</li>
              <li>Absence notifications</li>
            </ul>
          </div>

          {/* Feature 2 - Performance */}
          <div className="feature-card">
            <div className="feature-icon">
              <BookOpen size={32} />
            </div>
            <h3>Performance Insights</h3>
            <p>
              Access comprehensive academic performance data including test scores, assignments, and personalized
              AI-powered study recommendations.
            </p>
            <ul className="feature-list">
              <li>Detailed academic performance tracking</li>
              <li>AI-powered study suggestions</li>
              <li>Performance trend analysis</li>
              <li>Teacher comments and feedback</li>
            </ul>
          </div>

          {/* Feature 3 - Communication */}
          <div className="feature-card">
            <div className="feature-icon">
              <MessageSquare size={32} />
            </div>
            <h3>Seamless Communication</h3>
            <p>
              Stay connected with teachers through secure messaging and receive important updates about your child's
              education journey.
            </p>
            <ul className="feature-list">
              <li>Direct messaging with teachers</li>
              <li>School announcements and updates</li>
              <li>Organized conversation history</li>
              <li>Confidential communication</li>
            </ul>
          </div>

          {/* Feature 4 - Homework */}
          <div className="feature-card">
            <div className="feature-icon">
              <FileText size={32} />
            </div>
            <h3>Homework Management</h3>
            <p>
              Keep track of assignments, projects, and deadlines in one place. Monitor completion status and receive
              reminders for upcoming work.
            </p>
            <ul className="feature-list">
              <li>Centralized assignment tracking</li>
              <li>Deadline notifications</li>
              <li>Online submission capabilities</li>
              <li>Subject-specific performance reports</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Chat Component */}
      <Chat />
    </div>
  )
}

export default HomePage

