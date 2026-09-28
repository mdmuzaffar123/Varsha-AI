import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ArrowRight, Check } from "lucide-react";
import { NOTIFICATION_PREFERENCES_DEMO } from "../../data/alertData";
import "./NotificationPreview.css";

export default function NotificationPreview() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState(() => {
    const initialState = {};
    NOTIFICATION_PREFERENCES_DEMO.forEach((item) => {
      initialState[item.key] = item.defaultOn;
    });
    return initialState;
  });

  const togglePref = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="notification-preview-card">
      <div className="npr-header">
        <div className="npr-title-group">
          <Bell size={16} className="npr-icon" />
          <h3 className="npr-title">Notification Preferences</h3>
        </div>
        <button
          className="npr-link-btn"
          onClick={() => navigate("/settings")}
        >
          <span>Manage notification settings</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <p className="npr-subtitle">
        Configure automated alert dispatch channels and threshold triggers for your account.
      </p>

      {/* Toggles Grid */}
      <div className="npr-grid">
        {NOTIFICATION_PREFERENCES_DEMO.map((pref) => {
          const isChecked = !!preferences[pref.key];
          return (
            <div
              key={pref.key}
              className={`npr-toggle-item ${isChecked ? "active" : ""}`}
              onClick={() => togglePref(pref.key)}
            >
              <div className="npr-ti-info">
                <span className="npr-ti-label">{pref.label}</span>
                <span className={`npr-ti-status ${isChecked ? "on" : "off"}`}>
                  {isChecked ? "ON" : "OFF"}
                </span>
              </div>

              {/* Custom Toggle Switch */}
              <div className={`npr-switch ${isChecked ? "checked" : ""}`}>
                <div className="npr-switch-thumb" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
