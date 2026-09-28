import React from "react";
import { ShieldCheck, CheckCircle2, MapPin } from "lucide-react";
import { RECOMMENDED_ACTIONS_DATA } from "../../data/compareData";
import "./RecommendedActions.css";

export default function RecommendedActions({ locations }) {
  return (
    <div className="recommended-actions-card">
      <div className="rec-header">
        <ShieldCheck size={16} className="rec-icon" />
        <h3 className="rec-title">Recommended Actions</h3>
      </div>

      <div className="rec-locations-list">
        {locations.map((loc) => {
          const actions = RECOMMENDED_ACTIONS_DATA[loc.id] || RECOMMENDED_ACTIONS_DATA.ranchi;

          return (
            <div key={loc.id} className="rec-loc-group">
              <div className="rec-loc-name">
                <MapPin size={13} style={{ color: loc.themeColor }} />
                <span>{loc.name}</span>
              </div>

              <div className="rec-bullets-list">
                {actions.map((act, idx) => (
                  <div key={idx} className="rec-bullet-item">
                    <CheckCircle2 size={13} className="rec-check" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
