import React from "react";
import { useNavigate } from "react-router-dom";
import { Radio, ArrowRight, Activity, ShieldCheck } from "lucide-react";
import "./RadarComparisonPanels.css";

export default function RadarComparisonPanels({ locations }) {
  const navigate = useNavigate();

  return (
    <div className="radar-comparison-card">
      <div className="radc-header">
        <div className="radc-title-group">
          <Radio size={16} className="radc-icon" />
          <h3 className="radc-title">Radar Conditions</h3>
        </div>
        <span className="radc-badge">Doppler Station Telemetry</span>
      </div>

      <div className="radc-panels-row">
        {locations.map((loc) => (
          <div key={loc.id} className="radc-panel">
            <div className="radc-p-header">
              <span className="radc-p-title">{loc.name} Radar Station</span>
              <span className="radc-p-status green">Operational</span>
            </div>

            {/* Radar dBZ Meter */}
            <div className="radc-meter-box">
              <span className="radc-mb-lbl">Peak Reflectivity</span>
              <span className="radc-mb-val">{loc.currentWeather.radarDbz} dBZ</span>
              <div className="radc-mb-track">
                <div
                  className="radc-mb-fill"
                  style={{ width: `${Math.min(100, (loc.currentWeather.radarDbz / 75) * 100)}%` }}
                />
              </div>
            </div>

            {/* Telemetry Items */}
            <div className="radc-telemetry-grid">
              <div className="radc-tel-item">
                <span className="radc-t-lbl">Estimate</span>
                <span className="radc-t-val">{loc.currentWeather.rain}</span>
              </div>
              <div className="radc-tel-item">
                <span className="radc-t-lbl">Condition</span>
                <span className="radc-t-val">{loc.currentWeather.condition}</span>
              </div>
              <div className="radc-tel-item">
                <span className="radc-t-lbl">Wind Gusts</span>
                <span className="radc-t-val">{loc.currentWeather.wind}</span>
              </div>
              <div className="radc-tel-item">
                <span className="radc-t-lbl">Cloud Top</span>
                <span className="radc-t-val">{loc.currentWeather.cloud}</span>
              </div>
            </div>

            <button
              className="radc-open-btn"
              onClick={() => navigate("/dnr-radar")}
            >
              <span>Open {loc.name} Radar</span>
              <ArrowRight size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
