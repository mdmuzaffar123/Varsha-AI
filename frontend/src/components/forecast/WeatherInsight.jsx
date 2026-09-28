import { useState } from "react";
import { Bot, ChevronDown, X, Sparkles } from "lucide-react";
import "./WeatherInsight.css";

export default function WeatherInsight({ mode, insight, explain }) {
  const [showModal, setShowModal] = useState(false);

  const titles = {
    rainfall:     "AI Rainfall Insight",
    temperature:  "AI Temperature Insight",
    wind:         "AI Wind Insight",
    humidity:     "AI Humidity Insight",
    cloudCover:   "AI Cloud Insight",
    thunderstorm: "AI Thunderstorm Insight",
    lightning:    "AI Lightning Insight",
  };

  const isSpecial = mode === "thunderstorm" || mode === "lightning";

  return (
    <>
      <div className={`wi-card ${isSpecial ? "wi-card--special" : ""}`}>
        <div className="wi-header">
          <div className="wi-icon-wrap">
            <Bot size={18} />
          </div>
          <div className="wi-title-group">
            <span className="wi-title">{titles[mode] || "AI Insight"}</span>
            <span className="wi-demo-badge">AI Insight — Demo</span>
          </div>
        </div>
        <p className="wi-text">{insight}</p>
        <button className="wi-explain-btn" onClick={() => setShowModal(true)}>
          <Sparkles size={13} />
          Explain
          <ChevronDown size={13} />
        </button>
      </div>

      {showModal && (
        <div className="wi-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="wi-modal" onClick={e => e.stopPropagation()}>
            <div className="wi-modal-header">
              <div className="wi-modal-title">
                <Bot size={18} color="#1677FF" />
                <span>{titles[mode] || "AI Insight"} — Full Explanation</span>
              </div>
              <button className="wi-modal-close" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="wi-modal-badge">AI Insight — Demo (LLM backend not yet connected)</div>
            <p className="wi-modal-text">{explain}</p>
          </div>
        </div>
      )}
    </>
  );
}
