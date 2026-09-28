import { AlertTriangle, ShieldAlert, MapPin, Activity, Wind } from "lucide-react";
import "./LightningRisk.css";

export default function LightningRisk({ risk }) {
  const levelColors = { Low: "#16B86A", Moderate: "#F59E0B", High: "#EF4444", Extreme: "#7C3AED" };
  const col = levelColors[risk.level] || "#EF4444";

  return (
    <div className="lrisk-card">
      <div className="lrisk-header">
        <div className="lrisk-icon" style={{ background: `${col}18`, color: col }}>
          <ShieldAlert size={20} />
        </div>
        <div>
          <div className="lrisk-title">Lightning Risk</div>
          <div className="lrisk-level" style={{ color: col, background: `${col}18`, border: `1px solid ${col}44` }}>
            {risk.level}
          </div>
        </div>
      </div>

      <div className="lrisk-grid">
        <div className="lrisk-item">
          <Activity size={14} color={col} />
          <span className="lrisk-item-label">Outdoor Activity</span>
          <span className="lrisk-item-val" style={{ color: col }}>{risk.outdoorActivity}</span>
        </div>
        <div className="lrisk-item">
          <AlertTriangle size={14} color="#F59E0B" />
          <span className="lrisk-item-label">Open Area Exposure</span>
          <span className="lrisk-item-val" style={{ color: "#F59E0B" }}>{risk.openAreaExposure}</span>
        </div>
        <div className="lrisk-item">
          <MapPin size={14} color="#1677FF" />
          <span className="lrisk-item-label">Storm Proximity</span>
          <span className="lrisk-item-val" style={{ color: "#1677FF" }}>{risk.stormProximity}</span>
        </div>
      </div>

      <div className="lrisk-advisory">
        <AlertTriangle size={14} color="#F59E0B" />
        <p>{risk.recommendation}</p>
      </div>
    </div>
  );
}
