import React, { useState, useEffect } from "react";
import RadarHeader from "../components/radar/RadarHeader";
import RadarStatusBar from "../components/radar/RadarStatusBar";
import RadarMap from "../components/radar/RadarMap";
import RadarInfoPanel from "../components/radar/RadarInfoPanel";
import RadarCrossSection from "../components/radar/RadarCrossSection";
import AIRadarInsight from "../components/radar/AIRadarInsight";
import RadarFrames from "../components/radar/RadarFrames";
import RadarDataSource from "../components/radar/RadarDataSource";
import StormCellList from "../components/radar/StormCellList";
import RadarPipeline from "../components/radar/RadarPipeline";
import { radarDataByLocation, RADAR_TIMELINE_FRAMES } from "../data/radarData";
import { fetchRadarData } from "../services/radarService";
import "./DNRRadar.css";

export default function DNRRadar() {
  const [selectedLocation, setSelectedLocation] = useState("ranchi");
  const [activeMode, setActiveMode] = useState("reflectivity");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(6); // Default to Latest (11:30 AM)
  const [currentMiniStep, setCurrentMiniStep] = useState("m-now");
  const [locationData, setLocationData] = useState(radarDataByLocation.ranchi);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch / switch location data
  useEffect(() => {
    setIsLoading(true);
    fetchRadarData(selectedLocation).then((data) => {
      setLocationData(data);
      setIsLoading(false);
    });
  }, [selectedLocation]);

  // Frame Playback Loop (Subtle & controlled when isPlaying is TRUE)
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedFrameIndex((prev) => (prev + 1) % RADAR_TIMELINE_FRAMES.length);
      }, 1500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="dnr-radar-page-container">
      {/* ── 1. Page Header (Title, Selectors, Mode Pills, Mini Player) ── */}
      <RadarHeader
        activeMode={activeMode}
        onModeChange={setActiveMode}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        currentMiniStep={currentMiniStep}
        onMiniStepChange={setCurrentMiniStep}
      />

      {/* ── 2. Compact Radar Status Bar ── */}
      <RadarStatusBar locationData={locationData} />

      {/* ── 3. Main Hero Middle Section: Radar Map (Left) + Snapshot & Cross-Section (Right) ── */}
      <div className="radar-middle-main-grid">
        {/* Left Column: Hero Interactive Radar Map */}
        <div className="rmain-map-column">
          <RadarMap
            locationData={locationData}
            activeMode={activeMode}
            onModeChange={setActiveMode}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            selectedFrameIndex={selectedFrameIndex}
            onSelectFrameIndex={setSelectedFrameIndex}
          />
        </div>

        {/* Right Column: Current Radar Snapshot & Vertical Cross Section */}
        <div className="rmain-side-column">
          <RadarInfoPanel locationData={locationData} />
          <RadarCrossSection locationData={locationData} />
        </div>
      </div>

      {/* ── 4. Bottom 3-Card Grid (Matching Reference Screenshot) ── */}
      <div className="radar-bottom-cards-grid">
        {/* Card 1: Key Insights (AI Enhanced - 4 Distinct Colored Boxes) */}
        <div className="rbottom-col-insights">
          <AIRadarInsight locationData={locationData} />
        </div>

        {/* Card 2: Recent Radar Frames (6 Interactive Thumbnails) */}
        <div className="rbottom-col-frames">
          <RadarFrames
            selectedFrameIndex={selectedFrameIndex}
            onSelectFrameIndex={setSelectedFrameIndex}
          />
        </div>

        {/* Card 3: DNR Radar Information (Station Specs) */}
        <div className="rbottom-col-specs">
          <RadarDataSource locationData={locationData} />
        </div>
      </div>

      {/* ── 5. Technical Additions: Detected Storm Cells & AI Pipeline Preview ── */}
      <div className="radar-technical-row">
        <StormCellList locationData={locationData} />
        <RadarPipeline />
      </div>
    </div>
  );
}
