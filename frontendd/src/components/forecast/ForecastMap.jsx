import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { useWeather } from "../../services/useWeather";
import { degToCompass } from "../../services/weatherService";
import LeafletMap from "../map/LeafletMap";
import { forecastData } from "../../data/forecastData";
import "./ForecastMap.css";

const modeConfig = {
  rainfall:     { title:"Rainfall Radar Map",         subtitle:"Live RainViewer precipitation overlay · OpenStreetMap" },
  temperature:  { title:"Temperature Map",            subtitle:"Surface temperature distribution · Ranchi, Jharkhand"  },
  wind:         { title:"Wind Field Map",             subtitle:"Wind speed & direction · Ranchi, Jharkhand"            },
  humidity:     { title:"Humidity Map",               subtitle:"Relative humidity distribution · Ranchi, Jharkhand"   },
  cloudCover:   { title:"Cloud Cover Map",            subtitle:"Cloud coverage · Ranchi, Jharkhand"                   },
  thunderstorm: { title:"Thunderstorm Activity Map",  subtitle:"Storm cell tracking · Jharkhand region · Demo overlay" },
  lightning:    { title:"Live Lightning Map",         subtitle:"Strike detection & density · Jharkhand · Demo overlay" },
};

export default function ForecastMap({ mode }) {
  const [animated, setAnimated] = useState(false);
  const { data: weather } = useWeather(23.34, 85.31);

  const cfg  = modeConfig[mode] ?? modeConfig.rainfall;
  const data = forecastData[mode];

  const isStorm     = mode === "thunderstorm";
  const isLightning = mode === "lightning";
  const mapZoom     = (isStorm || isLightning) ? 7 : 5;
  const mapCenter   = (isStorm || isLightning) ? [23.34, 85.31] : [22.5, 82.0];

  // Pass live weather to the map marker popup
  const ranchWeather = weather ? {
    temperature:  weather.temperature,
    humidity:     weather.humidity,
    windSpeed:    weather.windSpeed,
    cloudCover:   weather.cloudCover,
    precipitation:weather.precipitation,
    weatherLabel: weather.weatherLabel,
    windDir:      degToCompass(weather.windDir ?? 0),
  } : null;

  return (
    <div className="forecast-map-card">
      {/* Header */}
      <div className="fmap-header">
        <div>
          <div className="fmap-title">{cfg.title}</div>
          <div className="fmap-sub">{cfg.subtitle}</div>
        </div>
        <div className="fmap-header-right">
          {/* Live badge */}
          {weather && (
            <div className="fmap-live-badge">
              <span className="fmap-live-dot" /> Live · {weather.temperature}°C · {weather.weatherLabel}
            </div>
          )}
          {(isStorm || isLightning) && (
            <button
              className={`fmap-play-btn ${animated ? "fmap-play-btn--active" : ""}`}
              onClick={() => setAnimated(p => !p)}
            >
              {animated ? <Pause size={13}/> : <Play size={13}/>}
              {animated ? "Pause" : "Animate"}
            </button>
          )}
        </div>
      </div>

      {/* Real Leaflet Map */}
      <LeafletMap
        mode={mode}
        height={360}
        center={mapCenter}
        zoom={mapZoom}
        showRanchi={true}
        ranchWeather={ranchWeather}
        animated={animated}
      />

      {/* Legend */}
      {data?.mapLegend && (
        <div className="fmap-legend">
          <span className="fmap-legend-title">
            {isStorm ? "Storm Intensity" : isLightning ? "Lightning Density" : `${data.label ?? ""} Level`}
          </span>
          <div className="fmap-legend-items">
            {data.mapLegend.map((l, i) => (
              <div key={i} className="fmap-legend-item">
                <div className="fmap-legend-dot" style={{ background: l.color }} />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
