import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PitchCard from "../components/PitchCard";
import "../styles/dashboard.css";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  // static sample data
  const pitches = [
    {
      id: 1,
      name: "MentorMate",
      tagline: "Guidance Meets Growth",
      date: "2025-10-18",
      description: "An app connecting learners with mentors to grow professionally.",
    },
    {
      id: 2,
      name: "Greenify",
      tagline: "Plant a Future",
      date: "2025-10-15",
      description: "AI-based plant care assistant for home gardeners.",
    },
  ];

  // search filter logic
  const filtered = pitches.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Navbar type = "dashboard"/>
      <div className="main-content">
        <Sidebar />
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h2>Your Pitches</h2>
            <div className="dashboard-actions">
              <input
                type="text"
                placeholder="Search your pitches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="new-pitch-btn">+ New Pitch</button>
            </div>
          </div>

          <div className="pitches-grid">
            {filtered.length > 0 ? (
              filtered.map((p) => <PitchCard key={p.id} pitch={p} />)
            ) : (
              <p>No pitches found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
