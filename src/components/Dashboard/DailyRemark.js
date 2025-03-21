import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const DailyRemark = ({ selectedStudent }) => {
    const [remarkText, setRemarkText] = useState("");

    const submitRemark = async () => {
        if (!selectedStudent || !remarkText.trim()) return toast.error("⚠️ Enter a remark!");

        try {
            await axios.post("http://localhost:5000/api/remarks", {
                studentID: selectedStudent.studentID,
                remark: remarkText,
            });
            toast.success("💬 Remark added!");
            setRemarkText("");
        } catch (error) {
            toast.error("❌ Failed to add remark.");
        }
    };

    return (
        <div className="section">
            <h3>Daily Remark</h3>
            <input type="text" value={remarkText} onChange={(e) => setRemarkText(e.target.value)} placeholder="Enter remark" />
            <button onClick={submitRemark}>Submit Remark</button>
        </div>
    );
};

export default DailyRemark;
