import React, { useState } from "react";
import { Sparkles, X, Bot } from "lucide-react";
import { aiForecastInsightText } from "../../data/forecastData";
import "./AIForecastInsights.css";

export default function AIForecastInsights({ liveWeather }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="ai-insight-box-card">
        <div className="ai-insight-header">
          <div className="ai-insight-title-group">
            <div className="ai-badge-circle">
              <span>AI</span>
            </div>
            <h3 className="ai-insight-title">AI Forecast Insights</h3>
          </div>

          <button
            className="ai-explain-action-btn"
            onClick={() => setShowModal(true)}
          >
            <Sparkles size={13} className="sparkle-icon" />
            <span>Explain</span>
          </button>
        </div>

        <p className="ai-insight-description">
          {aiForecastInsightText.summary}
        </p>
      </div>

      {/* Explanation Modal */}
      {showModal && (
        <div className="ai-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="ai-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="ai-modal-top">
              <div className="ai-modal-heading">
                <Bot size={20} color="#1677FF" />
                <h4>AI Forecast Rationale & Meteorological Analysis</h4>
              </div>
              <button
                className="ai-modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="ai-modal-model-badge">
              <span>EarthFormer Convective AI + DNR Radar Deep Learning</span>
            </div>

            <div className="ai-modal-content-body">
              <pre className="ai-modal-pre">
                {aiForecastInsightText.detailedExplanation}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
