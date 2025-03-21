"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Calendar, Search, CheckSquare, MessageSquare, BarChart2 } from "lucide-react"
import TeacherUploads from "./TeacherUploads" // ✅ Import TeacherUploads

const TeacherInputs = ({
  students,
  selectedStudent,
  setSelectedStudent,
  searchQuery,
  setSearchQuery,
  fetchStudentHistory,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [attendanceStatus, setAttendanceStatus] = useState("")
  const [marks, setMarks] = useState("")
  const [outOf, setOutOf] = useState("")
  const [subject, setSubject] = useState("")
  const [comments, setComments] = useState("")
  const [remarkText, setRemarkText] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)

  const filteredStudents = students.filter(
    (student) =>
      student.studentID?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentName?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const markAttendance = async () => {
    if (!selectedStudent || !attendanceStatus) {
      toast.error("Please select a student and attendance status!")
      return
    }
    if (new Date(selectedDate) > new Date()) {
      toast.error("❌ Future dates are not allowed!")
      return
    }
    try {
      await axios.post("http://localhost:5000/api/attendance", {
        studentID: selectedStudent,
        status: attendanceStatus,
        date: selectedDate,
      })
      toast.success("Attendance marked successfully!")
      setAttendanceStatus("")
      fetchStudentHistory()
    } catch (error) {
      console.error("❌ Error marking attendance:", error.response?.data || error.message)
      toast.error("❌ Failed to mark attendance.")
    }
  }

  const submitRemark = async () => {
    if (!selectedStudent || !remarkText.trim()) {
      toast.error("Please select a student and enter a remark!")
      return
    }
    if (new Date(selectedDate) > new Date()) {
      toast.error("❌ Future dates are not allowed!")
      return
    }
    try {
      await axios.post("http://localhost:5000/api/remarks", {
        studentID: selectedStudent,
        remark: remarkText,
        date: selectedDate,
      })
      toast.success("Remark added successfully!")
      setRemarkText("")
      fetchStudentHistory()
    } catch (error) {
      console.error("❌ Error adding remark:", error.response?.data || error.message)
      toast.error("❌ Failed to add remark.")
    }
  }

  const markPerformance = async () => {
    if (!selectedStudent || !marks || !subject || !outOf) {
      toast.error("Please enter student, marks, subject, and total marks!")
      return
    }
    if (new Date(selectedDate) > new Date()) {
      toast.error("❌ Future dates are not allowed!")
      return
    }
    try {
      await axios.post("http://localhost:5000/api/performance", {
        studentID: selectedStudent,
        marks: Number.parseFloat(marks),
        outOf: Number.parseFloat(outOf),
        subject,
        comments,
        date: selectedDate,
      })
      toast.success("Performance updated successfully!")
      setMarks("")
      setOutOf("")
      setSubject("")
      setComments("")
      fetchStudentHistory()
    } catch (error) {
      console.error("❌ Error marking performance:", error.response?.data || error.message)
      toast.error("❌ Failed to update performance.")
    }
  }

  return (
    <div className="inputs-container">

      {/* Search Student Section */}
      <div className="section">
        <h3>Find Student</h3>
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by Student ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
          />
        </div>
        

        {searchQuery && showDropdown && (
          <ul className="student-list">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <li
                  key={student._id}
                  onClick={() => {
                    setSelectedStudent(student.studentID)
                    setSearchQuery(student.studentName)
                    setShowDropdown(false)
                  }}
                  className="student-item"
                >
                  {student.studentName} (ID: {student.studentID})
                </li>
              ))
            ) : (
              <li className="student-item">No matching students found</li>
            )}
          </ul>
        )}
      </div>
      <div className="section">
        <h3>
          <Calendar size={18} /> &nbsp; Select Date
        </h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-input"
        />
      </div>

      {/* Attendance Section */}
      <div className="section">
        <h3>
          <CheckSquare size={18} /> &nbsp; Mark Attendance
        </h3>
        <div className="inline-group">
          <select
            className="select-input"
            value={attendanceStatus}
            onChange={(e) => setAttendanceStatus(e.target.value)}
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <button className="btn small-btn" onClick={markAttendance}>
            Submit
          </button>
        </div>
      </div>

      {/* Daily Remark Section */}
      <div className="section">
        <h3>
          <MessageSquare size={18} /> &nbsp; Daily Remark
        </h3>
        <input
          type="text"
          className="text-input"
          placeholder="Enter remark"
          value={remarkText}
          onChange={(e) => setRemarkText(e.target.value)}
        />
        <button className="btn" onClick={submitRemark}>
          Submit Remark
        </button>
      </div>

      {/* Performance Section */}
      <div className="section">
        <h3>
          <BarChart2 size={18} /> &nbsp; Update Performance
        </h3>
        <input
          type="text"
          className="text-input"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <div className="inline-group">
          <input
            type="number"
            className="text-input"
            placeholder="Marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
          <span>/</span>
          <input
            type="number"
            className="text-input"
            placeholder="Out of"
            value={outOf}
            onChange={(e) => setOutOf(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="text-input"
          placeholder="Comments (optional)"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <button className="btn" onClick={markPerformance}>
          Update Performance
        </button>
      </div>
      

      {/* ✅ Include TeacherUploads and pass selectedStudent */}
      <TeacherUploads selectedStudent={selectedStudent} />
    </div>
  )
}

export default TeacherInputs
