import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "../Styles/Login.css";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user is an admin (hardcoded credentials)
        if (formData.email === "admin" && formData.password === "Saraswati@2025") {
            const adminUser = { name: "Admin", role: "admin" };
            localStorage.setItem("token", "fake-admin-token"); // No real authentication
            localStorage.setItem("user", JSON.stringify(adminUser));

            navigate("/admin-dashboard"); // Redirect to admin dashboard
            window.location.reload();
            return;
        }

        // Otherwise, try logging in as a teacher or parent
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", formData);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            if (response.data.user.role === "parent") {
                navigate("/parent-dashboard");
            } else if (response.data.user.role === "teacher") {
                navigate("/teacher-dashboard");
            }

            window.location.reload();
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Email or Admin Username" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="login-input"
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="login-input"
                        required 
                    />
                    <button type="submit" className="login-btn">Login</button>
                </form>

               
            </div>
        </div>
    );
};

export default Login;
