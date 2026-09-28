import React from "react";
import {
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  Cloud,
  Gauge,
} from "lucide-react";
import "./TopMetricCards.css";

// Mini SVG Sparkline generator
function MiniSparkline({ points = [10, 15, 12, 24, 28, 20, 24], color = "#1677FF" }) {
  const width = 120;
  const height = 36;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - 4 - ((p - min) / range) * (height - 12);
    return `${x},${y}`;
  });

  const pathD = `M ${coords.join(" L ")}`;
  const areaD = `M 0,${height} L ${coords.join(" L ")} L ${width},${height} Z`;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="metric-sparkline-svg">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${color.replace('#', '')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TopMetricCards({ liveWeather }) {
  // Use live weather values if available, fallback to reference image values
  const metrics = [
    {
      id: "rainfall",
      icon: CloudRain,
      iconBg: "rgba(22, 119, 255, 0.1)",
      iconColor: "#1677FF",
      value: liveWeather?.precipitation ? `${liveWeather.precipitation} mm` : "24 mm",
      label: liveWeather?.precipitation > 0 ? liveWeather.weatherLabel || "Moderate Rain" : "Moderate Rain",
      badge: "Normal for this time",
      badgeColor: "#16B86A",
      type: "primary",
    },
    {
      id: "temp",
      icon: Thermometer,
      iconBg: "rgba(239, 68, 68, 0.1)",
      iconColor: "#EF4444",
      value: liveWeather?.temperature ? `${liveWeather.temperature}°C` : "28°C",
      label: "Temperature",
      sparkColor: "#1677FF",
      points: [22, 24, 25, 27, 30, 29, 28],
    },
    {
      id: "humidity",
      icon: Droplets,
      iconBg: "rgba(32, 199, 217, 0.12)",
      iconColor: "#1677FF",
      value: liveWeather?.humidity ? `${liveWeather.humidity}%` : "78%",
      label: "Humidity",
      sparkColor: "#20C7D9",
      points: [60, 68, 72, 75, 82, 80, 78],
    },
    {
      id: "wind",
      icon: Wind,
      iconBg: "rgba(139, 92, 246, 0.1)",
      iconColor: "#0284C7",
      value: liveWeather?.windSpeed ? `${liveWeather.windSpeed} km/h` : "12 km/h",
      label: "Wind Speed",
      sparkColor: "#8B5CF6",
      points: [6, 10, 14, 12, 18, 14, 12],
    },
    {
      id: "cloud",
      icon: Cloud,
      iconBg: "rgba(100, 116, 139, 0.1)",
      iconColor: "#0F172A",
      value: liveWeather?.cloudCover ? `${liveWeather.cloudCover}%` : "85%",
      label: "Cloud Cover",
      sparkColor: "#64748B",
      points: [60, 70, 75, 82, 90, 88, 85],
    },
    {
      id: "pressure",
      icon: Gauge,
      iconBg: "rgba(245, 158, 11, 0.1)",
      iconColor: "#16B86A",
      value: "1008 hPa",
      label: "Pressure",
      sparkColor: "#F59E0B",
      points: [1014, 1012, 1010, 1008, 1007, 1008, 1008],
    },
  ];

  return (
    <div className="top-metrics-grid">
      {metrics.map((m) => {
        const IconComponent = m.icon;
        return (
          <div key={m.id} className="top-metric-card">
            <div className="tm-card-content">
              <div className="tm-card-top-row">
                <div className="tm-icon-box" style={{ background: m.iconBg, color: m.iconColor }}>
                  <IconComponent size={22} strokeWidth={2.2} />
                </div>
                <div className="tm-value-block">
                  <div className="tm-value">{m.value}</div>
                  <div className="tm-label">{m.label}</div>
                </div>
              </div>

              {m.badge ? (
                <div className="tm-badge-row">
                  <span className="tm-status-badge">
                    <span className="tm-status-dot" style={{ background: m.badgeColor }} />
                    {m.badge}
                  </span>
                </div>
              ) : (
                <div className="tm-sparkline-wrap">
                  <MiniSparkline points={m.points} color={m.sparkColor} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
