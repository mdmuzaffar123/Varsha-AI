import { Target, MapPin, Radio, Bot, Shield } from "lucide-react";
import "./HeroMetrics.css";

const iconMap = { target: Target, "map-pin": MapPin, radio: Radio, bot: Bot, shield: Shield };

export default function HeroMetrics({ stats }) {
  return (
    <div className="metrics-strip">
      <div className="metrics-inner container">
        {stats.map(s => {
          const Icon = iconMap[s.icon] || Target;
          return (
            <div key={s.id} className="metric-card">
              <div className="metric-icon"><Icon size={18} /></div>
              <div className="metric-value">{s.value}</div>
              <div className="metric-label">{s.label}</div>
              <div className="metric-sub">{s.sublabel}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
