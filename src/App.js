import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/components/Auth/Login.js";
import TeacherDashboard from "../src/components/Dashboard/TeacherDashboard.js";
import ParentDashboard from "../src/components/Dashboard/ParentDashboard.js";
import Register from '../src/components/Auth/Register.js'; 
import HomePage from '../src/components/Dashboard/HomePage.js';
import Navbar from '../src/components/Dashboard/Navbar.js';
import NewsPage from '../src/components/Dashboard/NewsPage.js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import ProfilePage from "./components/Dashboard/ProfilePage.js";
import About from "./components/Dashboard/About.js";
import Footer from "./components/Dashboard/Footer.js";
import AdminLogin from "./components/Auth/AdminLogin.js";
import AdminDashboard from "./components/Dashboard/AdminDashboard";

function App() {
  return (
    
    <Router>
      <ToastContainer autoClose={1000} />
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<NewsPage/>} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
