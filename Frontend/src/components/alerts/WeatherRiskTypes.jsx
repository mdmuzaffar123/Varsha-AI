import React from "react";
import { CloudRain, CloudLightning, Zap, Waves, Wind, TriangleAlert, CheckCircle2 } from "lucide-react";
import { WEATHER_RISK_TYPES } from "../../data/alertData";
import "./WeatherRiskTypes.css";

const ICON_MAP = {
  CloudRain,
  CloudLightning,
  Zap,
  Waves,
  Wind,
  TriangleAlert,
};

export default function WeatherRiskTypes() {
  return (
    <div className="weather-risk-types-card">
      <div className="wrt-header">
        <h3 className="wrt-title">Monitored Weather Risks</h3>
        <span className="wrt-badge">6 Hazard Vectors</span>
      </div>

      <p className="wrt-subtitle">
        Automated classification and early warning triggers continuously monitored by VarshaAI algorithms.
      </p>

      {/* 6 Cards Grid */}
      <div className="wrt-grid">
        {WEATHER_RISK_TYPES.map((hazard) => {
          const IconComponent = ICON_MAP[hazard.iconName] || CloudRain;
          return (
            <div key={hazard.id} className="wrt-card">
              <div className="wrt-top">
                <div
                  className="wrt-icon-box"
                  style={{
                    backgroundColor: `${hazard.color}15`,
                    color: hazard.color,
                  }}
                >
                  <IconComponent size={20} />
                </div>
                <span className="wrt-status-chip">
                  <CheckCircle2 size={11} className="wrt-check" />
                  <span>Monitoring Enabled</span>
                </span>
              </div>

              <h4 className="wrt-card-title">{hazard.title}</h4>
              <p className="wrt-card-desc">{hazard.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
