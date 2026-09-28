import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Circle,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Search,
  Crosshair,
  Plus,
  Minus,
  Compass,
  Layers,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  ChevronDown,
  Radio,
  Wind,
  Droplets,
  Eye,
  CloudRain,
  Navigation,
} from "lucide-react";
import { fetchRadarFrames, radarTileUrl } from "../../services/weatherService";
import { RADAR_TIMELINE_FRAMES } from "../../data/radarData";
import "./RadarMap.css";

// Fix Leaflet icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const LEFT_MODE_ITEMS = [
  { id: "reflectivity", label: "Reflectivity",       icon: Radio },
  { id: "velocity",     label: "Velocity",           icon: Wind },
  { id: "precipitation",label: "Precipitation",      icon: Droplets },
  { id: "composite",    label: "Composite",          icon: Eye },
  { id: "rainfall",     label: "Rainfall Estimate",  icon: CloudRain },
  { id: "tracking",     label: "Storm Tracking",     icon: Navigation },
];

function MapController({ center, isFullscreen }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [isFullscreen]);

  useEffect(() => {
    if (center) {
      map.setView(center, 7.5, { animate: true });
    }
  }, [center]);

  return null;
}

export default function RadarMap({
  locationData,
  activeMode = "reflectivity",
  onModeChange,
  isPlaying = false,
  onTogglePlay,
  selectedFrameIndex = 6,
  onSelectFrameIndex,
  onSelectStormCell,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLayersDropdown, setShowLayersDropdown] = useState(false);
  const [radarTileFrames, setRadarTileFrames] = useState([]);

  // Layer toggles
  const [layers, setLayers] = useState({
    reflectivityClouds: true,
    rangeRings: true,
    districtLabels: true,
    satelliteBase: true,
    stormVectors: true,
    realRadarTile: false,
  });

  const mapRef = useRef(null);
  const layersDropdownRef = useRef(null);

  const loc = locationData?.location || { lat: 23.3441, lon: 85.3096, city: "Ranchi" };
  const centerCoords = [loc.lat, loc.lon];

  // Fetch real RainViewer radar frames in background
  useEffect(() => {
    fetchRadarFrames()
      .then((frames) => {
        if (frames.length) setRadarTileFrames(frames);
      })
      .catch(() => {});
  }, []);

  // Close layers dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (layersDropdownRef.current && !layersDropdownRef.current.contains(e.target)) {
        setShowLayersDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const toggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Get active frame clusters from dataset
  const activeFrameData = useMemo(() => {
    const frames = locationData?.frames || [];
    return frames[selectedFrameIndex] || frames[frames.length - 1] || { clusters: [] };
  }, [locationData, selectedFrameIndex]);

  const activeTimestamp = RADAR_TIMELINE_FRAMES[selectedFrameIndex]?.time || "11:30 AM";

  // Real rainviewer tile URL matching timeline index
  const activeRadarTileUrl = useMemo(() => {
    if (!radarTileFrames.length) return null;
    const idx = Math.min(
      Math.floor((selectedFrameIndex / (RADAR_TIMELINE_FRAMES.length - 1)) * (radarTileFrames.length - 1)),
      radarTileFrames.length - 1
    );
    return radarTileFrames[idx]?.path ? radarTileUrl(radarTileFrames[idx].path) : null;
  }, [radarTileFrames, selectedFrameIndex]);

  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn();
  };
  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut();
  };
  const handleResetCenter = () => {
    if (mapRef.current) mapRef.current.setView(centerCoords, 7.5, { animate: true });
  };

  // Custom Red Location Pin on active station (Ranchi) matching reference
  const stationPinIcon = L.divIcon({
    className: "custom-radar-station-pin",
    html: `
      <div class="radar-center-pin-wrap">
        <div class="radar-center-pin-svg">
          <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <filter id="rpinShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="rgba(0,0,0,0.5)"/>
            </filter>
            <path d="M17 0C7.61116 0 0 7.61116 0 17C0 28.5 17 44 17 44C17 44 34 28.5 34 17C34 7.61116 26.3888 0 17 0Z" fill="#EF4444" filter="url(#rpinShadow)"/>
            <circle cx="17" cy="16" r="6" fill="#FFFFFF"/>
          </svg>
        </div>
        ${isPlaying ? `<div class="radar-center-pulse-ring"></div>` : ""}
      </div>
    `,
    iconSize: [34, 44],
    iconAnchor: [17, 44],
  });

  return (
    <div className={`radar-main-map-card ${isFullscreen ? "radar-card-fullscreen" : ""}`}>
      {/* ── 1. Floating Top-Left Search Bar ── */}
      <div className="radar-map-floating-search">
        <div className="radar-search-input-wrap">
          <input
            type="text"
            placeholder="Search district or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="radar-search-input"
          />
          <Search size={15} className="radar-search-icon" />
        </div>
        <button
          className="radar-locate-search-btn"
          onClick={handleResetCenter}
          title="Locate Current Station"
        >
          <Crosshair size={15} />
        </button>
      </div>

      {/* ── 2. Floating Left Vertical Mode Selector (Matching Mockup) ── */}
      <div className="radar-map-left-modes-menu">
        {LEFT_MODE_ITEMS.map((item) => {
          const isActive = activeMode === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`radar-left-mode-tab ${isActive ? "active" : ""}`}
              onClick={() => onModeChange && onModeChange(item.id)}
            >
              <Icon size={14} className="rlm-icon" />
              <span className="rlm-label">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 3. Leaflet Map Canvas ── */}
      <div className="radar-leaflet-wrapper">
        <MapContainer
          center={centerCoords}
          zoom={7.5}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          scrollWheelZoom={true}
          ref={mapRef}
        >
          <MapController center={centerCoords} isFullscreen={isFullscreen} />

          {/* Base Satellite / Dark Imagery */}
          {layers.satelliteBase ? (
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri World Imagery"
              maxZoom={18}
            />
          ) : (
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              maxZoom={19}
            />
          )}

          {/* Optional Real RainViewer Radar Overlay */}
          {layers.realRadarTile && activeRadarTileUrl && (
            <TileLayer
              key={activeRadarTileUrl}
              url={activeRadarTileUrl}
              opacity={0.65}
              zIndex={200}
            />
          )}

          {/* Concentric Doppler Range Rings (50 km, 100 km, 150 km) */}
          {layers.rangeRings && (
            <>
              <Circle
                center={centerCoords}
                radius={50000}
                pathOptions={{
                  color: "rgba(255, 255, 255, 0.28)",
                  fill: false,
                  weight: 1,
                  dashArray: "4, 4",
                }}
              />
              <Circle
                center={centerCoords}
                radius={100000}
                pathOptions={{
                  color: "rgba(255, 255, 255, 0.24)",
                  fill: false,
                  weight: 1,
                  dashArray: "4, 4",
                }}
              />
              <Circle
                center={centerCoords}
                radius={150000}
                pathOptions={{
                  color: "rgba(255, 255, 255, 0.2)",
                  fill: false,
                  weight: 1,
                  dashArray: "4, 4",
                }}
              />
            </>
          )}

          {/* Doppler Radar Reflectivity Heat Clouds (Multi-layer gradient) */}
          {layers.reflectivityClouds && (
            <>
              {activeFrameData.clusters.map((cluster) => {
                const dbz = cluster.dbz || 30;
                const isSevere = dbz >= 50;
                const isStrong = dbz >= 40;
                const isModerate = dbz >= 30;

                // Color mappings based on meteorological dBZ palette
                const fringeColor = "#06B6D4"; // Cyan
                const midColor = isSevere ? "#EF4444" : isStrong ? "#F97316" : isModerate ? "#FACC15" : "#10B981";
                const coreColor = isSevere ? "#DC2626" : isStrong ? "#EF4444" : "#F59E0B";

                const outerRadius = cluster.radius * 1.4;
                const midRadius = cluster.radius * 0.9;
                const coreRadius = cluster.radius * 0.5;

                return (
                  <React.Fragment key={`cluster-${cluster.id}-${selectedFrameIndex}`}>
                    {/* Layer 1: Outer Cyan/Emerald cloud fringe */}
                    <CircleMarker
                      center={[cluster.lat, cluster.lon]}
                      radius={outerRadius}
                      pathOptions={{
                        className: `radar-cloud-fringe ${isPlaying ? "radar-pulse-anim" : ""}`,
                        fillColor: fringeColor,
                        fillOpacity: 0.35,
                        color: "#10B981",
                        weight: 0.6,
                        opacity: 0.4,
                      }}
                    />

                    {/* Layer 2: Mid Yellow/Orange convective band */}
                    <CircleMarker
                      center={[cluster.lat, cluster.lon]}
                      radius={midRadius}
                      pathOptions={{
                        className: `radar-cloud-mid ${isPlaying ? "radar-pulse-anim" : ""}`,
                        fillColor: midColor,
                        fillOpacity: 0.6,
                        color: "#F59E0B",
                        weight: 1,
                        opacity: 0.6,
                      }}
                    />

                    {/* Layer 3: Severe Core Red Peak */}
                    {(isStrong || isSevere) && (
                      <CircleMarker
                        center={[cluster.lat, cluster.lon]}
                        radius={coreRadius}
                        pathOptions={{
                          className: `radar-cloud-core ${isPlaying ? "radar-pulse-anim" : ""}`,
                          fillColor: coreColor,
                          fillOpacity: 0.85,
                          color: "#DC2626",
                          weight: 1.5,
                          opacity: 0.9,
                        }}
                      >
                        <Tooltip direction="top" className="radar-cell-tooltip">
                          <div className="rc-tip">
                            <strong>{cluster.label || "Convective Storm Core"}</strong>
                            <span>{cluster.dbz} dBZ {cluster.vector ? `• ${cluster.vector}` : ""}</span>
                          </div>
                        </Tooltip>
                      </CircleMarker>
                    )}
                  </React.Fragment>
                );
              })}
            </>
          )}

          {/* Surrounding Landmarks & District Boundary Labels */}
          {layers.districtLabels && locationData?.surroundingDistricts && (
            <>
              {locationData.surroundingDistricts.map((d) => {
                if (d.isPrimary) return null; // Handled by red pin
                return (
                  <CircleMarker
                    key={d.name}
                    center={[d.lat, d.lon]}
                    radius={3}
                    pathOptions={{
                      fillColor: d.isStateBorder ? "#94A3B8" : "#FFFFFF",
                      fillOpacity: 0.7,
                      color: "rgba(0,0,0,0.5)",
                      weight: 1,
                    }}
                  >
                    <Tooltip
                      direction="center"
                      permanent={true}
                      className={`radar-district-permanent-label ${d.isStateBorder ? "state-border-label" : ""}`}
                    >
                      <span>{d.name}</span>
                    </Tooltip>
                  </CircleMarker>
                );
              })}
            </>
          )}

          {/* Active Station Red Location Pin (Ranchi) */}
          <Marker position={centerCoords} icon={stationPinIcon} zIndexOffset={1000}>
            <Tooltip direction="right" offset={[14, -22]} permanent={true} className="radar-station-pill-tip">
              <div className="station-pill-box">
                <strong>{loc.city}</strong>
              </div>
            </Tooltip>
          </Marker>
        </MapContainer>
      </div>

      {/* ── 4. Map Bottom-Left Action Controls ── */}
      <div className="radar-map-bottom-left-controls">
        <button className="rm-btn" onClick={handleZoomIn} title="Zoom In">
          <Plus size={15} />
        </button>
        <button className="rm-btn" onClick={handleZoomOut} title="Zoom Out">
          <Minus size={15} />
        </button>
        <button className="rm-btn" onClick={handleResetCenter} title="Focus Station">
          <Crosshair size={15} />
        </button>
        <button className="rm-btn" onClick={handleResetCenter} title="Reset Orientation">
          <Compass size={15} />
        </button>

        {/* Layers Button with Popover */}
        <div className="radar-layers-popover-wrap" ref={layersDropdownRef}>
          <button
            className={`rm-btn layers-btn ${showLayersDropdown ? "active" : ""}`}
            onClick={() => setShowLayersDropdown(!showLayersDropdown)}
            title="Toggle Map Layers"
          >
            <Layers size={15} />
          </button>

          {showLayersDropdown && (
            <div className="radar-layers-popover-menu">
              <div className="rlp-header">Radar Map Layers</div>
              <label className="rlp-item">
                <input
                  type="checkbox"
                  checked={layers.reflectivityClouds}
                  onChange={() => toggleLayer("reflectivityClouds")}
                />
                <span>Doppler Reflectivity (dBZ)</span>
              </label>
              <label className="rlp-item">
                <input
                  type="checkbox"
                  checked={layers.rangeRings}
                  onChange={() => toggleLayer("rangeRings")}
                />
                <span>Range Rings (50/100/150km)</span>
              </label>
              <label className="rlp-item">
                <input
                  type="checkbox"
                  checked={layers.districtLabels}
                  onChange={() => toggleLayer("districtLabels")}
                />
                <span>District & Border Labels</span>
              </label>
              <label className="rlp-item">
                <input
                  type="checkbox"
                  checked={layers.satelliteBase}
                  onChange={() => toggleLayer("satelliteBase")}
                />
                <span>Satellite World Imagery</span>
              </label>
              <label className="rlp-item">
                <input
                  type="checkbox"
                  checked={layers.realRadarTile}
                  onChange={() => toggleLayer("realRadarTile")}
                />
                <span>RainViewer Global Radar Layer</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* ── 5. Floating Bottom Timeline Player Bar ── */}
      <div className="radar-map-bottom-timeline-bar">
        {/* Play/Pause Button */}
        <button
          className={`radar-timeline-play-btn ${isPlaying ? "playing" : ""}`}
          onClick={onTogglePlay}
          title={isPlaying ? "Pause Playback" : "Play Radar Animation"}
        >
          {isPlaying ? <Pause size={14} fill="#ffffff" /> : <Play size={14} fill="#ffffff" />}
        </button>

        {/* Scrub Track Steps */}
        <div className="radar-timeline-track-flex">
          {RADAR_TIMELINE_FRAMES.map((frame, idx) => {
            const isSelected = selectedFrameIndex === idx;
            const isPassed = idx <= selectedFrameIndex;
            return (
              <div
                key={frame.id}
                className={`radar-tstep-node ${isSelected ? "selected" : ""} ${isPassed ? "passed" : ""}`}
                onClick={() => onSelectFrameIndex && onSelectFrameIndex(idx)}
              >
                <div className="rtstep-dot" />
                <span className="rtstep-label">{frame.label}</span>
              </div>
            );
          })}
        </div>

        {/* Timestamp */}
        <div className="radar-timeline-time-badge">
          <span>{`22 Sep 2026, ${activeTimestamp}`}</span>
        </div>

        {/* Fullscreen Button */}
        <button
          className="radar-timeline-fs-btn"
          onClick={() => setIsFullscreen(!isFullscreen)}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Radar Map"}
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>
    </div>
  );
}
