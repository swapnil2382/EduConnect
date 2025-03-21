"use client"

import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../Styles/TeacherDashboard.css"
import TeacherInputs from "./TeacherInputs"
import TeacherHistory from "./TeacherHistory"
import TeacherUploads from "./TeacherUploads" // Ensure you have this component for handling uploads
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const TeacherDashboard = () => {
  const { user } = useContext(AuthContext)
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState("")
  const [attendanceHistory, setAttendanceHistory] = useState([])
  const [performanceHistory, setPerformanceHistory] = useState([])
  const [remarkHistory, setRemarkHistory] = useState([])
  const [uploadHistory, setUploadHistory] = useState([]) // Add state for upload history
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    if (!user || user.role !== "teacher") return
    setLoading(true)
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err))
      .finally(() => setLoading(false))
  }, [user])

  useEffect(() => {
    if (selectedStudent) fetchStudentHistory()
  }, [selectedStudent])

  const fetchStudentHistory = async () => {
    try {
      setLoading(true)
      const [attendanceRes, performanceRes, remarkRes, uploadRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/attendance/${selectedStudent}`),
        axios.get(`http://localhost:5000/api/performance/${selectedStudent}`),
        axios.get(`http://localhost:5000/api/remarks/${selectedStudent}`),
        axios.get(`http://localhost:5000/upload/student/${selectedStudent}`)
      ])
      setAttendanceHistory(attendanceRes.data)
      setPerformanceHistory(performanceRes.data)
      setRemarkHistory(remarkRes.data)
      setUploadHistory(uploadRes.data) // Set the upload history
    } catch (error) {
      console.error("Error fetching student history:", error)
    } finally {
      setLoading(false)
    }
  }

  // Prepare Data for Chart
  const chartData = attendanceHistory.map((record, index) => ({
    date: record.date,
    Attendance: record.status === "Present" ? 1 : 0, // 1 for Present, 0 for Absent
    Performance: performanceHistory[index]?.score || 0, // Use performance score
    Remarks: remarkHistory[index] ? 1 : 0, // 1 if a remark exists
  }))

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* Left Sidebar - Student Selection & Inputs */}
        <div className="sidebar">
          <TeacherInputs
            students={students}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            fetchStudentHistory={fetchStudentHistory}
          />
        </div>

        {/* Right Side - Main Content */}
        <div className="main-content">
          {/* Tabs Navigation */}
          <div className="dashboard-tabs">
            <button
              className={`tab-button ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`tab-button ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              Student History
            </button>
  
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <>
                {activeTab === "dashboard" && (
                  <div className="dashboard-overview">
                    {/* Hide Welcome Message if Student is Selected */}
                    {!selectedStudent ? (
                      <>
                        <h2>Welcome, {user?.name}</h2>
                        <p>Select a student from the sidebar to view and update their information.</p>
                      </>
                    ) : (
                      <>
                        <h3>Selected Student: ID {selectedStudent}</h3>

                        {/* Line Chart */}
                        <div className="chart-container">
                          <h3>Student Performance Overview</h3>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="Attendance" stroke="#8884d8" name="Attendance (1=Present, 0=Absent)" />
                              <Line type="monotone" dataKey="Performance" stroke="#82ca9d" name="Performance Score" />
                              <Line type="monotone" dataKey="Remarks" stroke="#ff7300" name="Remarks (1=Yes, 0=No)" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeTab === "history" &&
                  (selectedStudent ? (
                    <TeacherHistory
                      selectedStudent={selectedStudent}
                      attendanceHistory={attendanceHistory}
                      performanceHistory={performanceHistory}
                      remarkHistory={remarkHistory}
                      uploadHistory={uploadHistory} // Pass the upload history
                    />
                  ) : (
                    <p className="no-student">Select a student to view history.</p>
                  ))}

                {activeTab === "uploads" && (
                  <TeacherUploads uploadHistory={uploadHistory} /> // Pass upload history to TeacherUploads
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default TeacherDashboard
