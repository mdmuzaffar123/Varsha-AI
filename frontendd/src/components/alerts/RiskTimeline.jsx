import React from "react";
import { Clock, ShieldAlert } from "lucide-react";
import { RISK_TIMELINE_DATA } from "../../data/alertData";
import "./RiskTimeline.css";

export default function RiskTimeline() {
  return (
    <div className="risk-timeline-card">
      <div className="rtl-header">
        <div className="rtl-title-group">
          <Clock size={16} className="rtl-icon" />
          <h3 className="rtl-title">Weather Risk Timeline</h3>
        </div>
        <span className="rtl-badge">Demo Forecast Risk</span>
      </div>

      <p className="rtl-subtitle">
        Temporal hazard progression over the next 24 hours across key risk vectors.
      </p>

      {/* Timeline Steps Container */}
      <div className="rtl-steps-container">
        {RISK_TIMELINE_DATA.map((step, idx) => (
          <div key={step.time} className="rtl-step-col">
            {/* Time label */}
            <span className={`rtl-time-pill ${idx === 0 ? "now" : ""}`}>
              {step.time}
            </span>

            {/* Score Bar Indicator */}
            <div className="rtl-bar-track">
              <div
                className={`rtl-bar-fill ${getScoreClass(step.score)}`}
                style={{ height: `${step.score}%` }}
              />
            </div>

            {/* Hazard Pills Breakdown */}
            <div className="rtl-hazards-list">
              <div className="rtl-h-item">
                <span className="rtl-h-lbl">Rain:</span>
                <span className={`rtl-h-val ${step.rainfall.toLowerCase()}`}>
                  {step.rainfall}
                </span>
              </div>
              <div className="rtl-h-item">
                <span className="rtl-h-lbl">Storm:</span>
                <span className={`rtl-h-val ${step.thunderstorm.toLowerCase()}`}>
                  {step.thunderstorm}
                </span>
              </div>
              <div className="rtl-h-item">
                <span className="rtl-h-lbl">Lightn:</span>
                <span className={`rtl-h-val ${step.lightning.toLowerCase()}`}>
                  {step.lightning}
                </span>
              </div>
              <div className="rtl-h-item">
                <span className="rtl-h-lbl">Flood:</span>
                <span className={`rtl-h-val ${step.flood.toLowerCase()}`}>
                  {step.flood}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getScoreClass(score) {
  if (score >= 75) return "high";
  if (score >= 45) return "moderate";
  return "low";
}
