// ============================================================
// VarshaAI — LeafletMap (v2)
// Real interactive map: react-leaflet + OpenStreetMap/CartoDB
// RainViewer radar overlay for rainfall/thunderstorm modes
// Demo storm cells + lightning markers for those modes
// ============================================================
import { useEffect, useState, useRef } from "react";
import {
  MapContainer, TileLayer, Marker, Popup,
  CircleMarker, Tooltip, useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchRadarFrames, radarTileUrl } from "../../services/weatherService";
import { forecastData } from "../../data/forecastData";
import "./LeafletMap.css";

// ── Fix default Leaflet marker icons in Vite ────────────────
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon   from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow });

// ── Custom Ranchi pulse icon ────────────────────────────────
const ranchIcon = L.divIcon({
  className: "",
  html: `<div class="ranchi-marker"><div class="ranchi-dot"></div><div class="ranchi-ring"></div></div>`,
  iconSize: [24,24], iconAnchor: [12,12],
});

// ── Colour maps ─────────────────────────────────────────────
const stormColour = {
  severe:"#EF4444", strong:"#F97316",
  moderate:"#EAB308", weak:"#3B82F6", developing:"#22D3EE"
};
const strikeColour = { high:"#7C3AED", moderate:"#EAB308", low:"#3B82F6" };

// Convert the percentage-based positions in demo data to real lat/lon
// by offsetting from Ranchi centre across a ~6x7 degree span
function pctToLatLon(xPct, yPct) {
  const lat = 23.34 + (0.5 - yPct / 100) * 6;
  const lon = 85.31 + (xPct / 100 - 0.5) * 7;
  return [lat, lon];
}

// ── Inner: FlyTo when mode/center changes ──────────────────
function FlyToCenter({ center, zoom }) {
  const map     = useMap();
  const prevRef = useRef(null);
  useEffect(() => {
    const key = `${center[0]},${center[1]},${zoom}`;
    if (prevRef.current !== key) {
      prevRef.current = key;
      map.flyTo(center, zoom, { duration: 0.8 });
    }
  }, [map, center, zoom]);
  return null;
}

// ── Inner: live radar tile layer ───────────────────────────
function RadarLayer({ path }) {
  if (!path) return null;
  return (
    <TileLayer
      key={path}
      url={radarTileUrl(path)}
      opacity={0.6}
      attribution="&copy; RainViewer"
      zIndex={200}
    />
  );
}

// ── Storm cells ────────────────────────────────────────────
function StormLayer({ animated }) {
  return forecastData.thunderstorm.stormCells.map(cell => {
    const [lat, lon] = pctToLatLon(cell.x, cell.y);
    const col = stormColour[cell.intensity] ?? "#EAB308";
    return (
      <CircleMarker key={cell.id} center={[lat, lon]}
        radius={cell.size * 1.6}
        pathOptions={{ color: col, fillColor: col, fillOpacity: 0.35, weight: 2 }}
        className={animated ? "storm-animated" : ""}
      >
        <Tooltip sticky>
          <strong>{cell.label}</strong><br/>Intensity: {cell.intensity}
        </Tooltip>
      </CircleMarker>
    );
  });
}

// ── Lightning strikes ──────────────────────────────────────
function LightningLayer({ animated }) {
  return forecastData.lightning.strikes.map(s => {
    const [lat, lon] = pctToLatLon(s.x, s.y);
    const col = strikeColour[s.intensity] ?? "#EAB308";
    const zapIcon = L.divIcon({
      className: "",
      html: `<div class="zap-icon ${s.recent ? "zap-icon--recent" : ""} ${animated ? "zap-icon--animate" : ""}" style="color:${col}">⚡</div>`,
      iconSize: [s.recent ? 22 : 16, s.recent ? 22 : 16],
      iconAnchor: [s.recent ? 11 : 8, s.recent ? 11 : 8],
    });
    return (
      <Marker key={s.id} position={[lat, lon]} icon={zapIcon}>
        <Tooltip>Strike — {s.intensity} density{s.recent ? " · recent" : ""}</Tooltip>
      </Marker>
    );
  });
}

// ── Main export ────────────────────────────────────────────
export default function LeafletMap({
  mode = "rainfall",
  height = 340,
  center = [22.5, 82.0],
  zoom = 5,
  showRanchi = true,
  ranchWeather = null,
  animated = false,
}) {
  const [radarPath,    setRadarPath]    = useState(null);
  const [radarLoading, setRadarLoading] = useState(true);

  // Fetch latest RainViewer radar frame once
  useEffect(() => {
    fetchRadarFrames().then(frames => {
      setRadarPath(frames.length ? frames[frames.length - 1].path : null);
      setRadarLoading(false);
    }).catch(() => setRadarLoading(false));
  }, []);

  const isStorm     = mode === "thunderstorm";
  const isLightning = mode === "lightning";
  const showRadar   = mode === "rainfall" || isStorm;
  const useDarkTile = isStorm || isLightning;

  return (
    <div className="leaflet-map-wrap" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={true}
      >
        <FlyToCenter center={center} zoom={zoom} />

        {/* Base tile layer */}
        {useDarkTile ? (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            maxZoom={19}
          />
        ) : (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom={19}
          />
        )}

        {/* Live radar precipitation overlay */}
        {showRadar && !radarLoading && <RadarLayer path={radarPath} />}

        {/* Storm / lightning overlays */}
        {isStorm     && <StormLayer     animated={animated} />}
        {isLightning && <LightningLayer animated={animated} />}

        {/* Ranchi marker */}
        {showRanchi && (
          <Marker position={[23.34, 85.31]} icon={ranchIcon}>
            <Popup>
              <div className="map-popup">
                <strong>Ranchi, Jharkhand</strong>
                {ranchWeather ? (
                  <>
                    <div>{ranchWeather.temperature}°C · {ranchWeather.weatherLabel}</div>
                    <div>Humidity: {ranchWeather.humidity}% · Wind: {ranchWeather.windSpeed} km/h</div>
                    <div>Precip: {ranchWeather.precipitation} mm · Cloud: {ranchWeather.cloudCover}%</div>
                  </>
                ) : <div>Click to load weather…</div>}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Radar live badge */}
      {showRadar && (
        <div className="radar-status-badge">
          {radarLoading ? "⏳ Loading radar…"
            : radarPath  ? "🔴 Live Radar — RainViewer"
            : "⚠ Radar unavailable"}
        </div>
      )}
    </div>
  );
}
