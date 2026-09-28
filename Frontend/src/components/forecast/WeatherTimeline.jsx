import { Clock } from "lucide-react";
import "./WeatherTimeline.css";

export default function WeatherTimeline({ timeline, mode }) {
  const isLightning = mode === "lightning";
  const maxVal = Math.max(...timeline.map(d => d.value), 1);

  return (
    <div className="wtl-card">
      <div className="wtl-header">
        <Clock size={15} />
        <span className="wtl-title">
          {mode === "thunderstorm" ? "Storm Activity Timeline"
            : mode === "lightning" ? "Lightning Timeline"
            : "Forecast Timeline"}
        </span>
      </div>
      <div className="wtl-track">
        {timeline.map((item, i) => {
          const height = Math.max((item.value / maxVal) * 64, 6);
          const isActive = item.active;
          const isHist = item.historical;
          return (
            <div key={i} className={`wtl-step ${isActive ? "wtl-step--active" : ""} ${isHist ? "wtl-step--hist" : ""}`}>
              <div className="wtl-bar-wrap" title={item.label}>
                <div
                  className={`wtl-bar ${isActive ? "wtl-bar--active" : ""} ${isHist ? "wtl-bar--hist" : ""} ${mode === "thunderstorm" ? "wtl-bar--storm" : ""} ${mode === "lightning" ? "wtl-bar--lightning" : ""}`}
                  style={{ height }}
                />
              </div>
              <div className="wtl-val">{item.label}</div>
              <div className="wtl-time">{item.time}</div>
              {isHist && <div className="wtl-hist-badge">hist</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
