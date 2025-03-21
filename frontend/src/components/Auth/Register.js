import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Register.css"; // Import the new Register CSS

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        studentID: "",
        studentName: "",
        studentClass: "",
        studentDivision: "",
        teacherClass: "",
        teacherDivision: "",
        address: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", formData);
            console.log(response.data);
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
            console.error("Registration Error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="register-wrapper">
            <div className="register-container">
                <button className="close-btn" onClick={() => navigate("/")}>×</button> {/* Close button to go home */}
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />

                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        <option value="parent">Parent</option>
                        <option value="teacher">Teacher</option>
                    </select>

                    {formData.role === "parent" && (
                        <>
                            <input type="text" name="studentID" placeholder="Student ID" value={formData.studentID} onChange={handleChange} required />
                            <input type="text" name="studentName" placeholder="Student Name" value={formData.studentName} onChange={handleChange} required />
                            <input type="text" name="studentClass" placeholder="Student Class" value={formData.studentClass} onChange={handleChange} required />
                            <input type="text" name="studentDivision" placeholder="Student Division" value={formData.studentDivision} onChange={handleChange} required />
                        </>
                    )}

                    {formData.role === "teacher" && (
                        <>
                            <input type="text" name="teacherClass" placeholder="Teacher's Class" value={formData.teacherClass} onChange={handleChange} required />
                            <input type="text" name="teacherDivision" placeholder="Teacher's Division" value={formData.teacherDivision} onChange={handleChange} required />
                        </>
                    )}

                    <button type="submit" className="register-btn">Register</button>
                </form>

                <p className="login-link">
                    Have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
