import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PitchCard from "../components/PitchCard";
import "../styles/dashboard.css";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [pitches, setPitches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchPitches = async () => {
      const { data, error } = await supabase
        .from("pitches")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setPitches(data);
    };
    fetchPitches();
  }, [user]);

  const filtered = pitches.filter((p) => {
    const ai = p.ai_response || {};
    return (
      (ai.startupName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ai.tagline?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="dashboard-container">
      <Navbar type="dashboard" />
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
              <button className="new-pitch-btn" onClick={() => navigate("/chat/new")}>
                + New Pitch
              </button>
            </div>
          </div>

          <div className="pitches-grid">
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <PitchCard
                  key={p.id}
                  pitch={p}
                  onClick={() => navigate(`/chat/${p.id}`)}
                />
              ))
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
