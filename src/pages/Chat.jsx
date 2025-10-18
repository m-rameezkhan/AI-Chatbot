import React, { useState } from "react";
import "../styles/chat.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import Loader from "../components/Loader";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! 👋 I'm your AI Pitch Assistant. Tell me your idea!" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Temporary AI reply (for UI testing)
    setTimeout(() => {
      const aiMsg = { sender: "ai", text: "Got it! That sounds interesting. Let’s refine your pitch." };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="chat-layout">
      <Navbar type="chat"/>
      <div className="chat-body">
        <Sidebar type="chat"/>
        <div className="chat-content">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <ChatMessage key={i} sender={msg.sender} text={msg.text} />
            ))}
            {loading && <Loader />}
          </div>
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
