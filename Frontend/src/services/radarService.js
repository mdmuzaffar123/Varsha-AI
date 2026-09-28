// DNR Radar Service Layer
// Prepares frontend architecture for future Python/FastAPI endpoints:
// GET /api/radar/current
// GET /api/radar/frames
// GET /api/radar/reflectivity
// GET /api/radar/storm-cells
// GET /api/radar/cross-section
// GET /api/radar/location

import {
  radarDataByLocation,
  RADAR_LOCATIONS,
  RADAR_TIMELINE_FRAMES,
  RADAR_AI_PIPELINE_STEPS,
} from "../data/radarData";

export async function fetchRadarLocations() {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(RADAR_LOCATIONS);
    }, 120);
  });
}

export async function fetchRadarData(locationId = "ranchi") {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = radarDataByLocation[locationId] || radarDataByLocation.ranchi;
      resolve(data);
    }, 150);
  });
}

export async function fetchStormCells(locationId = "ranchi") {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = radarDataByLocation[locationId] || radarDataByLocation.ranchi;
      resolve(data.stormCells || []);
    }, 100);
  });
}

export async function fetchRadarCrossSection(locationId = "ranchi") {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = radarDataByLocation[locationId] || radarDataByLocation.ranchi;
      resolve(data.crossSection || null);
    }, 100);
  });
}

export async function fetchRadarTimeline() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(RADAR_TIMELINE_FRAMES);
    }, 80);
  });
}

export async function fetchRadarPipeline() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(RADAR_AI_PIPELINE_STEPS);
    }, 80);
  });
}
