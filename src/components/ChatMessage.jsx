import React from "react";
import "../styles/chat.css";

const ChatMessage = ({ sender, text }) => {
  // Check if AI message has structured object
  const isAI = sender === "ai";

  const content =
    typeof text === "object"
      ? (
        <>
          {text.startupName && <p><strong>Startup Name:</strong> {text.startupName}</p>}
          {text.tagline && <p><strong>Tagline:</strong> {text.tagline}</p>}
          {text.pitch && <p><strong>Pitch:</strong> {text.pitch}</p>}
          {text.targetAudience && <p><strong>Target Audience:</strong> {text.targetAudience}</p>}

          {text.landingPageCopy && typeof text.landingPageCopy === "object" && (
            <div className="landing-page-copy">
              {text.landingPageCopy.headline && <h4>{text.landingPageCopy.headline}</h4>}
              {text.landingPageCopy.subheadline && <p>{text.landingPageCopy.subheadline}</p>}
              {text.landingPageCopy.callToAction && <button>{text.landingPageCopy.callToAction}</button>}
            </div>
          )}
        </>
      )
      : text; // for normal string messages

  return (
    <div className={`chat-message ${sender}`}>
      <div className="message-bubble">{content}</div>
    </div>
  );
};

export default ChatMessage;
