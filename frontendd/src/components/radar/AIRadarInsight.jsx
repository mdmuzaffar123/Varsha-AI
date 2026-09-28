import React, { useState } from "react";
import { CloudRain, TrendingUp, MapPin, ShieldCheck, Sparkles, X, Info } from "lucide-react";
import "./AIRadarInsight.css";

const ICON_MAP = {
  CloudRain: CloudRain,
  TrendingUp: TrendingUp,
  MapPin: MapPin,
  ShieldCheck: ShieldCheck,
};

export default function AIRadarInsight({ locationData }) {
  const [activeExplainModal, setActiveExplainModal] = useState(null);
  const insights = locationData?.aiInsights || [];

  return (
    <div className="radar-ai-insights-card">
      <div className="rais-header">
        <div className="rais-title-row">
          <h3 className="rais-title">Key Insights (AI Enhanced)</h3>
          <span className="rais-ai-badge">
            <Sparkles size={12} />
            <span>AI Radar Nowcast</span>
          </span>
        </div>
      </div>

      {/* 4 Distinct Colored Cards Grid */}
      <div className="rais-cards-grid">
        {insights.map((item) => {
          const Icon = ICON_MAP[item.icon] || CloudRain;
          return (
            <div
              key={item.id}
              className={`rais-item-card ${item.colorScheme}`}
              onClick={() => setActiveExplainModal(item)}
              title="Click to view AI meteorological explanation"
            >
              <div className={`rais-icon-circle ${item.colorScheme}`}>
                <Icon size={16} />
              </div>
              <p className="rais-item-text">{item.text}</p>
            </div>
          );
        })}
      </div>

      {/* Interactive Explanation Modal */}
      {activeExplainModal && (
        <div className="rais-modal-overlay" onClick={() => setActiveExplainModal(null)}>
          <div className="rais-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="rais-modal-head">
              <div className="rais-mhead-left">
                <Sparkles size={16} className="rais-mhead-spark" />
                <h4>{activeExplainModal.title} — AI Interpretation</h4>
              </div>
              <button
                className="rais-modal-close"
                onClick={() => setActiveExplainModal(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="rais-modal-body">
              <div className="rais-modal-tag-row">
                <span className={`rais-mtag ${activeExplainModal.colorScheme}`}>
                  {activeExplainModal.badge}
                </span>
                <span className="rais-mconf">Confidence: {activeExplainModal.confidence}</span>
                <span className="rais-mdemo">Frontend Demo</span>
              </div>

              <div className="rais-modal-statement">
                <strong>Observation:</strong> {activeExplainModal.text}
              </div>

              <div className="rais-modal-explanation">
                <strong>Meteorological Reasoning:</strong>
                <p>{activeExplainModal.explanation}</p>
              </div>

              <div className="rais-modal-note">
                <Info size={13} />
                <span>
                  Demo interpretation. When Python neural nowcasting (EarthFormer / ConvNeXt-3D) is connected, real-time spatial tensors will drive this output.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
