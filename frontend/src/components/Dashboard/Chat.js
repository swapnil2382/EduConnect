import React, { useState } from "react";
import axios from "axios";
import "../Styles/Chatbot.css";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false); // Track chatbox visibility
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false); // For "Bot is typing" simulation

    const handleSend = async () => {
        if (!message.trim()) return;

        // Add user's message to the chat
        setMessages([...messages, { sender: "user", text: message }]);
        setMessage(""); // Clear the input field

        // Simulate bot typing
        setIsTyping(true);

        try {
            const res = await axios.post("http://localhost:5000/api/chat", { message });
            // After the response is received, add AI's reply and hide typing simulation
            setMessages([
                ...messages,
                { sender: "user", text: message },
                { sender: "ai", text: res.data.reply }
            ]);
            setIsTyping(false);
        } catch (error) {
            console.error("Error:", error);
            setMessages([...messages, { sender: "user", text: message }, { sender: "ai", text: "Failed to get response" }]);
            setIsTyping(false);
        }
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div>
            {/* Chat Button */}
            <button onClick={toggleChat} className="chat-button">
                {isChatOpen ? "❌ Close Chat" : "🤖 Chat with AI"}
            </button>

            {/* Chatbox */}
            {isChatOpen && (
                <div className="chatbox open">
                    <div className="chatbox-header">
                        <div className="avatar">🤖</div>
                        <div className="name">AI Assistant</div>
                    </div>
                    <div className="message-area">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-bubble ${msg.sender}-message`}>
                                <strong>{msg.sender === "user" ? "You: " : "AI: "}</strong>{msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message-bubble ai-message typing-indicator">
                                <em>AI is typing...</em>
                            </div>
                        )}
                    </div>
                    <div className="chat-input-container">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask something..."
                            className="chat-input"
                        />
                        <button onClick={handleSend} className="send-button">➤</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
