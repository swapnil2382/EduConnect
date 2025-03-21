import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/NewsPage.css";

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/news/get");
            setNews(response.data);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    const handleAddNews = async (e) => {
        e.preventDefault();

        if (!user || (user.role !== "teacher" && user.role !== "admin")) {
            toast.error("Only teachers and admins can add news!");
            return;
        }

        const newsData = {
            title,
            content,
            authorRole: user.role,
            authorName: user.name,
            date: new Date().toISOString(), // Store current date
        };

        try {
            const response = await axios.post("http://localhost:5000/api/news/add", newsData);
            toast.success(response.data.message);
            setTitle("");
            setContent("");
            fetchNews();
        } catch (error) {
            console.error("Error adding news:", error);
            toast.error("Failed to add news.");
        }
    };

    const handleDelete = async (id) => {
        if (!user || (user.role !== "teacher" && user.role !== "admin")) {
            toast.error("Only teachers and admins can delete news!");
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/news/delete/${id}`);
            setNews(news.filter((item) => item._id !== id));
            toast.success("News deleted successfully!");
        } catch (error) {
            console.error("Error deleting news:", error);
            toast.error("Failed to delete news.");
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <div className="news-container">
            <ToastContainer position="top-right" autoClose={1000} />

            <h2 className="news-title">School News & Updates</h2>

            {!user ? (
                <p className="news-message">Please log in to view news.</p>
            ) : news.length === 0 ? (
                <p className="news-message">No news available.</p>
            ) : (
                <ul className="news-list">
                    {news.map((item) => (
                        <li key={item._id} className="news-item">
                            <h3 className="news-item-title">{item.title}</h3>
                            <p className="news-item-content">{item.content}</p>
                            <small className="news-author">~ By {item.authorName || "Admin"}</small>
                            
                            {(user && (user.role === "teacher" || user.role === "admin")) && (
                                <button className="news-delete-btn" onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
                            )}

                            {/* Display Date & Day Below the Delete Button */}
                            <p className="news-date">
                                🗓️ {item.createdAt ? formatDate(item.createdAt) : "Date not available"}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            {(user && (user.role === "teacher" || user.role === "admin")) && (
                <div className="add-news-section">
                    <h3 className="add-news-title">Add News</h3>
                    <form className="add-news-form" onSubmit={handleAddNews}>
                        <input
                            type="text"
                            className="add-news-input"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <textarea
                            className="add-news-textarea"
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                        <button type="submit" className="add-news-btn">Post News</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default NewsPage;
