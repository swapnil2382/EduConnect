import { useState } from "react";
import { toast } from "react-toastify";

const PerformanceSection = ({ performance }) => {
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [aiSuggestion, setAiSuggestion] = useState("");
    const [studyPlan, setStudyPlan] = useState({});
    const [analyzing, setAnalyzing] = useState(false);
    const [showStudyPlan, setShowStudyPlan] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(""); 

    // Extract unique months from performance data for dropdown
    const availableMonths = [...new Set(performance.map((data) =>
        data.date ? new Date(data.date.split("/").reverse().join("-")).toLocaleString('default', { month: 'long', year: 'numeric' }) : "Invalid Date"
    ))];

    // Filter performance data based on selected month
    const filteredPerformance = performance.filter((data) => {
        if (!data.date) return false;
        const formattedDate = new Date(data.date.split("/").reverse().join("-")).toLocaleString('default', { month: 'long', year: 'numeric' });
        return selectedMonth === "" || formattedDate === selectedMonth;
    });

    // Handle subject selection with month-based uniqueness
    const handleSubjectSelection = (subject, month) => {
        const key = `${subject}-${month}`;
        setSelectedSubjects((prev) =>
            prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
        );
    };

    // AI Performance Analysis
    const analyzePerformance = async () => {
        if (selectedSubjects.length === 0) {
            toast.error("Please select subjects to analyze.");
            return;
        }

        setAnalyzing(true);

        try {
            const marksData = filteredPerformance.reduce((acc, data) => {
                const key = `${data.subject}-${selectedMonth}`;
                if (selectedSubjects.includes(key) && data.marks !== null && data.outOf !== null) {
                    acc[data.subject] = { marks: data.marks, outOf: data.outOf };
                }
                return acc;
            }, {});

            if (Object.keys(marksData).length === 0) {
                setAiSuggestion("");
                setStudyPlan({});
                toast.error("No valid marks available for selected subjects.");
                setAnalyzing(false);
                return;
            }

            const response = await fetch("http://127.0.0.1:5000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ marks: marksData }),
            });

            if (!response.ok) throw new Error("Failed to fetch AI suggestion");

            const data = await response.json();
            setAiSuggestion(data.suggestion);
            setStudyPlan(data.weak_subjects || {});
            toast.success("AI analysis completed!");
        } catch (error) {
            toast.error("AI analysis failed. Please try again.");
        } finally {
            setAnalyzing(false);
        }
    };

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

            {/* Performance Table */}
            <table className="performance-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Out of</th>
                        <th>Comments</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPerformance.length > 0 ? (
                        filteredPerformance.map((data, index) => {
                            const formattedDate = data.date ? new Date(data.date.split("/").reverse().join("-")).toLocaleDateString('en-GB') : "Invalid Date";
                            const key = `${data.subject}-${selectedMonth}`;
                            return (
                                <tr key={index}>
                                    <td>{formattedDate}</td>
                                    <td>{data.subject}</td>
                                    <td>{data.marks}</td>
                                    <td>{data.outOf ?? "N/A"}</td>
                                    <td>{data.comments || "No comments"}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedSubjects.includes(key)}
                                            onChange={() => handleSubjectSelection(data.subject, selectedMonth)}
                                        />
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr><td colSpan="6">No records found for this month.</td></tr>
                    )}
                </tbody>
            </table>

            {/* Analyze Button */}
            <button className="analyze-btn" onClick={analyzePerformance} disabled={analyzing || selectedSubjects.length === 0}>
                {analyzing ? "⏳ Analyzing..." : "🤖 Analyze Performance with AI"}
            </button>

            {/* AI Analysis Results */}
            {aiSuggestion && (
                <div className="ai-suggestion-box">
                    <h4>📊 AI Analysis Result</h4>
                    <p><strong>Suggestion:</strong> {aiSuggestion}</p>
                    {showStudyPlan && Object.keys(studyPlan).length > 0 && (
                        <div>
                            <h4>📚 Personalized Study Plan</h4>
                            <ul>
                                {Object.entries(studyPlan).map(([subject, details], index) => (
                                    <li key={index}>
                                        <strong>{subject}:</strong>
                                        <ul>
                                            <li>📊 Marks: {details.marks} / {details.outOf} ({details.percentage}%)</li>
                                            <li>📝 Recommendation: {details.recommendation}</li>
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button onClick={() => setShowStudyPlan(!showStudyPlan)}>
                        {showStudyPlan ? "📉 Hide Tips" : "📚 See the Tips"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PerformanceSection;
