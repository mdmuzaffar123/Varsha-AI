import React from "react";
import { Radio, CloudSun, Cpu, Sparkles } from "lucide-react";
import { ALERT_SOURCES_DATA } from "../../data/alertData";
import "./AlertSources.css";

const ICON_MAP = {
  Radio,
  CloudSun,
  Cpu,
  Sparkles,
};

export default function AlertSources() {
  return (
    <div className="alert-sources-card">
      <div className="asrc-header">
        <h3 className="asrc-title">Alert Intelligence Sources</h3>
        <span className="asrc-badge">Multi-Source Integration</span>
      </div>

      <p className="asrc-subtitle">
        Sensor observation feeds and machine learning inference pipelines powering early warnings.
      </p>

      {/* 4 Cards Grid */}
      <div className="asrc-grid">
        {ALERT_SOURCES_DATA.map((src) => {
          const IconComponent = ICON_MAP[src.iconName] || Cpu;
          return (
            <div key={src.id} className="asrc-item-card">
              <div className="asrc-top">
                <div
                  className="asrc-icon-box"
                  style={{
                    backgroundColor: `${src.color}15`,
                    color: src.color,
                  }}
                >
                  <IconComponent size={18} />
                </div>
                <span className="asrc-status">{src.status}</span>
              </div>

              <h4 className="asrc-name">{src.title}</h4>
              <p className="asrc-purpose">{src.purpose}</p>

              {src.models && (
                <div className="asrc-models-pill">
                  <span>Models:</span>
                  <strong>{src.models}</strong>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
