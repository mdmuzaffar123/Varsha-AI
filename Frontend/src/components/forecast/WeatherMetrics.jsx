import { CloudRain, Thermometer, Wind, Droplets, Cloud, Zap, Activity, Radio, Clock, Navigation, MapPin, BarChart2, Gauge, Compass, Layers } from "lucide-react";
import "./WeatherMetrics.css";

const iconMap = {
  "cloud-rain": CloudRain, thermometer: Thermometer, wind: Wind, droplets: Droplets,
  cloud: Cloud, zap: Zap, activity: Activity, radio: Radio, clock: Clock,
  navigation: Navigation, "map-pin": MapPin, "bar-chart-2": BarChart2,
  gauge: Gauge, compass: Compass, layers: Layers, "arrow-up": Wind, "eye-off": Cloud,
};

export default function WeatherMetrics({ metrics, mode }) {
  const isStorm = mode === "thunderstorm" || mode === "lightning";
  return (
    <div className={`wm-grid ${isStorm ? "wm-grid--wide" : ""}`}>
      {metrics.map((m, i) => {
        const Icon = iconMap[m.icon] || Activity;
        return (
          <div key={i} className="wm-card" style={{ "--accent": m.color }}>
            <div className="wm-icon-wrap" style={{ background: `${m.color}18`, color: m.color }}>
              <Icon size={18} />
            </div>
            <div className="wm-value" style={{ color: m.color }}>{m.value}</div>
            <div className="wm-label">{m.label}</div>
          </div>
        );
      })}
    </div>
  );
}
