import { useState, useEffect } from "react";
import axios from "axios";

const TeacherUploads = ({ selectedStudent }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("✅ Updated studentID in TeacherUploads:", selectedStudent);
  }, [selectedStudent]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update the file when the user selects a file
  };

  const handleFileUpload = async () => {
    if (!selectedStudent) {
      setMessage("Please select a student first.");
      return;
    }

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("studentId", selectedStudent); // Attach student ID for upload

    try {
      const response = await axios.post("http://localhost:5000/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        // Assuming response contains fileUrl, fileName, and uploadDate
        const { fileUrl, fileName, uploadDate } = response.data;
        
        // Show alert instead of message
        alert(`File uploaded successfully. Upload Date: ${new Date(uploadDate).toLocaleString()}`);

        // Reset the file input and file state after the alert
        setFile(null);  // Clear the file state
        document.querySelector('input[type="file"]').value = null; // Clear the file input field
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Failed to upload the file.");
    }
  };

  return (
    <div style={{ backgroundColor: '#2D2D2D', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', fontWeight: '600', color: 'white' }}>Upload Files for Student</h3>
      
      <input 
        type="file" 
        style={{
          width: '100%', 
          padding: '10px', 
          marginBottom: '10px', 
          border: 'none', 
          borderRadius: '4px', 
          fontSize: '1rem',
          opacity: 0, // Make the default file input transparent
          position: 'absolute', // Position it off-screen to make it invisible
          zIndex: -1, // Ensure it's behind the custom button
        }} 
        onChange={handleFileChange} 
      />
      
      <button 
        style={{
          backgroundColor: 'transparent', // Transparent background for the custom button
          border: '1px solid #ddd', // Light border around the button
          padding: '10px 20px', 
          fontSize: '1rem', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          transition: 'background-color 0.3s ease', 
          display: 'inline-block',
          marginTop: '5px',
          color: '#fff', // White text color for the button
        }} 
        onClick={() => document.querySelector('input[type="file"]').click()} // Trigger the hidden file input
      >
        Choose File
      </button>

      {/* Display the selected file name */}
      {file && <p style={{ color: 'white', marginTop: '10px' }}>Selected File: {file.name}</p>}
      
      <br />
      <button 
        style={{
          backgroundColor: '#4caf50', 
          color: 'white', 
          padding: '10px 20px', 
          fontSize: '1rem', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          transition: 'background-color 0.3s ease',
          marginTop: '10px', // Space between buttons
        }} 
        onClick={handleFileUpload}
      >
        Upload File
      </button>
      
      {/* Show message if there's any */}
      {message && <p style={{ fontSize: '1rem', color: '#ff5722', marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default TeacherUploads;
