import React from "react";
import "../styles/chat.css";

const ChatMessage = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`chat-message ${isUser ? "user" : "ai"}`}>
      <div className="message-bubble">{text}</div>
    </div>
  );
};

export default ChatMessage;
