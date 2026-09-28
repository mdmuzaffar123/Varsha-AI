import React from "react";
import { Radio, Crosshair, Clock, Database, Info } from "lucide-react";
import "./RadarDataSource.css";

export default function RadarDataSource({ locationData }) {
  const specs = locationData?.stationSpecs || {
    stationName: "Ranchi (DWR)",
    range: "250 km",
    updateFrequency: "10 minutes",
    dataSource: "IMD DWR + AI Processing",
    status: "Demo / Frontend",
  };

  return (
    <div className="radar-data-source-card">
      <div className="rds-header">
        <h3 className="rds-title">DNR Radar Information</h3>
      </div>

      <div className="rds-items-list">
        {/* 1. Radar Station */}
        <div className="rds-item">
          <div className="rds-icon-wrap blue">
            <Radio size={16} />
          </div>
          <div className="rds-info">
            <span className="rds-lbl">Radar Station</span>
            <strong className="rds-val">{specs.stationName}</strong>
          </div>
        </div>

        {/* 2. Range */}
        <div className="rds-item">
          <div className="rds-icon-wrap cyan">
            <Crosshair size={16} />
          </div>
          <div className="rds-info">
            <span className="rds-lbl">Range</span>
            <strong className="rds-val">{specs.range}</strong>
          </div>
        </div>

        {/* 3. Update Frequency */}
        <div className="rds-item">
          <div className="rds-icon-wrap purple">
            <Clock size={16} />
          </div>
          <div className="rds-info">
            <span className="rds-lbl">Update Frequency</span>
            <strong className="rds-val">{specs.updateFrequency}</strong>
          </div>
        </div>

        {/* 4. Data Source */}
        <div className="rds-item">
          <div className="rds-icon-wrap emerald">
            <Database size={16} />
          </div>
          <div className="rds-info">
            <span className="rds-lbl">Data Source</span>
            <strong className="rds-val">{specs.dataSource}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
