import React from "react";
import { CloudLightning, Zap, Info } from "lucide-react";
import { THUNDERSTORM_COMPARISON_DATA, LIGHTNING_COMPARISON_DATA } from "../../data/compareData";
import "./ThunderstormLightningComparison.css";

export default function ThunderstormLightningComparison({ locations }) {
  return (
    <div className="thunderstorm-lightning-grid">
      {/* Thunderstorm Card */}
      <div className="tlc-card">
        <div className="tlc-header">
          <CloudLightning size={16} className="tlc-icon purple" />
          <h3 className="tlc-title">Thunderstorm Activity Comparison</h3>
        </div>

        <div className="tlc-locations-list">
          {locations.map((loc) => {
            const data = THUNDERSTORM_COMPARISON_DATA[loc.id] || THUNDERSTORM_COMPARISON_DATA.ranchi;
            return (
              <div key={loc.id} className="tlc-loc-item">
                <div className="tlc-loc-head">
                  <span className="tlc-dot" style={{ background: loc.themeColor }} />
                  <strong className="tlc-loc-name">{loc.name}</strong>
                  <span className="tlc-prob-badge">{data.prob} Probability</span>
                </div>

                <div className="tlc-metrics-row">
                  <div className="tlc-m-pill">
                    <span className="tlc-m-lbl">Storm Cells</span>
                    <span className="tlc-m-val">{data.cells} Active</span>
                  </div>
                  <div className="tlc-m-pill">
                    <span className="tlc-m-lbl">Intensity</span>
                    <span className="tlc-m-val">{data.intensity}</span>
                  </div>
                  <div className="tlc-m-pill">
                    <span className="tlc-m-lbl">Duration</span>
                    <span className="tlc-m-val">{data.duration}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightning Card */}
      <div className="tlc-card">
        <div className="tlc-header">
          <Zap size={16} className="tlc-icon amber" />
          <h3 className="tlc-title">Lightning Activity Comparison</h3>
        </div>

        <div className="tlc-locations-list">
          {locations.map((loc) => {
            const data = LIGHTNING_COMPARISON_DATA[loc.id] || LIGHTNING_COMPARISON_DATA.ranchi;
            return (
              <div key={loc.id} className="tlc-loc-item">
                <div className="tlc-loc-head">
                  <span className="tlc-dot" style={{ background: loc.themeColor }} />
                  <strong className="tlc-loc-name">{loc.name}</strong>
                  <span className="tlc-prob-badge amber">{data.prob} Probability</span>
                </div>

                <div className="tlc-metrics-row">
                  <div className="tlc-m-pill">
                    <span className="tlc-m-lbl">Recent Strikes</span>
                    <span className="tlc-m-val">{data.strikes}</span>
                  </div>
                  <div className="tlc-m-pill">
                    <span className="tlc-m-lbl">Strike Density</span>
                    <span className="tlc-m-val">{data.density}</span>
                  </div>
                  <div className="tlc-m-pill">
                    <span className="tlc-m-lbl">Peak Window</span>
                    <span className="tlc-m-val">{data.peak}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
