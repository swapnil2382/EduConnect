import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import PerformanceSection from "./PerformanceSection";
import AttendanceSection from "./AttendanceSection";
import RemarksSection from "./RemarksSection";
import "../Styles/ParentDashboard.css";

const ParentDashboard = () => {
    const { user } = useContext(AuthContext);
    const [attendance, setAttendance] = useState([]);
    const [performance, setPerformance] = useState([]);
    const [remarks, setRemarks] = useState([]);
    const [uploads, setUploads] = useState([]); // 🔥 Store uploaded files
    const [loading, setLoading] = useState(true);

    const studentID = user?.studentID; // Get Student ID from AuthContext

    useEffect(() => {
        if (!studentID) return;

        setLoading(true);

        Promise.all([
            axios.get(`http://localhost:5000/api/performance/${studentID}`)
                .then(res => setPerformance(res.data || []))
                .catch(err => {
                    console.error("Performance Fetch Error:", err);
                    toast.error("Failed to load performance data.");
                }),

            axios.get(`http://localhost:5000/api/attendance/${studentID}`)
                .then(res => setAttendance(res.data || []))
                .catch(err => {
                    console.error("Attendance Fetch Error:", err);
                    toast.error("Failed to load attendance data.");
                }),

            axios.get(`http://localhost:5000/api/remarks/${studentID}`)
                .then(res => setRemarks(res.data || []))
                .catch(err => {
                    console.error("Remarks Fetch Error:", err);
                    toast.error("Failed to load remarks.");
                }),

            axios.get(`http://localhost:5000/upload/student/${studentID}`) // 🔥 Fetch files for student
                .then(res => setUploads(res.data || []))
                .catch(err => {
                    console.error("Upload Fetch Error:", err);
                    toast.error("Failed to load uploaded files.");
                }),
        ]).finally(() => setLoading(false));
    }, [studentID]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="parent-dashboard">
            <h2>Parent Dashboard</h2>

            {/* 📊 Performance Section */}
            <div className="dashboard-section">
                <h1>📊 Performance</h1>
                {performance.length > 0 ? (
                    <PerformanceSection performance={performance} studentID={studentID} />
                ) : (
                    <p className="no-data-message">🚫 No performance data available.</p>
                )}
            </div>

            {/* 📅 Attendance Section */}
            <div className="dashboard-section">
                <h1>📅 Attendance</h1>
                {attendance.length > 0 ? (
                    <AttendanceSection attendance={attendance} studentID={studentID} />
                ) : (
                    <p className="no-data-message">🚫 No attendance records available.</p>
                )}
            </div>

            {/* 📝 Remarks Section */}
            <div className="dashboard-section">
                <h1>📝 Remarks</h1>
                {remarks.length > 0 ? (
                    <RemarksSection remarks={remarks} />
                ) : (
                    <p className="no-data-message">🚫 No remarks available.</p>
                )}
            </div>

            {/* 📂 Uploaded Files Section */}
            <div className="dashboard-section">
                <h1>📂 Uploaded Files</h1>
                {uploads.length > 0 ? (
                    <ul className="uploaded-files">
                    {uploads.map((file) => {
                        const uploadDate = new Date(file.uploadDate);  // Use uploadDate from backend
                        const formattedDate = uploadDate instanceof Date && !isNaN(uploadDate)
                            ? uploadDate.toLocaleDateString()
                            : "Invalid Date";  // Fallback if the date is invalid
                
                        return (
                            <li key={file._id} className="uploaded-file-item">
                                <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                                    {file.fileName}
                                </a>
                                <span className="upload-date">📅 {formattedDate}</span>
                            </li>
                        );
                    })}
                </ul>
                
                ) : (
                    <p className="no-data-message">🚫 No files uploaded for this student.</p>
                )}
            </div>
        </div>
    );
};

export default ParentDashboard;
