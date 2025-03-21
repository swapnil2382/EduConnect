"use client"

import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { User, Home, Info, Mail, Newspaper, LogIn, UserPlus, LogOut } from "lucide-react"
import "../Styles/Navbar.css"
import AddUserModal from "./AddUserModal" // Import modal component

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false) // Control modal visibility

  const handleProfileClick = () => {
    navigate("/profile")
  }

  const handleDashboardClick = () => {
    if (user?.role === "parent") {
      navigate("/parent-dashboard")
    } else if (user?.role === "teacher") {
      navigate("/teacher-dashboard")
    }
  }

  const handleLogoutClick = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <h1>EduConnect</h1>
          </div>

          <ul className="navbar-menu">
            {user?.role !== "admin" ? (
              <>
                <li className="navbar-item">
                  <Link to="/" className="navbar-link">
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/news" className="navbar-link">
                    <Newspaper size={18} />
                    <span>News</span>
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/about" className="navbar-link">
                    <Info size={18} />
                    <span>About</span>
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/contact" className="navbar-link">
                    <Mail size={18} />
                    <span>Contact</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="navbar-item">
                  <Link to="/admin-dashboard" className="navbar-link">
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/news" className="navbar-link">
                    <Newspaper size={18} />
                    <span>News</span>
                  </Link>
                </li>
                <li className="navbar-item">
                  <button className="add-user-btn" onClick={() => setIsModalOpen(true)}>
                    <UserPlus size={18} />
                    <span>Add User</span>
                  </button>
                </li>

              </>
            )}
          </ul>

          <div className="navbar-auth">
            {user ? (
              <div className="user-profile">
                {user.role === "admin" ? (
                  <>
                    <button className="logoutbtn" onClick={handleLogoutClick}>
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="user-avatar" onClick={handleProfileClick}>
                      <User size={20} />
                    </div>
                    <div className="user-details" onClick={handleProfileClick}>
                      <span className="user-name">{user.name}</span>
                      <span className="user-role">{user.role}</span>
                    </div>
                    <button className="dashboard-btn" onClick={handleDashboardClick}>
                      Dashboard
                    </button>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-btn">
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Add User Modal */}
      {isModalOpen && <AddUserModal closeModal={() => setIsModalOpen(false)} />}
    </>
  )
}

export default Navbar
