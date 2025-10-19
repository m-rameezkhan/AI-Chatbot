import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/chat.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import Loader from "../components/Loader";
import { generatePitchResponse } from "../services/geminiApi";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../context/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const { pitchId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPitchId, setCurrentPitchId] = useState(pitchId);

  // Load pitch history if pitchId exists and is not "new"
  useEffect(() => {
    if (!user) return;

    if (pitchId === "new") {
      // Start a new chat
      setMessages([
        {
          sender: "ai",
          text: {
            startupName: "",
            tagline: "",
            pitch: "Hello! 👋 I'm your AI Pitch Assistant. Tell me your idea!",
            targetAudience: "",
            landingPageCopy: "",
          },
        },
      ]);
      setCurrentPitchId(null);
      return;
    }

    const fetchPitch = async () => {
      const { data, error } = await supabase
        .from("pitches")
        .select("*")
        .eq("id", pitchId)
        .single();

      if (error) console.error("Error fetching pitch:", error);
      else {
        const msgs = [];
        if (data.user_message)
          msgs.push({ sender: "user", text: data.user_message });
        if (data.ai_response)
          msgs.push({ sender: "ai", text: data.ai_response });
        setMessages(msgs);
        setCurrentPitchId(data.id);
      }
    };
    fetchPitch();
  }, [user, pitchId]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const aiResponse = await generatePitchResponse(text);

      // Save to Supabase
      if (currentPitchId) {
        // Update existing pitch
        await supabase
          .from("pitches")
          .update({ user_message: text, ai_response: aiResponse })
          .eq("id", currentPitchId);
      } else {
        // Insert new pitch
        const { data, error } = await supabase.from("pitches").insert([
          {
            user_id: user.id,
            user_message: text,
            ai_response: aiResponse,
          },
        ]).select().single();
        if (!error) setCurrentPitchId(data.id); // set new pitchId
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-layout">
      <Navbar type="chat" />
      <div className="chat-body">
        <Sidebar
          type="chat"
          onSelectPitch={(id) => {
            if (id === "new") {
              // Start a new chat
              setMessages([
                {
                  sender: "ai",
                  text: {
                    startupName: "",
                    tagline: "",
                    pitch: "Hello! 👋 I'm your AI Pitch Assistant. Tell me your idea!",
                    targetAudience: "",
                    landingPageCopy: "",
                  },
                },
              ]);
              setCurrentPitchId(null);
              navigate("/chat/new"); // optional, updates URL
            } else {
              // Load previous pitch
              navigate(`/chat/${id}`);
            }
          }} />
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
