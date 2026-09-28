import React from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Radio,
  CloudRain,
  BarChart2,
  AlertTriangle,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import "./AlertDetailModal.css";

export default function AlertDetailModal({ alert, onClose }) {
  const navigate = useNavigate();

  if (!alert) return null;

  const severityLower = alert.severity.toLowerCase();

  return (
    <div className="alert-modal-overlay" onClick={onClose}>
      <div
        className="alert-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="adm-header">
          <div className="adm-header-left">
            <span className={`adm-sev-badge ${severityLower}`}>
              {alert.severity} RISK
            </span>
            <span className="adm-demo-tag">{alert.badgeLabel || "AI Derived • Demo"}</span>
          </div>

          <button className="adm-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Title & Location */}
        <div className="adm-title-block">
          <h2 className="adm-title">{alert.title}</h2>
          <div className="adm-sub-info">
            <span className="adm-info-chip">
              <MapPin size={13} /> {alert.location}
            </span>
            <span className="adm-info-chip">
              <Clock size={13} /> Time: {alert.timeWindow}
            </span>
            <span className="adm-info-chip">
              <Sparkles size={13} /> Source: {alert.source}
            </span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="adm-metrics-grid">
          <div className="adm-metric-card">
            <span className="adm-mc-label">Expected Metric</span>
            <span className="adm-mc-val">{alert.rainfallMetric || alert.stormCells || alert.lightningProb}</span>
          </div>
          <div className="adm-metric-card">
            <span className="adm-mc-label">Rainfall Prob</span>
            <span className="adm-mc-val">{alert.metrics?.rainfallProb || "78%"}</span>
          </div>
          <div className="adm-metric-card">
            <span className="adm-mc-label">Rain Intensity</span>
            <span className="adm-mc-val">{alert.metrics?.rainfallIntensity || "35 mm/h"}</span>
          </div>
          <div className="adm-metric-card">
            <span className="adm-mc-label">Thunderstorm Prob</span>
            <span className="adm-mc-val">{alert.metrics?.thunderstormProb || "65%"}</span>
          </div>
          <div className="adm-metric-card">
            <span className="adm-mc-label">Lightning Prob</span>
            <span className="adm-mc-val">{alert.metrics?.lightningProb || "58%"}</span>
          </div>
          <div className="adm-metric-card">
            <span className="adm-mc-label">Wind Speed</span>
            <span className="adm-mc-val">{alert.metrics?.windSpeed || "32 km/h"}</span>
          </div>
        </div>

        {/* AI Explanation Box */}
        <div className="adm-section-box blue-tint">
          <h4 className="adm-box-title">
            <Sparkles size={15} /> AI Intelligence Explanation
          </h4>
          <p className="adm-box-text">
            {alert.aiExplanation ||
              "Multi-layer atmospheric moisture modeling synthesizes Doppler reflectivity and satellite infrared cooling gradients."}
          </p>
          <span className="adm-disclaimer">* AI-generated summary using demo forecast dataset</span>
        </div>

        {/* Recommended Action Box */}
        <div className="adm-section-box green-tint">
          <h4 className="adm-box-title">
            <ShieldCheck size={15} /> Recommended Monitoring Action
          </h4>
          <p className="adm-box-text">{alert.recommendedAction}</p>
        </div>

        {/* Modal Footer Action Buttons */}
        <div className="adm-footer-actions">
          <div className="adm-nav-btns">
            <button
              className="adm-btn radar"
              onClick={() => {
                navigate("/dnr-radar");
                onClose();
              }}
            >
              <Radio size={14} />
              <span>View on Radar</span>
            </button>

            <button
              className="adm-btn forecast"
              onClick={() => {
                navigate("/forecast");
                onClose();
              }}
            >
              <CloudRain size={14} />
              <span>View Forecast</span>
            </button>

            <button
              className="adm-btn compare"
              onClick={() => {
                navigate("/compare");
                onClose();
              }}
            >
              <BarChart2 size={14} />
              <span>Compare Location</span>
            </button>
          </div>

          <button className="adm-btn close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
