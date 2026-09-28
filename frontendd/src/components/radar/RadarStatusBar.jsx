import React from "react";
import { CheckCircle2, Clock, Radio, Layers, RefreshCw, Database } from "lucide-react";
import "./RadarStatusBar.css";

export default function RadarStatusBar({ locationData }) {
  const current = locationData?.current || {};

  return (
    <div className="radar-status-bar-container">
      {/* 1. Radar Status */}
      <div className="rsb-card">
        <div className="rsb-icon-wrap green">
          <CheckCircle2 size={15} />
        </div>
        <div className="rsb-info">
          <span className="rsb-label">Radar Status</span>
          <span className="rsb-value green">{current.status || "Available"}</span>
        </div>
      </div>

      {/* 2. Last Update */}
      <div className="rsb-card">
        <div className="rsb-icon-wrap blue">
          <Clock size={15} />
        </div>
        <div className="rsb-info">
          <span className="rsb-label">Last Update</span>
          <span className="rsb-value">{current.lastUpdate || "11:30 AM"}</span>
        </div>
      </div>

      {/* 3. Coverage */}
      <div className="rsb-card">
        <div className="rsb-icon-wrap cyan">
          <Radio size={15} />
        </div>
        <div className="rsb-info">
          <span className="rsb-label">Coverage</span>
          <span className="rsb-value">Regional (250 km)</span>
        </div>
      </div>

      {/* 4. Data Type */}
      <div className="rsb-card">
        <div className="rsb-icon-wrap purple">
          <Layers size={15} />
        </div>
        <div className="rsb-info">
          <span className="rsb-label">Data Type</span>
          <span className="rsb-value">{current.dataType || "Reflectivity"}</span>
        </div>
      </div>

      {/* 5. Update Interval */}
      <div className="rsb-card">
        <div className="rsb-icon-wrap amber">
          <RefreshCw size={15} />
        </div>
        <div className="rsb-info">
          <span className="rsb-label">Update Interval</span>
          <span className="rsb-value">{current.updateInterval || "10 min"}</span>
        </div>
      </div>

      {/* 6. Mode */}
      <div className="rsb-card">
        <div className="rsb-icon-wrap slate">
          <Database size={15} />
        </div>
        <div className="rsb-info">
          <span className="rsb-label">Data Mode</span>
          <span className="rsb-value mode-badge">{current.mode || "Demo Data"}</span>
        </div>
      </div>
    </div>
  );
}
