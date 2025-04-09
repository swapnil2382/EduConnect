import React from "react";
import "../Styles/UserProfileModal.css";

const UserProfileModal = ({ selectedUser, isEditing, setIsEditing, setSelectedUser, handleChange, handleSave, handleDelete, editedUser, handleEdit }) => {
    if (!selectedUser) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <button onClick={() => { setSelectedUser(null); setIsEditing(false); }} className="close-btn">×</button>

                <h3 className="modal-title">{isEditing ? "Edit User" : "User Profile"}</h3>

                <div className="user-info">
                    <div className="user-info-grid">
                        <div className="user-info-row">
                            <div className="user-info-column">
                                <label>Name:</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={isEditing ? editedUser.name : selectedUser.name || ""} 
                                    onChange={handleChange} 
                                    disabled={!isEditing} 
                                />
                            </div>
                            <div className="user-info-column">
                                <label>Email:</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={isEditing ? editedUser.email : selectedUser.email || ""} 
                                    onChange={handleChange} 
                                    disabled={!isEditing} 
                                />
                            </div>
                        </div>

                        <div className="user-info-row">
                            <div className="user-info-column">
                                <label>Phone:</label>
                                <input 
                                    type="text" 
                                    name="phone" 
                                    value={isEditing ? editedUser.phone : selectedUser.phone || ""} 
                                    onChange={handleChange} 
                                    disabled={!isEditing} 
                                />
                            </div>
                            <div className="user-info-column">
                                <label>Address:</label>
                                <input 
                                    type="text" 
                                    name="address" 
                                    value={isEditing ? editedUser.address : selectedUser.address || ""} 
                                    onChange={handleChange} 
                                    disabled={!isEditing} 
                                />
                            </div>
                        </div>

                        {selectedUser.role === "parent" && (
                            <>
                                <div className="user-info-row">
                                    <div className="user-info-column">
                                        <label>Student ID:</label>
                                        <input 
                                            type="text" 
                                            name="studentID" 
                                            value={isEditing ? editedUser.studentID : selectedUser.studentID || ""} 
                                            onChange={handleChange} 
                                            disabled={!isEditing} 
                                        />
                                    </div>
                                    <div className="user-info-column">
                                        <label>Student Name:</label>
                                        <input 
                                            type="text" 
                                            name="studentName" 
                                            value={isEditing ? editedUser.studentName : selectedUser.studentName || ""} 
                                            onChange={handleChange} 
                                            disabled={!isEditing} 
                                        />
                                    </div>
                                </div>

                                <div className="user-info-row">
                                    <div className="user-info-column">
                                        <label>Class:</label>
                                        <input 
                                            type="text" 
                                            name="studentClass" 
                                            value={isEditing ? editedUser.studentClass : selectedUser.studentClass || ""} 
                                            onChange={handleChange} 
                                            disabled={!isEditing} 
                                        />
                                    </div>
                                    <div className="user-info-column">
                                        <label>Division:</label>
                                        <input 
                                            type="text" 
                                            name="studentDivision" 
                                            value={isEditing ? editedUser.studentDivision : selectedUser.studentDivision || ""} 
                                            onChange={handleChange} 
                                            disabled={!isEditing} 
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {selectedUser.role === "teacher" && (
                            <>
                                <div className="user-info-row">
                                    <div className="user-info-column">
                                        <label>Teacher ID:</label>
                                        <input 
                                            type="text" 
                                            name="teacherID" 
                                            value={isEditing ? editedUser.teacherID : selectedUser.teacherID || ""} 
                                            onChange={handleChange} 
                                            disabled={!isEditing} 
                                        />
                                    </div>
                                    <div className="user-info-column">
                                        <label>Class:</label>
                                        <input 
                                            type="text" 
                                            name="teacherClass" 
                                            value={isEditing ? editedUser.teacherClass : selectedUser.teacherClass || ""} 
                                            onChange={handleChange} 
                                            disabled={!isEditing} 
                                        />
                                    </div>
                                </div>

                                <div className="user-info-row">
                                    <div className="user-info-column">
                                        <label>Division:</label>
                                        <input 
                                            type="text" 
                                            name="teacherDivision" 
                                            value={isEditing ? editedUser.teacherDivision : selectedUser.teacherDivision || ""} 
                                            onChange={handleChange} 
                                            disabled={!isEditing} 
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="modal-buttons">
                    {isEditing ? (
                        <button onClick={handleSave} className="save-btn">Save</button>
                    ) : (
                        <button onClick={() => handleEdit(selectedUser)} className="edit-btn">Edit</button>
                    )}
                    <button onClick={() => handleDelete(selectedUser._id)} className="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;
