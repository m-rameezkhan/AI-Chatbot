import React from "react";
import "./PitchCard.css";

function PitchCard({ pitch, onClick }) {
  const snippet = pitch.ai_response?.pitch
    ? pitch.ai_response.pitch.substring(0, 100) + "..."
    : "No pitch yet";

  return (
    <div className="pitch-card" onClick={onClick}>
      <h3>{pitch.ai_response?.startupName || pitch.user_message}</h3>
      <p className="tagline">{pitch.ai_response?.tagline || "No tagline"}</p>
      <p className="desc">{snippet}</p>
      <div className="card-footer">
        <span>{new Date(pitch.created_at).toLocaleDateString()}</span>
        <button className="view-btn" onClick={onClick}>
          Open Chat
        </button>
      </div>
    </div>
  );
}

export default PitchCard;
