import React, { useState } from "react";
import "./Community.css";

function CommunityChat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Anirban", text: "Hey everyone! Excited to join 🚀", time: "10:30 AM", isUser: false },
    { id: 2, sender: "Annonymus", text: "Welcome Anirban 👋", time: "10:31 AM", isUser: false },
    { id: 3, sender: "You", text: "Hi guys! Happy to be here 😃", time: "10:32 AM", isUser: true },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const msg = {
      id: messages.length + 1,
      sender: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Community Chat</div>

      <div className="chat-body">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.isUser ? "user" : "other"}`}>
            {!msg.isUser && <span className="chat-sender">{msg.sender}</span>}
            <p className="chat-text">{msg.text}</p>
            <span className="chat-time">{msg.time}</span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
}

export default CommunityChat;
