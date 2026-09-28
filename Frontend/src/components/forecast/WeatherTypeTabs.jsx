import { CloudRain, Thermometer, Wind, Droplets, Cloud, Zap } from "lucide-react";
import { weatherTabs } from "../../data/forecastData";
import "./WeatherTypeTabs.css";

const iconMap = {
  "cloud-rain": CloudRain,
  thermometer: Thermometer,
  wind: Wind,
  droplets: Droplets,
  cloud: Cloud,
  zap: Zap,
};

export default function WeatherTypeTabs({ active, onChange }) {
  return (
    <div className="wtt-wrapper">
      <div className="wtt-scroll">
        {weatherTabs.map((tab) => {
          const Icon = iconMap[tab.icon] || CloudRain;
          const isActive = active === tab.id;
          const isSpecial = tab.id === "thunderstorm" || tab.id === "lightning";
          return (
            <button
              key={tab.id}
              className={`wtt-tab ${isActive ? "wtt-tab--active" : ""} ${isSpecial ? "wtt-tab--special" : ""}`}
              onClick={() => onChange(tab.id)}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
