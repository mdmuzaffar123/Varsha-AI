import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, ArrowRight, Leaf, Wind, Droplets, Thermometer, Cloud, RefreshCw } from "lucide-react";
import { rainfallLegend } from "../../data/homeData";
import { useWeather } from "../../services/useWeather";
import { degToCompass } from "../../services/weatherService";
import LeafletMap from "../map/LeafletMap";
import HeroMetrics from "./HeroMetrics";
import heroBg from "../../assets/images/hero_bg.jpg";
import "./HomeHero.css";

export default function HomeHero() {
  const navigate = useNavigate();
  const [demoOpen, setDemoOpen] = useState(false);
  const { data: weather, loading, error } = useWeather(23.34, 85.31);

  const w = {
    location:      "Ranchi, Jharkhand",
    temperature:   weather?.temperature   ?? "--",
    humidity:      weather?.humidity      ?? "--",
    windSpeed:     weather?.windSpeed     ?? "--",
    cloudCover:    weather?.cloudCover    ?? "--",
    precipitation: weather?.precipitation ?? "--",
    weatherLabel:  weather?.weatherLabel  ?? "Fetching...",
    windDir:       weather ? degToCompass(weather.windDir ?? 0) : "--",
    status:        weather?.weatherCode >= 95 ? "Thunderstorm Warning"
                 : weather?.precipitation > 0 ? "Active Rainfall"
                 : "Normal for this time",
    statusColor:   weather?.weatherCode >= 95 ? "#EF4444"
                 : weather?.precipitation > 0 ? "#1677FF"
                 : "#16B86A",
  };

  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay" />
        <div className="hero-inner container">

          {/* LEFT */}
          <div className="hero-left">
            <div className="badge badge-green hero-badge">
              <Leaf size={13} /> AI for a Safer, Climate-Resilient India
            </div>
            <h1 className="hero-title">
              Predict Rainfall Today<br />
              Build a <span className="hero-accent">Safer Tomorrow</span>
            </h1>
            <p className="hero-desc">
              Combining DNR Radar, satellite data and advanced deep learning models to deliver
              accurate rainfall predictions, early warnings and actionable insights for a more
              climate-resilient India.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate("/forecast")}>
                Explore Forecast <ArrowRight size={16} />
              </button>
              <button className="btn btn-ghost" onClick={() => setDemoOpen(true)}>
                <Play size={15} fill="white" /> Watch Demo
              </button>
            </div>
          </div>

          {/* RIGHT — live weather card */}
          <div className="hero-right">
            <div className="weather-card">
              <div className="weather-card-header">
                <div>
                  <div className="wc-location">{w.location}</div>
                  <div className="wc-sub">
                    {loading ? "Fetching live data..." : error ? "Demo data shown" : "Live Weather · Open-Meteo"}
                  </div>
                </div>
                <div className="wc-status" style={{ borderColor: `${w.statusColor}44`, background: `${w.statusColor}22`, color: w.statusColor }}>
                  {w.status}
                </div>
              </div>

              {/* ── REAL LEAFLET MAP ───────────────── */}
              <div className="map-container">
                <LeafletMap
                  mode="rainfall"
                  height={220}
                  center={[22.5, 82.0]}
                  zoom={4}
                  showRanchi={true}
                  ranchWeather={weather}
                />
                {/* Rainfall legend overlay */}
                <div className="radar-legend">
                  <div className="legend-title">Rainfall (mm/hr)</div>
                  <div className="legend-bar">
                    {rainfallLegend.map(r => (
                      <div key={r.value} className="legend-item">
                        <div className="legend-color" style={{ background: r.color }} />
                        <span>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live metric strip */}
              <div className="wc-metrics">
                <div className="wc-metric">
                  <Thermometer size={14} color="#EF4444" />
                  <span className="wm-val">{loading ? "…" : `${w.temperature}°C`}</span>
                  <span className="wm-label">Temp</span>
                </div>
                <div className="wc-metric">
                  <Droplets size={14} color="#1677FF" />
                  <span className="wm-val">{loading ? "…" : `${w.humidity}%`}</span>
                  <span className="wm-label">Humidity</span>
                </div>
                <div className="wc-metric">
                  <Wind size={14} color="#20C7D9" />
                  <span className="wm-val">{loading ? "…" : `${w.windSpeed} km/h`}</span>
                  <span className="wm-label">Wind</span>
                </div>
                <div className="wc-metric">
                  <Cloud size={14} color="#94A3B8" />
                  <span className="wm-val">{loading ? "…" : `${w.cloudCover}%`}</span>
                  <span className="wm-label">Cloud</span>
                </div>
              </div>

              {/* Weather description */}
              {!loading && (
                <div className="wc-desc-row">
                  <span className="wc-weather-label">{w.weatherLabel}</span>
                  <span className="wc-precip">{w.precipitation > 0 ? `${w.precipitation} mm rain` : "No rain now"}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <HeroMetrics stats={[
          { id:1, value:"98%",       label:"Forecast Accuracy",     sublabel:"Short-term",   icon:"target"  },
          { id:2, value:"600+",      label:"Districts Covered",     sublabel:"Across India", icon:"map-pin" },
          { id:3, value:"Real-time", label:"DNR Radar + Satellite", sublabel:"Live data",    icon:"radio"   },
          { id:4, value:"AI Agent",  label:"LLM-Based Alerts",      sublabel:"Intelligent",  icon:"bot"     },
          { id:5, value:"Safer",     label:"Communities",           sublabel:"Our mission",  icon:"shield"  },
        ]} />
      </section>

      {/* Demo Modal */}
      {demoOpen && (
        <div className="demo-overlay" onClick={() => setDemoOpen(false)}>
          <div className="demo-modal" onClick={e => e.stopPropagation()}>
            <button className="demo-close" onClick={() => setDemoOpen(false)}>✕</button>
            <h3 className="demo-title">VarshaAI Product Demo</h3>
            <div className="demo-video-area">
              <Play size={48} color="#1677FF" />
              <p>Product demo video will be integrated here.</p>
              <span>AI-powered rainfall forecasting for India</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
