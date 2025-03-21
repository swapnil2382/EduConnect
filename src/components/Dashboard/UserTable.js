import React, { useState } from "react";
import axios from "axios";
import "../Styles/UserTable.css";
import UserProfileModal from "./UserProfileModal";

const UserTable = ({ title, users, handleDelete, fetchUsers }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    // Filtering users based on search input
    const filteredUsers = users.filter((user) => {
        if (title === "Parents") {
            return user.studentID?.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (title === "Teachers") {
            return user.teacherID
                ? user.teacherID.toLowerCase().includes(searchQuery.toLowerCase())
                : false;
        }
        return true;
    });

    // Show only the first `visibleCount` users
    const visibleUsers = filteredUsers.slice(0, visibleCount);

    // Handle Edit Button
    const handleEdit = (user) => {
        setIsEditing(true);
        setEditedUser({ ...user }); // Make a copy of user data for editing
    };

    // Handle Input Change
    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/auth/users/${editedUser._id}`,
                editedUser
            );

            if (response.status === 200) {
                alert("User updated successfully!");
                await fetchUsers();
                setIsEditing(false);
                setSelectedUser(null);
            } else {
                throw new Error("Unexpected server response");
            }
        } catch (error) {
            alert(`Failed to update user: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div>
            <h2>{title} List</h2>

            {/* Search Bar */}
            <input
                type="text"
                placeholder={`Search ${title.toLowerCase()} by ID...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />

            {/* No data message */}
            {filteredUsers.length === 0 ? (
                <p className="no-data">No {title.toLowerCase()} found for the entered ID!</p>
            ) : (
                <>
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.role}</td>
                                    <td>{title === "Parents" ? user.studentID : user.teacherID || "N/A"}</td>
                                    <td>
                                        <button onClick={() => setSelectedUser(user)} className="view-btn">View Profile</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* See More Button */}
                    {visibleCount < filteredUsers.length && (
                        <button onClick={() => setVisibleCount(visibleCount + 10)} className="see-more-btn">
                            See More
                        </button>
                    )}
                </>
            )}

            {/* User Profile Modal */}
            <UserProfileModal
                selectedUser={selectedUser}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                setSelectedUser={setSelectedUser}
                handleChange={handleChange}
                handleSave={handleSave}
                handleDelete={handleDelete}
                editedUser={editedUser}
                handleEdit={handleEdit}
            />
        </div>
    );
};

export default UserTable;
