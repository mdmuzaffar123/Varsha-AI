import React from "react";
import { Bell, TriangleAlert, CloudLightning, Clock } from "lucide-react";
import { ALERT_SUMMARY_CARDS } from "../../data/alertData";
import "./AlertSummary.css";

const ICON_MAP = {
  Bell,
  TriangleAlert,
  CloudLightning,
  Clock,
};

export default function AlertSummary() {
  return (
    <div className="alert-summary-grid">
      {ALERT_SUMMARY_CARDS.map((card) => {
        const IconComponent = ICON_MAP[card.iconName] || Bell;
        return (
          <div key={card.id} className="asc-card">
            {/* Top row: Icon & Demo Badge */}
            <div className="asc-top-row">
              <div
                className="asc-icon-box"
                style={{ backgroundColor: card.bgColor, color: card.color }}
              >
                <IconComponent size={20} />
              </div>
              <span className="asc-demo-tag">Demo</span>
            </div>

            {/* Value & Title */}
            <div className="asc-content">
              <span className="asc-value" style={{ color: card.color }}>
                {card.value}
              </span>
              <h3 className="asc-title">{card.title}</h3>
              <p className="asc-desc">{card.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
