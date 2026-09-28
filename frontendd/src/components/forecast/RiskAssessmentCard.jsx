import React from "react";
import { Shield, Info, AlertTriangle, Droplets, Waves, Mountain } from "lucide-react";
import { riskAssessmentData } from "../../data/forecastData";
import "./RiskAssessmentCard.css";

const riskIconMap = {
  "alert-triangle": AlertTriangle,
  droplets: Droplets,
  waves: Waves,
  mountain: Mountain,
};

export default function RiskAssessmentCard() {
  return (
    <div className="risk-assess-card">
      <div className="rassess-header">
        <div className="rassess-title-group">
          <Shield size={17} color="#1677FF" />
          <h4 className="rassess-title">Risk Assessment</h4>
        </div>
        <button className="rassess-info-btn" title="Model Risk Methodology">
          <Info size={15} />
        </button>
      </div>

      <div className="rassess-list">
        {riskAssessmentData.map((item) => {
          const IconComp = riskIconMap[item.icon] || AlertTriangle;

          return (
            <div key={item.id} className="rassess-row">
              <div className="rassess-item-left">
                <div
                  className="rassess-item-icon"
                  style={{
                    color: item.color,
                    background: `${item.color}18`,
                  }}
                >
                  <IconComp size={16} />
                </div>
                <div className="rassess-item-meta">
                  <span className="rassess-item-label">{item.label}</span>
                  <span
                    className="rassess-level-tag"
                    style={{
                      color: item.color,
                    }}
                  >
                    {item.level}
                  </span>
                </div>
              </div>

              {/* Progress Track / Bar */}
              <div className="rassess-bar-wrap">
                <div
                  className="rassess-bar-fill"
                  style={{
                    width: `${item.percent}%`,
                    background: item.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
