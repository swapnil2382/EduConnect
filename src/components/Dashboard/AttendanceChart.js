import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../Styles/ParentDashboard.css"; // Import CSS for styling

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = ({ studentID }) => {
    const [attendanceData, setAttendanceData] = useState(null);
    const [insights, setInsights] = useState(null);
    const [period, setPeriod] = useState("weekly");

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/attendance/report/${studentID}?period=${period}`
                );

                const records = response.data.attendanceRecords;
                if (!records || records.length === 0) {
                    setAttendanceData(null);
                    setInsights(null);
                    return;
                }

                let presentCount = records.filter((r) => r.status === "Present").length;
                let absentCount = records.filter((r) => r.status === "Absent").length;
                let totalCount = presentCount + absentCount;

                let attendancePercentage = ((presentCount / totalCount) * 100).toFixed(1);
                let warningMessage =
                    attendancePercentage < 75
                        ? "Low Attendance! Below 75%."
                        : "Attendance is good.";

                setAttendanceData({
                    labels: [`Present (${presentCount})`, `Absent (${absentCount})`],
                    datasets: [
                        {
                            data: [presentCount, absentCount],
                            backgroundColor: ["#4CAF50", "#FF0000"],
                            hoverBackgroundColor: ["#45A049", "#D32F2F"],
                        },
                    ],
                });

                setInsights({
                    totalPresent: presentCount,
                    totalAbsent: absentCount,
                    attendancePercentage,
                    warningMessage,
                });
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchAttendanceData();
    }, [studentID, period]);

    return (
        <div className="attendance-chart-container">
            <h3>Attendance Insights 📊</h3>
            <select className="period-select" onChange={(e) => setPeriod(e.target.value)}>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>

            {attendanceData ? (
                <>
                    <div className="chart-wrapper">
                        <Pie data={attendanceData} />
                    </div>
                    <div className="attendance-summary">
                        <p>📈 Attendance Percentage: <b>{insights.attendancePercentage}%</b></p>
                        <p className={insights.attendancePercentage < 75 ? "attendance-warning" : "attendance-good"}>
                            {insights.warningMessage}
                        </p>
                    </div>
                </>
            ) : (
                <p className="no-data">No attendance data available.</p>
            )}
        </div>
    );
};

export default AttendanceChart;
