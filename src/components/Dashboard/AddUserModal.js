import React, { useState } from "react";
import axios from "axios";
import "../Styles/Modal.css"; // Make sure this file exists and has styles

const AddUserModal = ({ closeModal }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    studentID: "",
    studentName: "",
    studentClass: "",
    studentDivision: "",
    teacherID: "",
    teacherClass: "",
    teacherDivision: "",
    address: "",
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      console.log("User Data Being Sent:", newUser); // Debug: Log the data before sending

      await axios.post("http://localhost:5000/api/auth/register", newUser);
      alert("User added successfully!");
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        studentID: "",
        studentName: "",
        studentClass: "",
        studentDivision: "",
        teacherID: "",
        teacherClass: "",
        teacherDivision: "",
        address: "",
      });
      closeModal(); // Close modal after submission
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close (X) Button */}
        <button className="close-icon" onClick={closeModal}>
          ✖
        </button>

        <h2 className="modal-title">Register New User</h2>
        <form onSubmit={handleAddUser} className="user-form">
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={newUser.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={newUser.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={newUser.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            value={newUser.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            value={newUser.address}
            onChange={handleChange}
            required
          />

          <select name="role" value={newUser.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
          </select>

          {newUser.role === "parent" && (
            <>
              <input
                type="text"
                name="studentID"
                placeholder="Enter Student ID"
                value={newUser.studentID}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="studentName"
                placeholder="Enter Student Name"
                value={newUser.studentName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="studentClass"
                placeholder="Enter Student Class"
                value={newUser.studentClass}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="studentDivision"
                placeholder="Enter Student Division"
                value={newUser.studentDivision}
                onChange={handleChange}
                required
              />
            </>
          )}

          {newUser.role === "teacher" && (
            <>
              <input
                type="text"
                name="teacherID"
                placeholder="Enter Teacher ID"
                value={newUser.teacherID}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="teacherClass"
                placeholder="Enter Teacher's Class"
                value={newUser.teacherClass}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="teacherDivision"
                placeholder="Enter Teacher's Division"
                value={newUser.teacherDivision}
                onChange={handleChange}
                required
              />
            </>
          )}

          <div className="modal-buttons">
            <button type="submit" className="submit-btn">
              Register User
            </button>
            <button type="button" onClick={closeModal} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
