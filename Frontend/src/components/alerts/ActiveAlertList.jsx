import React from "react";
import {
  CloudRain,
  CloudLightning,
  Zap,
  Waves,
  Wind,
  TriangleAlert,
  Clock,
  MapPin,
  ChevronRight,
  Shield,
  Info,
} from "lucide-react";
import "./ActiveAlertList.css";

const EVENT_ICON_MAP = {
  CloudRain,
  CloudLightning,
  Zap,
  Waves,
  Wind,
  TriangleAlert,
};

export function AlertCard({ alert, onSelectAlert }) {
  const IconComponent = EVENT_ICON_MAP[alert.eventIcon] || CloudRain;

  const severityLower = alert.severity.toLowerCase();

  return (
    <div className={`alert-card-item severity-${severityLower}`}>
      {/* Top Banner Row */}
      <div className="aci-top-banner">
        <div className="aci-badge-group">
          {/* Severity Badge */}
          <span className={`aci-sev-badge ${severityLower}`}>
            <span className="aci-sev-dot" />
            <span>{alert.severity} RISK</span>
          </span>

          {/* Event Tag */}
          <span className="aci-event-tag">
            <IconComponent size={13} />
            <span>{alert.eventType}</span>
          </span>
        </div>

        {/* Demo Source Badge */}
        <span className="aci-demo-source-badge">
          {alert.badgeLabel || "AI Derived • Demo"}
        </span>
      </div>

      {/* Title & Location Row */}
      <div className="aci-main-info">
        <div className="aci-icon-box" style={{ background: getEventBg(alert.eventType) }}>
          <IconComponent size={22} style={{ color: getEventColor(alert.eventType) }} />
        </div>

        <div className="aci-text-details">
          <h3 className="aci-title">{alert.title}</h3>
          <div className="aci-location-row">
            <MapPin size={13} className="aci-loc-icon" />
            <span className="aci-loc-text">{alert.location}</span>
            <span className="aci-bullet">•</span>
            <Clock size={13} className="aci-time-icon" />
            <span className="aci-time-text">{alert.timeWindow}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="aci-description">{alert.description}</p>

      {/* Metrics Row & Action */}
      <div className="aci-footer">
        <div className="aci-metrics-pills">
          <div className="aci-pill">
            <span className="aci-plabel">Expected Metric</span>
            <span className="aci-pval">{alert.rainfallMetric || alert.stormCells || alert.lightningProb}</span>
          </div>
          <div className="aci-pill">
            <span className="aci-plabel">Duration</span>
            <span className="aci-pval">{alert.expectedDuration}</span>
          </div>
          <div className="aci-pill">
            <span className="aci-plabel">Source</span>
            <span className="aci-pval">{alert.source}</span>
          </div>
        </div>

        <button
          className="aci-details-btn"
          onClick={() => onSelectAlert && onSelectAlert(alert)}
        >
          <span>View Details</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function getEventColor(eventType) {
  if (!eventType) return "#1677FF";
  const t = eventType.toLowerCase();
  if (t.includes("rain")) return "#1677FF";
  if (t.includes("thunder")) return "#8B5CF6";
  if (t.includes("lightning")) return "#F59E0B";
  if (t.includes("flood")) return "#06B6D4";
  if (t.includes("wind")) return "#64748B";
  return "#EF4444";
}

function getEventBg(eventType) {
  if (!eventType) return "rgba(22, 119, 255, 0.1)";
  const t = eventType.toLowerCase();
  if (t.includes("rain")) return "rgba(22, 119, 255, 0.1)";
  if (t.includes("thunder")) return "rgba(139, 92, 246, 0.1)";
  if (t.includes("lightning")) return "rgba(245, 158, 11, 0.1)";
  if (t.includes("flood")) return "rgba(6, 182, 212, 0.1)";
  if (t.includes("wind")) return "rgba(100, 116, 139, 0.1)";
  return "rgba(239, 68, 68, 0.1)";
}

export default function ActiveAlertList({ alerts, onSelectAlert }) {
  return (
    <div className="active-alerts-section">
      <div className="aal-header">
        <h2 className="aal-title">Active Weather Alerts</h2>
        <span className="aal-count-chip">{alerts.length} Monitored Alerts</span>
      </div>

      {alerts.length === 0 ? (
        <div className="aal-empty-state">
          <Info size={28} className="aal-empty-icon" />
          <p className="aal-empty-text">No weather alerts match the selected filter criteria.</p>
        </div>
      ) : (
        <div className="aal-feed-grid">
          {alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onSelectAlert={onSelectAlert}
            />
          ))}
        </div>
      )}
    </div>
  );
}
