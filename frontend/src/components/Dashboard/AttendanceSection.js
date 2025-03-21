import { useState } from "react";
import AttendanceChart from "../Dashboard/AttendanceChart";

const AttendanceSection = ({ attendance, studentID }) => {
    const [visibleCount, setVisibleCount] = useState(10);

    const handleSeeMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };

    const handleWindUp = () => {
        setVisibleCount(10);
    };

    return (
        <div className="attendance-section">
            {attendance.length > 0 ? (
                <div className="attendance-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.slice(0, visibleCount).map((data, index) => (
                                <tr key={index}>
                                    <td>{new Date(data.date).toLocaleDateString()}</td>
                                    <td>{data.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Button container */}
                    <div className="button-container">
                        <button className="see-more" onClick={handleSeeMore}>
                            See More
                        </button>

                        {visibleCount > 10 && (
                            <button className="wind-up" onClick={handleWindUp}>
                                Wind Up
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p className="no-data">No attendance data available.</p>
            )}

            {studentID && (
                <div className="attendance-chart">
                    <AttendanceChart studentID={studentID} />
                </div>
            )}
        </div>
    );
};

export default AttendanceSection;
