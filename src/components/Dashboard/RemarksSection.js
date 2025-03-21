import { useState } from "react";

const RemarksSection = ({ remarks }) => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [visibleCount, setVisibleCount] = useState(10); // Initial limit to 10

    // Extract unique months from remarks data
    const availableMonths = [...new Set(remarks.map((data) =>
        data.date ? new Date(data.date).toLocaleString('default', { month: 'long', year: 'numeric' }) : "Invalid Date"
    ))];

    // Filter remarks based on selected month
    const filteredRemarks = remarks.filter((data) => {
        if (!data.date) return false;
        const formattedDate = new Date(data.date).toLocaleString('default', { month: 'long', year: 'numeric' });
        return selectedMonth === "" || formattedDate === selectedMonth;
    });

    // Slice remarks based on visible count
    const visibleRemarks = filteredRemarks.slice(0, visibleCount);

    return (
        <div className="section">
            {/* Month Selection Dropdown */}
            <div className="month-selector">
                <label htmlFor="month">📅 Select Month: </label>
                <select id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    <option value="">All Months</option>
                    {availableMonths.map((month, index) => (
                        <option key={index} value={month}>{month}</option>
                    ))}
                </select>
            </div>

            {/* Remarks Table */}
            {visibleRemarks.length > 0 ? (
                <table className="remarks-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleRemarks.map((data, index) => (
                            <tr key={index}>
                                <td>{new Date(data.date).toLocaleDateString('en-GB')}</td>
                                <td>{data.remark}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-data">No remarks available for this month.</p>
            )}

            {/* "See More" & "Wind Up" Buttons */}
            {filteredRemarks.length > 10 && (
                <div className="button-container">
                    {visibleCount < filteredRemarks.length ? (
                        <button className="see-more-btn" onClick={() => setVisibleCount(visibleCount + 10)}> See More</button>
                    ) : (
                        <button className="wind-up-btn" onClick={() => setVisibleCount(10)}> Wind Up</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default RemarksSection;
