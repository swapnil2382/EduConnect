import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Styles/ProfilePage.css";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext); // Use logout from AuthContext
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        studentName: user.studentName,
        studentID: user.studentID,
        tDivision: user.teacherDivision,
        tClass: user.teacherClass,
        class: user.studentClass,
        division: user.studentDivision,
        role: user.role,
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/");
  };

  if (!profileData) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  const profilePic = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <div className="profile-container">
      <h2 className="profile-header">{profileData.name}</h2>
      <div className="profile-content">
        <div className="profile-info">
          <p><strong>📧 Email:</strong> {profileData.email}</p>
          <p><strong>📞 Phone:</strong> {profileData.phone}</p>
          <p><strong>🧑‍🏫 Role:</strong> {profileData.role === "teacher" ? "Teacher" : "Parent"}</p>
          <p><strong>🏫 Class:</strong> {profileData.role === "teacher" ? profileData.tClass : profileData.class}</p>
          <p><strong>📚 Division:</strong> {profileData.role === "teacher" ? profileData.tDivision : profileData.division}</p>
          {profileData.role === "parent" && (
            <>
              <p><strong>👩‍🎓 Student Name:</strong> {profileData.studentName}</p>
              <p><strong>🆔 Student ID:</strong> {profileData.studentID}</p>
              <p><strong>🏠 Address:</strong> {profileData.address}</p>
            </>
          )}
        </div>
        <div className="profile-right">
          <img src={profilePic} alt="Profile" className="profile-image" />
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
