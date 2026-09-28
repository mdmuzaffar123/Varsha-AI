import React from "react";
import { CloudRain, CloudDrizzle, CloudSun, Cloud } from "lucide-react";
import { sevenDayForecastData } from "../../data/forecastData";
import "./SevenDayForecast.css";

const weatherIconMap = {
  "rain-moderate": CloudRain,
  "rain-light": CloudDrizzle,
  drizzle: CloudDrizzle,
  cloudy: Cloud,
  "partly-cloudy": CloudSun,
};

export default function SevenDayForecast() {
  return (
    <div className="seven-day-card">
      <div className="sevenday-header">
        <h3 className="sevenday-title">7-Day Forecast</h3>
      </div>

      <div className="sevenday-list">
        {sevenDayForecastData.map((item, idx) => {
          const IconComp = weatherIconMap[item.icon] || CloudRain;
          const isModerate = item.rainfall.includes("24") || item.rainfall.includes("32");
          const isNoRain = item.rainfall === "0 mm";

          return (
            <div key={idx} className="sevenday-row">
              {/* Day & Date */}
              <div className="sday-col-date">
                <span className="sday-date-text">{item.day}</span>
              </div>

              {/* Weather Icon */}
              <div className="sday-col-icon">
                <IconComp
                  size={18}
                  color={isNoRain ? "#64748B" : isModerate ? "#1677FF" : "#0284C7"}
                  strokeWidth={2.2}
                />
              </div>

              {/* Rainfall & Condition */}
              <div className="sday-col-rain">
                <span className="sday-rain-val">{item.rainfall}</span>
                <span className="sday-condition-text">{item.condition}</span>
              </div>

              {/* High / Low Temps */}
              <div className="sday-col-temp">
                <span className="sday-temp-high">{item.tempMax}°</span>
                <span className="sday-temp-slash">/</span>
                <span className="sday-temp-low">{item.tempMin}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
