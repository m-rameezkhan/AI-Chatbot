import React from "react";
import { useNavigate } from "react-router-dom";
import "./PitchCard.css";

function PitchCard({ pitch }) {
  const navigate = useNavigate();

  return (
    <div className="pitch-card" onClick={() => navigate(`/chat/${pitch.id}`)}>
      <h3>{pitch.name}</h3>
      <p className="tagline">{pitch.tagline}</p>
      <p className="desc">{pitch.description}</p>
      <div className="card-footer">
        <span>{pitch.date}</span>
        <button className="view-btn">Open Chat</button>
      </div>
    </div>
  );
}

export default PitchCard;
