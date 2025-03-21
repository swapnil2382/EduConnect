import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserTable from "./UserTable";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [parents, setParents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [news, setNews] = useState([]); // State for storing news
    const [view, setView] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
        fetchNews();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/admin/users");
            if (response.data) {
                setParents(response.data.parents || []);
                setTeachers(response.data.teachers || []);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setParents([]);
            setTeachers([]);
        }
        setLoading(false);
    };

    const fetchNews = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/news/get");
            setNews(response.data || []);
        } catch (error) {
            console.error("Error fetching news:", error);
            setNews([]);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/delete-user/${id}`);
            fetchUsers();
            alert("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Error deleting user!");
        }
    };

    return (
        <div style={{ backgroundColor: "black", color: "white", width: "100vw", minHeight: "100vh", padding: "20px" }}>
            {/* College Name */}
            <h1 style={{ textAlign: "center", marginBottom: "10px", color: "#4361ee", fontSize: "28px" }}>
                Saraswati College of Engineering, Kharghar Navi Mumbai
            </h1>

            {/* Platform Overview (Gray Background) */}
            <div style={{ 
                backgroundColor: "#374151", padding: "20px", borderRadius: "8px", 
                textAlign: "center", marginBottom: "20px", maxWidth: "80%", marginLeft: "auto", marginRight: "auto" 
            }}>
                <h2 style={{ color: "#4361ee" }}>Platform Overview</h2>
                <p>View total users and latest news updates.</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "10px" }}>
                    <div style={{ backgroundColor: "black", padding: "15px", borderRadius: "8px", minWidth: "120px" }}>
                        <h4>Total Parents</h4>
                        <p style={{ fontSize: "20px", fontWeight: "bold", color: "#4361ee" }}>{parents.length}</p>
                    </div>
                    <div style={{ backgroundColor: "black", padding: "15px", borderRadius: "8px", minWidth: "120px" }}>
                        <h4>Total Teachers</h4>
                        <p style={{ fontSize: "20px", fontWeight: "bold", color: "#4361ee" }}>{teachers.length}</p>
                    </div>
                    <div style={{ backgroundColor: "black", padding: "15px", borderRadius: "8px", minWidth: "120px" }}>
                        <h4>Total News</h4>
                        <p style={{ fontSize: "20px", fontWeight: "bold", color: "#4361ee" }}>{news.length}</p>
                    </div>
                </div>
            </div>
            
            <h2 style={{ textAlign: "center", marginTop: "30px", color: "#4361ee", fontSize: "22px" }}>
                User Dashboard
            </h2>

            {/* Toggle View Buttons */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <button 
                    style={{ 
                        margin: "5px", padding: "12px 24px", border: "none", 
                        backgroundColor: view === "parents" ? "#4361ee" : "#374151", 
                        color: "white", cursor: "pointer", borderRadius: "5px", fontSize: "16px",
                        transition: "background 0.3s", outline: "none"
                    }} 
                    onClick={() => setView("parents")}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#4361ee"}
                    onMouseOut={(e) => e.target.style.backgroundColor = view === "parents" ? "#4361ee" : "#374151"}
                >
                    View Parents
                </button>
                <button 
                    style={{ 
                        margin: "5px", padding: "12px 24px", border: "none", 
                        backgroundColor: view === "teachers" ? "#4361ee" : "#374151", 
                        color: "white", cursor: "pointer", borderRadius: "5px", fontSize: "16px",
                        transition: "background 0.3s", outline: "none"
                    }} 
                    onClick={() => setView("teachers")}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#4361ee"}
                    onMouseOut={(e) => e.target.style.backgroundColor = view === "teachers" ? "#4361ee" : "#374151"}
                >
                    View Teachers
                </button>
            </div>

            {/* Show Loading State */}
            {loading && <p style={{ textAlign: "center", fontSize: "18px" }}>Loading users...</p>}

            {/* Show Table Based on Selection */}
            {!loading && view === "parents" && (
                <UserTable title="Parents" users={parents} handleDelete={handleDelete} fetchUsers={fetchUsers} />
            )}
            {!loading && view === "teachers" && (
                <UserTable title="Teachers" users={teachers} handleDelete={handleDelete} fetchUsers={fetchUsers} />
            )}
        </div>
    );
};

export default AdminDashboard;
