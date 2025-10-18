import React from "react";
import "./Sidebar.css";

function Sidebar({ type = "dashboard" }) {
  if (type === "chat") {
    return (
      <div className="sidebar chat-sidebar">
        <button className="new-pitch-btn">+ New Pitch</button>
        <h3>My Pitches</h3>
        <ul>
          <li className="active">Pitch 1 - AI Startup</li>
          <li>Pitch 2 - Eco Products</li>
          <li>Pitch 3 - Food Delivery</li>
        </ul>
        
      </div>
    );
  }

  // Default sidebar for Dashboard
  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li>All Pitches</li>
        <li>New Pitch</li>
        <li>Export</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
