import React from "react";
import { CloudRain, BarChart3, Wind, Target } from "lucide-react";
import "./RadarInfoPanel.css";

const DBZ_LEGEND_TICKS = [
  { val: "60+", color: "#DC2626" },
  { val: "50",  color: "#EF4444" },
  { val: "40",  color: "#F97316" },
  { val: "30",  color: "#FACC15" },
  { val: "20",  color: "#10B981" },
  { val: "10",  color: "#06B6D4" },
  { val: "0",   color: "#3B82F6" },
  { val: "-10", color: "#6366F1" },
  { val: "-20", color: "#8B5CF6" },
];

export default function RadarInfoPanel({ locationData }) {
  const loc = locationData?.location || { city: "Ranchi", state: "Jharkhand", timestamp: "22 Sep 2026, 11:30 AM" };
  const current = locationData?.current || {
    rainfallRate: 24,
    intensity: "Moderate Intensity",
    movementDir: "Moving East",
    movementSpeed: "15 km/h",
    coverage: "~120 km radius",
  };

  return (
    <div className="radar-info-snapshot-card">
      {/* ── Left Content (Header & 4 Metric Cards Grid) ── */}
      <div className="ris-content-col">
        <div className="ris-header">
          <h3 className="ris-title">Current Radar Snapshot</h3>
          <div className="ris-location-row">
            <span className="ris-loc-name">{loc.city}, {loc.state}</span>
            <span className="ris-time-tag">{loc.timestamp}</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="ris-metrics-grid">
          {/* 1. Rainfall */}
          <div className="ris-metric-box">
            <div className="ris-mbox-icon-wrap blue">
              <CloudRain size={20} />
            </div>
            <div className="ris-mbox-text">
              <div className="ris-mbox-val">{current.rainfallRate} mm</div>
              <div className="ris-mbox-sub">Estimated Rainfall<br />(Last 1 hour)</div>
            </div>
          </div>

          {/* 2. Intensity */}
          <div className="ris-metric-box">
            <div className="ris-mbox-icon-wrap purple">
              <BarChart3 size={20} />
            </div>
            <div className="ris-mbox-text">
              <div className="ris-mbox-val purple">{current.intensity}</div>
              <div className="ris-mbox-sub">Current Echo State</div>
            </div>
          </div>

          {/* 3. Movement */}
          <div className="ris-metric-box">
            <div className="ris-mbox-icon-wrap cyan">
              <Wind size={20} />
            </div>
            <div className="ris-mbox-text">
              <div className="ris-mbox-val">{current.movementDir}</div>
              <div className="ris-mbox-sub">{current.movementSpeed}</div>
            </div>
          </div>

          {/* 4. Coverage */}
          <div className="ris-metric-box">
            <div className="ris-mbox-icon-wrap blue">
              <Target size={20} />
            </div>
            <div className="ris-mbox-text">
              <div className="ris-mbox-val">Coverage</div>
              <div className="ris-mbox-sub">{current.coverage}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Vertical Reflectivity dBZ Legend (Matching Mockup) ── */}
      <div className="ris-legend-col">
        <div className="ris-legend-header">
          <span>Reflectivity (dBZ)</span>
        </div>
        <div className="ris-legend-scale-wrapper">
          <div className="ris-legend-bar-gradient" />
          <div className="ris-legend-ticks">
            {DBZ_LEGEND_TICKS.map((t) => (
              <span key={t.val} className="ris-tick-label">
                {t.val}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
