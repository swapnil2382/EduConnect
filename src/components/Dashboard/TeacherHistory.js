import { useState } from "react"
import { ChevronUp, ChevronDown, Calendar, CheckCircle, XCircle, BarChart2, MessageSquare, CloudUpload } from "lucide-react" // Import CloudUpload for upload history icon

const TeacherHistory = ({ selectedStudent, attendanceHistory, performanceHistory, remarkHistory, uploadHistory }) => {
  const [showFullHistory, setShowFullHistory] = useState({
    attendance: false,
    performance: false,
    remarks: false,
    uploads: false, // Track the uploads history visibility
  })

  const toggleHistory = (type) => {
    setShowFullHistory((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  const groupByMonth = (data) => {
    if (!data || data.length === 0) return {}
    const grouped = {}
    data.forEach((record) => {
      const date = new Date(record.date)
      if (isNaN(date.getTime())) return
      const monthYear = date.toLocaleString("default", { month: "long", year: "numeric" })
      if (!grouped[monthYear]) grouped[monthYear] = []
      grouped[monthYear].push(record)
    })
    return grouped
  }

  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A"
    const date = new Date(dateInput)
    if (isNaN(date.getTime())) return "N/A"
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      weekday: "long",
    })
  }

  const renderAttendanceStatus = (status) => {
    return (
      <span className={`status-${status.toLowerCase()}`}>
        {status === "Present" ? <CheckCircle size={14} /> : <XCircle size={14} />} {status}
      </span>
    )
  }

  const renderTable = (data, type) => {
    if (!data) data = []

    // Sort the data in descending order by date (newest first)
    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
    const groupedData = groupByMonth(sortedData)

    const displayedData = showFullHistory[type] ? groupedData : { "Recent Entries": sortedData.slice(0, 4) }

    return (
      <div className="history-section">
        <h4>
          {type === "attendance" ? (
            <>
              <Calendar size={18} /> Attendance History
            </>
          ) : type === "performance" ? (
            <>
              <BarChart2 size={18} /> Performance History
            </>
          ) : type === "remarks" ? (
            <>
              <MessageSquare size={18} /> Remarks
            </>
          ) : (
            <>
              <CloudUpload size={18} /> Upload History {/* Added upload history icon */}
            </>
          )}
        </h4>

        {Object.keys(displayedData).length > 0 ? (
          Object.keys(displayedData).map((month) => (
            <div key={month} className="month-group">
              <h5>{month}</h5>
              <table>
                <thead>
                  <tr>
                    {type === "attendance" && (
                      <>
                        <th>Date</th>
                        <th>Status</th>
                      </>
                    )}
                    {type === "performance" && (
                      <>
                        <th>Date</th>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Out of</th>
                        <th>Comments</th>
                      </>
                    )}
                    {type === "remarks" && (
                      <>
                        <th>Date</th>
                        <th>Remark</th>
                      </>
                    )}
                    {type === "uploads" && ( // Table headers for uploads
                      <>
                        <th>Date</th>
                        <th>File Name</th>
                        <th>File URL</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {displayedData[month].map((record) => (
                    <tr key={record._id || Math.random()}>
                      {type === "attendance" && (
                        <>
                          <td>{formatDate(record.date)}</td>
                          <td>{renderAttendanceStatus(record.status)}</td>
                        </>
                      )}
                      {type === "performance" && (
                        <>
                          <td>{formatDate(record.date)}</td>
                          <td>{record.subject}</td>
                          <td>
                            <strong>{record.marks}</strong>
                          </td>
                          <td>{record.outOf}</td>
                          <td>{record.comments || "-"}</td>
                        </>
                      )}
                      {type === "remarks" && (
                        <>
                          <td>{formatDate(record.date)}</td>
                          <td>{record.remark}</td>
                        </>
                      )}
                      {type === "uploads" && ( // Render the upload history
                        <>
                          <td>{formatDate(record.uploadDate || record.createdAt)}</td> {/* Use uploadDate or createdAt */}
                          <td>{record.fileName}</td>
                          <td><a href={record.fileUrl} target="_blank" rel="noopener noreferrer">View File</a></td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <table>
            <thead>
              <tr>
                {type === "attendance" && (
                  <>
                    <th>Date</th>
                    <th>Status</th>
                  </>
                )}
                {type === "performance" && (
                  <>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Out of</th>
                    <th>Comments</th>
                  </>
                )}
                {type === "remarks" && (
                  <>
                    <th>Date</th>
                    <th>Remark</th>
                  </>
                )}
                {type === "uploads" && ( // Table headers for uploads
                  <>
                    <th>Date</th>
                    <th>File Name</th>
                    <th>File URL</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="no-data-message">
                  🚫 No data available
                </td>
              </tr>
            </tbody>
          </table>
        )}

        <button className="toggle-button" onClick={() => toggleHistory(type)}>
          {showFullHistory[type] ? (
            <>
              <ChevronUp size={14} /> Collapse
            </>
          ) : (
            <>
              <ChevronDown size={14} /> View Full History
            </>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="history-container">
      <div className="history-inner">
        <h3> Student History (ID: {selectedStudent})</h3>
        {renderTable(attendanceHistory, "attendance")}
        {renderTable(performanceHistory, "performance")}
        {renderTable(remarkHistory, "remarks")}
        {renderTable(uploadHistory, "uploads")} {/* Added upload history section */}
      </div>
    </div>
  )
}

export default TeacherHistory
