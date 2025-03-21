import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css"; 

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Hardcoded Admin Credentials
        const adminEmail = "admin";
        const adminPassword = "Saraswati@2025";

        if (formData.email === adminEmail && formData.password === adminPassword) {
            // Save admin session
            const adminUser = { name: "Admin", role: "admin" };
            localStorage.setItem("token", "fake-admin-token"); // No real authentication
            localStorage.setItem("user", JSON.stringify(adminUser));

            navigate("/admin-dashboard"); // Redirect to admin dashboard
            window.location.reload(); // Refresh to reflect login state
        } else {
            alert("Invalid Admin Credentials!");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Admin Username" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="login-input"
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Admin Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="login-input"
                        required 
                    />
                    <button type="submit" className="login-btn">Login as Admin</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
