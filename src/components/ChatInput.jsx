import React, { useState } from "react";

const ChatInput = ({ onSend, disabled }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled} // Disable input while loading
      />
      <button type="submit" disabled={disabled}>
        {disabled ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default ChatInput;
