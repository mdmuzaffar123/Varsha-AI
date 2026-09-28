import React from "react";
import { Lightbulb, TrendingUp, ShieldCheck, Cpu, Sparkles } from "lucide-react";
import { AI_MODEL_INSIGHTS } from "../../data/modelData";
import "./AIModelInsights.css";

const INS_ICONS = {
  Lightbulb: Lightbulb,
  TrendingUp: TrendingUp,
  ShieldCheck: ShieldCheck,
  Cpu: Cpu,
};

export default function AIModelInsights() {
  return (
    <div className="ai-model-insights-card">
      <div className="ami-header">
        <h4 className="ami-title">Insights from AI Model</h4>
        <span className="ami-live-tag">
          <Sparkles size={11} />
          <span>Nowcast Active</span>
        </span>
      </div>

      <div className="ami-bullets-list">
        {AI_MODEL_INSIGHTS.map((item) => {
          const Icon = INS_ICONS[item.icon] || Lightbulb;
          return (
            <div key={item.id} className={`ami-bullet-row ${item.isHighlight ? "highlight" : ""}`}>
              <div className="ami-icon-wrap">
                <Icon size={15} />
              </div>
              <span className="ami-text">{item.text}</span>
            </div>
          );
        })}
      </div>

      <div className="ami-footer-note">
        <span>Validated with IMD Doppler & INSAT-3D spatial observations</span>
      </div>
    </div>
  );
}
