import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Play,
  Pause,
  Maximize2,
  Minimize2,
  ChevronDown,
  Plus,
  Minus,
  Crosshair,
  Zap,
  Radio,
} from "lucide-react";
import { fetchRadarFrames, radarTileUrl } from "../../services/weatherService";
import "./InteractiveRadarMap.css";

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

// District grid locations across Jharkhand & surrounding key nodes
const districtPoints = [
  { id: "ranchi",      name: "Ranchi",      lat: 23.3441, lon: 85.3096, isPrimary: true },
  { id: "hazaribagh",  name: "Hazaribagh",  lat: 23.9925, lon: 85.3637 },
  { id: "dhanbad",     name: "Dhanbad",     lat: 23.7957, lon: 86.4304 },
  { id: "jamshedpur",  name: "Jamshedpur",  lat: 22.8046, lon: 86.2029 },
  { id: "deoghar",     name: "Deoghar",     lat: 24.4826, lon: 86.7000 },
  { id: "bokaro",      name: "Bokaro",      lat: 23.6693, lon: 86.1511 },
  { id: "giridih",     name: "Giridih",     lat: 24.1856, lon: 86.3097 },
  { id: "ramgarh",     name: "Ramgarh",     lat: 23.6300, lon: 85.5100 },
  { id: "chaibasa",    name: "Chaibasa",    lat: 22.5540, lon: 85.8080 },
  { id: "dumka",       name: "Dumka",       lat: 24.2698, lon: 87.2479 },
  { id: "palamu",      name: "Daltonganj",  lat: 24.0416, lon: 84.0734 },
  { id: "koderma",     name: "Koderma",     lat: 24.4670, lon: 85.5940 },
  { id: "khunti",      name: "Khunti",      lat: 23.0740, lon: 85.2780 },
  { id: "gumla",       name: "Gumla",       lat: 23.0440, lon: 84.5420 },
  { id: "simdega",     name: "Simdega",     lat: 22.6140, lon: 84.5090 },
  { id: "latehar",     name: "Latehar",     lat: 23.7430, lon: 84.4980 },
  { id: "garhwa",      name: "Garhwa",      lat: 24.1580, lon: 83.8050 },
  { id: "chatra",      name: "Chatra",      lat: 24.2120, lon: 84.8720 },
  { id: "pakur",       name: "Pakur",       lat: 24.6330, lon: 87.8480 },
  { id: "sahibganj",   name: "Sahibganj",   lat: 25.2420, lon: 87.6430 },
  { id: "godda",       name: "Godda",       lat: 24.8270, lon: 87.2140 },
  { id: "jamtara",     name: "Jamtara",     lat: 23.9630, lon: 86.8020 },
  { id: "lohardaga",   name: "Lohardaga",   lat: 23.4350, lon: 84.6810 },
  { id: "saraikela",   name: "Saraikela",   lat: 22.7000, lon: 85.9300 },
  // Border landmarks
  { id: "gaya",        name: "Gaya (Bihar)", lat: 24.7955, lon: 85.0002 },
  { id: "purulia",     name: "Purulia (WB)", lat: 23.3322, lon: 86.3652 },
  { id: "asansol",     name: "Asansol (WB)", lat: 23.6889, lon: 86.9661 },
  { id: "rourkela",    name: "Rourkela (OD)", lat: 22.2604, lon: 84.8536 },
];

// Spatiotemporal simulation values per timeline index (0 to 5)
const districtSimulationData = {
  rainfall: [
    { ranchi: 24, hazaribagh: 28, dhanbad: 12, jamshedpur: 18, deoghar: 8, bokaro: 22, giridih: 14, ramgarh: 32, chaibasa: 10, dumka: 6, palamu: 5, koderma: 16, khunti: 26, gumla: 14, simdega: 8, latehar: 12, garhwa: 4, chatra: 9, pakur: 3, sahibganj: 2, godda: 4, jamtara: 10, lohardaga: 20, saraikela: 15, gaya: 6, purulia: 14, asansol: 12, rourkela: 8 },
    { ranchi: 38, hazaribagh: 35, dhanbad: 20, jamshedpur: 24, deoghar: 12, bokaro: 30, giridih: 22, ramgarh: 45, chaibasa: 14, dumka: 10, palamu: 8, koderma: 25, khunti: 34, gumla: 18, simdega: 10, latehar: 16, garhwa: 6, chatra: 14, pakur: 5, sahibganj: 4, godda: 6, jamtara: 16, lohardaga: 26, saraikela: 20, gaya: 8, purulia: 22, asansol: 18, rourkela: 12 },
    { ranchi: 56, hazaribagh: 64, dhanbad: 48, jamshedpur: 36, deoghar: 28, bokaro: 58, giridih: 42, ramgarh: 68, chaibasa: 22, dumka: 24, palamu: 14, koderma: 46, khunti: 48, gumla: 28, simdega: 16, latehar: 24, garhwa: 10, chatra: 22, pakur: 12, sahibganj: 8, godda: 14, jamtara: 32, lohardaga: 38, saraikela: 30, gaya: 14, purulia: 42, asansol: 38, rourkela: 18 },
    { ranchi: 22, hazaribagh: 32, dhanbad: 45, jamshedpur: 28, deoghar: 36, bokaro: 40, giridih: 38, ramgarh: 26, chaibasa: 16, dumka: 34, palamu: 8, koderma: 22, khunti: 18, gumla: 12, simdega: 8, latehar: 10, garhwa: 5, chatra: 12, pakur: 20, sahibganj: 16, godda: 22, jamtara: 38, lohardaga: 14, saraikela: 22, gaya: 10, purulia: 44, asansol: 46, rourkela: 10 },
    { ranchi: 8, hazaribagh: 12, dhanbad: 24, jamshedpur: 14, deoghar: 22, bokaro: 18, giridih: 20, ramgarh: 10, chaibasa: 6, dumka: 26, palamu: 4, koderma: 8, khunti: 6, gumla: 4, simdega: 3, latehar: 4, garhwa: 2, chatra: 5, pakur: 24, sahibganj: 22, godda: 20, jamtara: 22, lohardaga: 5, saraikela: 10, gaya: 4, purulia: 26, asansol: 28, rourkela: 4 },
    { ranchi: 2, hazaribagh: 4, dhanbad: 8, jamshedpur: 5, deoghar: 10, bokaro: 6, giridih: 8, ramgarh: 3, chaibasa: 2, dumka: 12, palamu: 1, koderma: 3, khunti: 2, gumla: 1, simdega: 1, latehar: 2, garhwa: 1, chatra: 2, pakur: 14, sahibganj: 12, godda: 10, jamtara: 8, lohardaga: 2, saraikela: 4, gaya: 2, purulia: 10, asansol: 12, rourkela: 2 },
  ],
  temperature: [
    { ranchi: 28, hazaribagh: 27, dhanbad: 31, jamshedpur: 32, deoghar: 30, bokaro: 30, giridih: 29, ramgarh: 28, chaibasa: 33, dumka: 31, palamu: 34, koderma: 29, khunti: 27, gumla: 28, simdega: 29, latehar: 30, garhwa: 35, chatra: 31, pakur: 32, sahibganj: 31, godda: 32, jamtara: 31, lohardaga: 28, saraikela: 33, gaya: 33, purulia: 32, asansol: 32, rourkela: 31 },
    { ranchi: 30, hazaribagh: 29, dhanbad: 33, jamshedpur: 34, deoghar: 32, bokaro: 32, giridih: 31, ramgarh: 30, chaibasa: 35, dumka: 33, palamu: 36, koderma: 31, khunti: 29, gumla: 30, simdega: 31, latehar: 32, garhwa: 37, chatra: 33, pakur: 34, sahibganj: 33, godda: 34, jamtara: 33, lohardaga: 30, saraikela: 35, gaya: 35, purulia: 34, asansol: 34, rourkela: 33 },
    { ranchi: 34, hazaribagh: 33, dhanbad: 36, jamshedpur: 37, deoghar: 35, bokaro: 35, giridih: 34, ramgarh: 33, chaibasa: 38, dumka: 36, palamu: 39, koderma: 34, khunti: 32, gumla: 33, simdega: 34, latehar: 35, garhwa: 40, chatra: 36, pakur: 37, sahibganj: 36, godda: 37, jamtara: 36, lohardaga: 33, saraikela: 38, gaya: 38, purulia: 37, asansol: 37, rourkela: 35 },
    { ranchi: 29, hazaribagh: 28, dhanbad: 32, jamshedpur: 33, deoghar: 31, bokaro: 31, giridih: 30, ramgarh: 29, chaibasa: 34, dumka: 32, palamu: 35, koderma: 30, khunti: 28, gumla: 29, simdega: 30, latehar: 31, garhwa: 36, chatra: 32, pakur: 33, sahibganj: 32, godda: 33, jamtara: 32, lohardaga: 29, saraikela: 34, gaya: 34, purulia: 33, asansol: 33, rourkela: 32 },
    { ranchi: 24, hazaribagh: 23, dhanbad: 26, jamshedpur: 27, deoghar: 25, bokaro: 25, giridih: 24, ramgarh: 24, chaibasa: 28, dumka: 26, palamu: 28, koderma: 24, khunti: 23, gumla: 24, simdega: 25, latehar: 25, garhwa: 29, chatra: 25, pakur: 27, sahibganj: 26, godda: 27, jamtara: 26, lohardaga: 24, saraikela: 28, gaya: 27, purulia: 27, asansol: 27, rourkela: 26 },
    { ranchi: 22, hazaribagh: 21, dhanbad: 24, jamshedpur: 25, deoghar: 23, bokaro: 23, giridih: 22, ramgarh: 22, chaibasa: 26, dumka: 24, palamu: 25, koderma: 22, khunti: 21, gumla: 22, simdega: 23, latehar: 23, garhwa: 26, chatra: 23, pakur: 25, sahibganj: 24, godda: 25, jamtara: 24, lohardaga: 22, saraikela: 26, gaya: 25, purulia: 25, asansol: 25, rourkela: 24 },
  ],
  wind: [
    { ranchi: 12, hazaribagh: 16, dhanbad: 18, jamshedpur: 14, deoghar: 10, bokaro: 16, giridih: 14, ramgarh: 20, chaibasa: 12, dumka: 10, palamu: 8, koderma: 14, khunti: 15, gumla: 10, simdega: 8, latehar: 12, garhwa: 7, chatra: 10, pakur: 8, sahibganj: 8, godda: 9, jamtara: 14, lohardaga: 14, saraikela: 12, gaya: 10, purulia: 16, asansol: 16, rourkela: 10 },
    { ranchi: 24, hazaribagh: 30, dhanbad: 28, jamshedpur: 22, deoghar: 18, bokaro: 26, giridih: 24, ramgarh: 34, chaibasa: 18, dumka: 16, palamu: 14, koderma: 26, khunti: 26, gumla: 16, simdega: 12, latehar: 18, garhwa: 12, chatra: 16, pakur: 14, sahibganj: 12, godda: 14, jamtara: 24, lohardaga: 22, saraikela: 20, gaya: 16, purulia: 26, asansol: 26, rourkela: 16 },
    { ranchi: 42, hazaribagh: 48, dhanbad: 38, jamshedpur: 32, deoghar: 26, bokaro: 44, giridih: 36, ramgarh: 52, chaibasa: 28, dumka: 24, palamu: 20, koderma: 38, khunti: 38, gumla: 24, simdega: 18, latehar: 26, garhwa: 16, chatra: 24, pakur: 20, sahibganj: 18, godda: 20, jamtara: 34, lohardaga: 32, saraikela: 30, gaya: 22, purulia: 38, asansol: 36, rourkela: 22 },
    { ranchi: 18, hazaribagh: 22, dhanbad: 32, jamshedpur: 20, deoghar: 26, bokaro: 28, giridih: 26, ramgarh: 20, chaibasa: 16, dumka: 24, palamu: 10, koderma: 18, khunti: 16, gumla: 12, simdega: 10, latehar: 14, garhwa: 8, chatra: 12, pakur: 18, sahibganj: 16, godda: 18, jamtara: 26, lohardaga: 14, saraikela: 18, gaya: 12, purulia: 30, asansol: 32, rourkela: 14 },
    { ranchi: 10, hazaribagh: 12, dhanbad: 18, jamshedpur: 12, deoghar: 14, bokaro: 14, giridih: 14, ramgarh: 10, chaibasa: 8, dumka: 16, palamu: 6, koderma: 10, khunti: 8, gumla: 6, simdega: 6, latehar: 8, garhwa: 5, chatra: 7, pakur: 14, sahibganj: 12, godda: 12, jamtara: 14, lohardaga: 8, saraikela: 10, gaya: 8, purulia: 18, asansol: 18, rourkela: 8 },
    { ranchi: 6, hazaribagh: 8, dhanbad: 10, jamshedpur: 8, deoghar: 8, bokaro: 8, giridih: 8, ramgarh: 6, chaibasa: 6, dumka: 8, palamu: 4, koderma: 6, khunti: 5, gumla: 4, simdega: 4, latehar: 5, garhwa: 4, chatra: 5, pakur: 8, sahibganj: 8, godda: 8, jamtara: 8, lohardaga: 5, saraikela: 6, gaya: 5, purulia: 10, asansol: 10, rourkela: 5 },
  ],
  humidity: [
    { ranchi: 78, hazaribagh: 82, dhanbad: 74, jamshedpur: 72, deoghar: 68, bokaro: 76, giridih: 72, ramgarh: 84, chaibasa: 70, dumka: 68, palamu: 58, koderma: 74, khunti: 80, gumla: 72, simdega: 68, latehar: 70, garhwa: 55, chatra: 66, pakur: 68, sahibganj: 65, godda: 66, jamtara: 72, lohardaga: 76, saraikela: 72, gaya: 62, purulia: 74, asansol: 72, rourkela: 68 },
    { ranchi: 86, hazaribagh: 88, dhanbad: 80, jamshedpur: 78, deoghar: 74, bokaro: 84, giridih: 78, ramgarh: 92, chaibasa: 76, dumka: 72, palamu: 64, koderma: 80, khunti: 88, gumla: 78, simdega: 72, latehar: 76, garhwa: 60, chatra: 72, pakur: 72, sahibganj: 70, godda: 72, jamtara: 78, lohardaga: 84, saraikela: 78, gaya: 68, purulia: 80, asansol: 78, rourkela: 72 },
    { ranchi: 94, hazaribagh: 96, dhanbad: 90, jamshedpur: 84, deoghar: 82, bokaro: 92, giridih: 88, ramgarh: 98, chaibasa: 82, dumka: 80, palamu: 72, koderma: 90, khunti: 95, gumla: 88, simdega: 80, latehar: 86, garhwa: 68, chatra: 80, pakur: 80, sahibganj: 78, godda: 80, jamtara: 88, lohardaga: 92, saraikela: 84, gaya: 76, purulia: 90, asansol: 88, rourkela: 78 },
    { ranchi: 82, hazaribagh: 86, dhanbad: 88, jamshedpur: 78, deoghar: 84, bokaro: 86, giridih: 84, ramgarh: 84, chaibasa: 76, dumka: 86, palamu: 66, koderma: 80, khunti: 80, gumla: 76, simdega: 72, latehar: 74, garhwa: 62, chatra: 72, pakur: 86, sahibganj: 84, godda: 86, jamtara: 88, lohardaga: 78, saraikela: 78, gaya: 70, purulia: 88, asansol: 90, rourkela: 72 },
    { ranchi: 72, hazaribagh: 75, dhanbad: 80, jamshedpur: 70, deoghar: 78, bokaro: 76, giridih: 76, ramgarh: 74, chaibasa: 68, dumka: 82, palamu: 58, koderma: 70, khunti: 70, gumla: 68, simdega: 64, latehar: 65, garhwa: 55, chatra: 64, pakur: 84, sahibganj: 82, godda: 82, jamtara: 80, lohardaga: 68, saraikela: 70, gaya: 62, purulia: 82, asansol: 84, rourkela: 64 },
    { ranchi: 65, hazaribagh: 68, dhanbad: 72, jamshedpur: 64, deoghar: 70, bokaro: 68, giridih: 68, ramgarh: 66, chaibasa: 62, dumka: 74, palamu: 52, koderma: 64, khunti: 62, gumla: 60, simdega: 58, latehar: 58, garhwa: 48, chatra: 56, pakur: 76, sahibganj: 74, godda: 74, jamtara: 72, lohardaga: 60, saraikela: 62, gaya: 54, purulia: 74, asansol: 76, rourkela: 58 },
  ],
  cloudCover: [
    { ranchi: 85, hazaribagh: 88, dhanbad: 70, jamshedpur: 65, deoghar: 50, bokaro: 75, giridih: 65, ramgarh: 90, chaibasa: 60, dumka: 55, palamu: 45, koderma: 70, khunti: 85, gumla: 70, simdega: 60, latehar: 65, garhwa: 40, chatra: 55, pakur: 50, sahibganj: 45, godda: 50, jamtara: 65, lohardaga: 80, saraikela: 65, gaya: 45, purulia: 70, asansol: 68, rourkela: 60 },
    { ranchi: 92, hazaribagh: 95, dhanbad: 82, jamshedpur: 78, deoghar: 65, bokaro: 88, giridih: 78, ramgarh: 98, chaibasa: 72, dumka: 68, palamu: 55, koderma: 82, khunti: 92, gumla: 80, simdega: 68, latehar: 75, garhwa: 50, chatra: 68, pakur: 60, sahibganj: 55, godda: 60, jamtara: 78, lohardaga: 90, saraikela: 75, gaya: 55, purulia: 82, asansol: 80, rourkela: 70 },
    { ranchi: 98, hazaribagh: 100, dhanbad: 95, jamshedpur: 88, deoghar: 80, bokaro: 98, giridih: 90, ramgarh: 100, chaibasa: 82, dumka: 82, palamu: 68, koderma: 94, khunti: 98, gumla: 90, simdega: 78, latehar: 86, garhwa: 60, chatra: 80, pakur: 75, sahibganj: 70, godda: 75, jamtara: 92, lohardaga: 96, saraikela: 86, gaya: 70, purulia: 95, asansol: 94, rourkela: 80 },
    { ranchi: 75, hazaribagh: 82, dhanbad: 92, jamshedpur: 72, deoghar: 88, bokaro: 88, giridih: 86, ramgarh: 78, chaibasa: 68, dumka: 90, palamu: 50, koderma: 74, khunti: 70, gumla: 65, simdega: 58, latehar: 60, garhwa: 45, chatra: 58, pakur: 92, sahibganj: 88, godda: 90, jamtara: 90, lohardaga: 68, saraikela: 70, gaya: 52, purulia: 92, asansol: 94, rourkela: 62 },
    { ranchi: 50, hazaribagh: 60, dhanbad: 75, jamshedpur: 55, deoghar: 72, bokaro: 68, giridih: 68, ramgarh: 52, chaibasa: 45, dumka: 78, palamu: 35, koderma: 55, khunti: 45, gumla: 40, simdega: 38, latehar: 40, garhwa: 30, chatra: 42, pakur: 82, sahibganj: 80, godda: 80, jamtara: 75, lohardaga: 45, saraikela: 50, gaya: 38, purulia: 76, asansol: 78, rourkela: 42 },
    { ranchi: 30, hazaribagh: 40, dhanbad: 50, jamshedpur: 35, deoghar: 52, bokaro: 45, giridih: 45, ramgarh: 32, chaibasa: 28, dumka: 58, palamu: 20, koderma: 35, khunti: 28, gumla: 25, simdega: 22, latehar: 25, garhwa: 18, chatra: 26, pakur: 65, sahibganj: 60, godda: 62, jamtara: 50, lohardaga: 28, saraikela: 32, gaya: 22, purulia: 52, asansol: 55, rourkela: 25 },
  ],
};

// Convective Storm Cells for Thunderstorm Analysis Mode
const thunderstormCellsByTimeline = [
  [
    { id: "tc-1", lat: 23.34, lon: 85.31, dbz: 48, intensity: "Severe",   radiusKm: 18, motion: "↗ NE 18 km/h", hailRisk: "Moderate", label: "Cell Alpha (Ranchi)" },
    { id: "tc-2", lat: 23.75, lon: 85.60, dbz: 42, intensity: "Strong",   radiusKm: 14, motion: "↗ NE 22 km/h", hailRisk: "Low",      label: "Cell Beta (Ramgarh)" },
    { id: "tc-3", lat: 24.10, lon: 85.38, dbz: 36, intensity: "Moderate", radiusKm: 12, motion: "→ E 15 km/h",  hailRisk: "None",     label: "Cell Gamma (Hazaribagh)" },
  ],
  [
    { id: "tc-1", lat: 23.46, lon: 85.48, dbz: 54, intensity: "Severe",   radiusKm: 22, motion: "↗ NE 20 km/h", hailRisk: "High",     label: "Cell Alpha (Ramgarh)" },
    { id: "tc-2", lat: 23.88, lon: 85.80, dbz: 46, intensity: "Severe",   radiusKm: 18, motion: "↗ NE 24 km/h", hailRisk: "Moderate", label: "Cell Beta (Bokaro)" },
    { id: "tc-3", lat: 24.18, lon: 85.62, dbz: 40, intensity: "Strong",   radiusKm: 15, motion: "→ E 18 km/h",  hailRisk: "Low",      label: "Cell Gamma (Giridih)" },
  ],
  [
    { id: "tc-1", lat: 23.65, lon: 85.78, dbz: 58, intensity: "Severe",   radiusKm: 28, motion: "↗ NE 22 km/h", hailRisk: "Very High", label: "Supercell (Bokaro)" },
    { id: "tc-2", lat: 24.08, lon: 86.15, dbz: 52, intensity: "Severe",   radiusKm: 22, motion: "→ E 25 km/h",  hailRisk: "High",      label: "Cell Beta (Dhanbad)" },
  ],
  [
    { id: "tc-1", lat: 23.82, lon: 86.42, dbz: 44, intensity: "Strong",   radiusKm: 20, motion: "→ E 24 km/h",  hailRisk: "Low",       label: "Cell Alpha (Dhanbad)" },
    { id: "tc-2", lat: 24.28, lon: 86.68, dbz: 38, intensity: "Moderate", radiusKm: 14, motion: "→ E 20 km/h",  hailRisk: "None",      label: "Cell Beta (Deoghar)" },
  ],
  [
    { id: "tc-1", lat: 23.95, lon: 86.95, dbz: 32, intensity: "Moderate", radiusKm: 12, motion: "→ E 18 km/h",  hailRisk: "None",      label: "Cell Alpha (Jamtara)" },
  ],
  [
    { id: "tc-1", lat: 24.40, lon: 87.50, dbz: 22, intensity: "Developing", radiusKm: 8, motion: "→ E 12 km/h", hailRisk: "None",     label: "Decaying (Dumka)" },
  ],
];

// Lightning Strike Arrays for Lightning Analysis Mode
const lightningStrikesByTimeline = [
  [
    { id: "ls-1", lat: 23.36, lon: 85.34, recent: true,  peakKa: -42, type: "CG (Cloud-to-Ground)", density: "Extreme" },
    { id: "ls-2", lat: 23.32, lon: 85.28, recent: true,  peakKa: -28, type: "IC (Intra-Cloud)",     density: "High" },
    { id: "ls-3", lat: 23.45, lon: 85.42, recent: true,  peakKa: -55, type: "CG (Cloud-to-Ground)", density: "Extreme" },
    { id: "ls-4", lat: 23.68, lon: 85.55, recent: false, peakKa: -18, type: "IC (Intra-Cloud)",     density: "Moderate" },
  ],
  [
    { id: "ls-1", lat: 23.48, lon: 85.52, recent: true,  peakKa: -68, type: "CG (Cloud-to-Ground)", density: "Extreme" },
    { id: "ls-2", lat: 23.55, lon: 85.64, recent: true,  peakKa: -48, type: "CG (Cloud-to-Ground)", density: "Extreme" },
    { id: "ls-3", lat: 23.82, lon: 85.78, recent: true,  peakKa: -36, type: "IC (Intra-Cloud)",     density: "High" },
    { id: "ls-4", lat: 24.12, lon: 85.58, recent: false, peakKa: -44, type: "CG (Cloud-to-Ground)", density: "Moderate" },
  ],
  [
    { id: "ls-1", lat: 23.68, lon: 85.85, recent: true,  peakKa: -92, type: "CG (Cloud-to-Ground)", density: "Extreme" },
    { id: "ls-2", lat: 23.74, lon: 86.02, recent: true,  peakKa: -84, type: "CG (Cloud-to-Ground)", density: "Extreme" },
    { id: "ls-3", lat: 24.05, lon: 86.22, recent: true,  peakKa: -76, type: "CG (Cloud-to-Ground)", density: "Extreme" },
    { id: "ls-4", lat: 24.22, lon: 85.95, recent: false, peakKa: -52, type: "CG (Cloud-to-Ground)", density: "High" },
  ],
  [
    { id: "ls-1", lat: 23.85, lon: 86.48, recent: true,  peakKa: -48, type: "CG (Cloud-to-Ground)", density: "High" },
    { id: "ls-2", lat: 24.25, lon: 86.72, recent: false, peakKa: -36, type: "IC (Intra-Cloud)",     density: "Moderate" },
  ],
  [
    { id: "ls-1", lat: 23.98, lon: 86.98, recent: true,  peakKa: -24, type: "IC (Intra-Cloud)",     density: "Moderate" },
  ],
  [
    { id: "ls-1", lat: 24.45, lon: 87.55, recent: false, peakKa: -14, type: "IC (Intra-Cloud)",     density: "Low" },
  ],
];

const timelineSteps = [
  { label: "Now",   time: "22 Sep 2026, 11:30 AM", status: "Active Observation" },
  { label: "+1h",   time: "22 Sep 2026, 12:30 PM", status: "Convection Intensifying" },
  { label: "+3h",   time: "22 Sep 2026, 02:30 PM", status: "Peak Front Passage" },
  { label: "+6h",   time: "22 Sep 2026, 05:30 PM", status: "Eastward Movement" },
  { label: "+12h",  time: "22 Sep 2026, 11:30 PM", status: "System Dissipation" },
  { label: "+24h",  time: "23 Sep 2026, 11:30 AM", status: "Atmospheric Stabilization" },
];

function getDotVisualForMode(mode, val, isSelected) {
  let color = "#10B981"; // Green
  let level = "Normal";
  let radius = isSelected ? 10 : 7;

  if (mode === "rainfall") {
    if (val >= 50) {
      color = "#EF4444"; // Red
      level = "Heavy Rain";
      radius = isSelected ? 13 : 10;
    } else if (val >= 20) {
      color = "#F59E0B"; // Yellow
      level = "Moderate Rain";
      radius = isSelected ? 11 : 8;
    } else if (val > 0) {
      color = "#10B981"; // Green
      level = "Light Rain";
      radius = isSelected ? 9 : 6;
    } else {
      color = "#38BDF8";
      level = "No Rain";
      radius = 5;
    }
  } else if (mode === "temperature") {
    if (val >= 35) {
      color = "#EF4444";
      level = "High Temp";
      radius = isSelected ? 13 : 10;
    } else if (val >= 28) {
      color = "#F59E0B";
      level = "Moderate";
      radius = isSelected ? 11 : 8;
    } else {
      color = "#10B981";
      level = "Normal";
      radius = isSelected ? 9 : 6;
    }
  } else if (mode === "wind") {
    if (val >= 35) {
      color = "#EF4444";
      level = "High Gusts";
      radius = isSelected ? 13 : 10;
    } else if (val >= 18) {
      color = "#F59E0B";
      level = "Moderate Breeze";
      radius = isSelected ? 11 : 8;
    } else {
      color = "#10B981";
      level = "Light Wind";
      radius = isSelected ? 9 : 6;
    }
  } else if (mode === "humidity") {
    if (val >= 88) {
      color = "#EF4444";
      level = "High Humidity";
      radius = isSelected ? 13 : 10;
    } else if (val >= 70) {
      color = "#F59E0B";
      level = "Moderate";
      radius = isSelected ? 11 : 8;
    } else {
      color = "#10B981";
      level = "Normal";
      radius = isSelected ? 9 : 6;
    }
  } else if (mode === "cloudCover") {
    if (val >= 80) {
      color = "#EF4444";
      level = "Overcast";
      radius = isSelected ? 13 : 10;
    } else if (val >= 45) {
      color = "#F59E0B";
      level = "Partly Cloudy";
      radius = isSelected ? 11 : 8;
    } else {
      color = "#10B981";
      level = "Clear / Fair";
      radius = isSelected ? 9 : 6;
    }
  }

  return { color, level, radius };
}

function MapController({ isFullscreen }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [isFullscreen]);
  return null;
}

export default function InteractiveRadarMap({ selectedDistrict = "Ranchi", liveWeather, activeTab = "rainfall" }) {
  const [mapMode, setMapMode] = useState("radar"); // 'radar', 'satellite', 'forecast'
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLayersDropdown, setShowLayersDropdown] = useState(false);

  // Floating Layer Checkboxes
  const [layersState, setLayersState] = useState({
    dopplerClouds: true,
    dotsMesh: true,
    districtBoundary: true,
    stormCells: true,
    lightningFlashes: true,
  });

  const [radarFrames, setRadarFrames] = useState([]);
  const mapRef = useRef(null);
  const layersDropdownRef = useRef(null);

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

  // Fetch real RainViewer radar frames
  useEffect(() => {
    fetchRadarFrames()
      .then((frames) => {
        if (frames.length) {
          setRadarFrames(frames);
        }
      })
      .catch(() => {});
  }, []);

  // Compute active radar frame URL synchronized with timeline
  const activeRadarTile = useMemo(() => {
    if (!radarFrames.length) return null;
    const frameIndex = Math.min(
      Math.floor((timelineIndex / (timelineSteps.length - 1)) * (radarFrames.length - 1)),
      radarFrames.length - 1
    );
    return radarFrames[frameIndex]?.path ? radarTileUrl(radarFrames[frameIndex].path) : null;
  }, [radarFrames, timelineIndex]);

  // Animation timeline loop: advances every 1.5s when playing
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimelineIndex((prev) => (prev + 1) % timelineSteps.length);
      }, 1500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const currentTimeline = timelineSteps[timelineIndex];
  const isThunderstormMode = activeTab === "thunderstorm";
  const isLightningMode = activeTab === "lightning";

  // Data values for standard dots
  const currentStepData = useMemo(() => {
    const modeKey = districtSimulationData[activeTab] ? activeTab : "rainfall";
    return districtSimulationData[modeKey][timelineIndex] || districtSimulationData.rainfall[0];
  }, [activeTab, timelineIndex]);

  // Active Thunderstorm Cells
  const currentStormCells = useMemo(() => {
    return thunderstormCellsByTimeline[timelineIndex] || thunderstormCellsByTimeline[0];
  }, [timelineIndex]);

  // Active Lightning Strikes
  const currentLightningStrikes = useMemo(() => {
    return lightningStrikesByTimeline[timelineIndex] || lightningStrikesByTimeline[0];
  }, [timelineIndex]);

  const toggleLayer = (layerKey) => {
    setLayersState((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn();
  };
  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut();
  };
  const handleResetCenter = () => {
    if (mapRef.current) mapRef.current.setView([23.3441, 85.3096], 7, { animate: true });
  };

  return (
    <div className={`interactive-radar-card ${isFullscreen ? "radar-fullscreen" : ""}`}>
      {/* ── Top Map Control Bar (Clean, Left-Aligned with Popover) ── */}
      <div className="radar-top-nav">
        <div className="radar-modes-group">
          <button
            className={`radar-mode-btn ${mapMode === "radar" ? "active" : ""}`}
            onClick={() => setMapMode("radar")}
          >
            Radar (Live)
          </button>
          <button
            className={`radar-mode-btn ${mapMode === "satellite" ? "active" : ""}`}
            onClick={() => setMapMode("satellite")}
          >
            Satellite
          </button>
          <button
            className={`radar-mode-btn ${mapMode === "forecast" ? "active" : ""}`}
            onClick={() => setMapMode("forecast")}
          >
            Forecast (AI)
          </button>

          {/* Layers Popover Button */}
          <div className="radar-layers-wrap" ref={layersDropdownRef}>
            <button
              className={`radar-layers-btn ${showLayersDropdown ? "active" : ""}`}
              onClick={() => setShowLayersDropdown(!showLayersDropdown)}
            >
              <span>Layers</span>
              <ChevronDown size={13} />
            </button>

            {/* Clean Dropdown Popover Menu */}
            {showLayersDropdown && (
              <div className="radar-layers-dropdown-popover">
                <label className="rfl-popover-item">
                  <input
                    type="checkbox"
                    checked={layersState.dopplerClouds}
                    onChange={() => toggleLayer("dopplerClouds")}
                  />
                  <span>Doppler Heat Clouds (Cyan/Yellow/Red)</span>
                </label>
                <label className="rfl-popover-item">
                  <input
                    type="checkbox"
                    checked={layersState.dotsMesh}
                    onChange={() => toggleLayer("dotsMesh")}
                  />
                  <span>District Dots (Red/Yellow/Green)</span>
                </label>
                <label className="rfl-popover-item">
                  <input
                    type="checkbox"
                    checked={layersState.stormCells}
                    onChange={() => toggleLayer("stormCells")}
                  />
                  <span>Thunderstorm Cells (dBZ)</span>
                </label>
                <label className="rfl-popover-item">
                  <input
                    type="checkbox"
                    checked={layersState.lightningFlashes}
                    onChange={() => toggleLayer("lightningFlashes")}
                  />
                  <span>Lightning Strikes (⚡)</span>
                </label>
                <label className="rfl-popover-item">
                  <input
                    type="checkbox"
                    checked={layersState.districtBoundary}
                    onChange={() => toggleLayer("districtBoundary")}
                  />
                  <span>District Boundaries</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Minimal Mode Indicator Badge (Centered/Separated from right legend) */}
        <div className="radar-header-center-badge">
          {isThunderstormMode && (
            <div className="radar-badge-pill storm">
              <Radio size={12} className="spin-slow" />
              <span>Convection ({currentStormCells.length} Cells)</span>
            </div>
          )}
          {isLightningMode && (
            <div className="radar-badge-pill lightning">
              <Zap size={12} className="flash-glow" />
              <span>Strikes ({currentLightningStrikes.length} Nodes)</span>
            </div>
          )}
          {isPlaying && (
            <div className="radar-badge-pill live-sim">
              <span className="anim-live-pulse-dot" />
              <span>{currentTimeline.label}</span>
            </div>
          )}
        </div>
      </div>

      {/* Map Body Area */}
      <div className="radar-map-container">
        <MapContainer
          center={[23.3441, 85.3096]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          scrollWheelZoom={true}
          ref={mapRef}
        >
          <MapController isFullscreen={isFullscreen} />

          {/* Base Layer */}
          {mapMode === "satellite" ? (
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

          {/* RainViewer radar overlay */}
          {activeRadarTile && (mapMode === "radar" || mapMode === "forecast") && (
            <TileLayer
              key={activeRadarTile}
              url={activeRadarTile}
              opacity={0.55}
              attribution="&copy; RainViewer"
              zIndex={200}
            />
          )}

          {/* 1. DOPPLER RADAR HEAT CLOUD LAYER (Realistic Continuous Blended Cloud Effect matching Screenshot) */}
          {!isThunderstormMode && !isLightningMode && layersState.dopplerClouds && (
            <>
              {districtPoints.map((district) => {
                const val = currentStepData[district.id] ?? 0;
                if (val <= 0) return null;

                const isHigh = activeTab === "rainfall" ? val >= 38 : activeTab === "temperature" ? val >= 33 : val >= 30;
                const isModerate = activeTab === "rainfall" ? val >= 18 : activeTab === "temperature" ? val >= 27 : val >= 15;

                // Scale sizes dynamically based on intensity value
                const outerRadius = isHigh ? 58 : isModerate ? 42 : 28;
                const midRadius = isHigh ? 36 : isModerate ? 24 : 14;
                const coreRadius = isHigh ? 20 : isModerate ? 12 : 6;

                return (
                  <React.Fragment key={`doppler-cloud-${district.id}-${timelineIndex}`}>
                    {/* Layer 1: Outer Doppler Cyan/Green Cloud Fringe */}
                    <CircleMarker
                      center={[district.lat, district.lon]}
                      radius={outerRadius}
                      pathOptions={{
                        className: `doppler-cloud-fringe ${isPlaying ? "doppler-blink-anim" : ""}`,
                        fillColor: "#06B6D4",
                        fillOpacity: isHigh ? 0.38 : isModerate ? 0.28 : 0.18,
                        color: "#10B981",
                        weight: 0.8,
                        opacity: 0.35,
                      }}
                    />

                    {/* Layer 2: Mid Convective Yellow/Gold Band */}
                    {isModerate && (
                      <CircleMarker
                        center={[district.lat, district.lon]}
                        radius={midRadius}
                        pathOptions={{
                          className: `doppler-cloud-mid ${isPlaying ? "doppler-blink-anim" : ""}`,
                          fillColor: "#FACC15",
                          fillOpacity: isHigh ? 0.55 : 0.42,
                          color: "#F59E0B",
                          weight: 1,
                          opacity: 0.5,
                        }}
                      />
                    )}

                    {/* Layer 3: Core Severe Crimson Red Peak */}
                    {isHigh && (
                      <CircleMarker
                        center={[district.lat, district.lon]}
                        radius={coreRadius}
                        pathOptions={{
                          className: `doppler-cloud-core ${isPlaying ? "doppler-blink-anim" : ""}`,
                          fillColor: "#EF4444",
                          fillOpacity: 0.75,
                          color: "#DC2626",
                          weight: 1.5,
                          opacity: 0.85,
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </>
          )}

          {/* 2. STANDARD WEATHER MODES: Clean District Dots */}
          {!isThunderstormMode && !isLightningMode && layersState.dotsMesh && (
            <>
              {districtPoints.map((district) => {
                const val = currentStepData[district.id] ?? 0;
                const isSelected = selectedDistrict.toLowerCase().includes(district.name.toLowerCase()) || district.isPrimary;
                const { color, level, radius } = getDotVisualForMode(activeTab, val, isSelected);
                const unit = activeTab === "rainfall" ? "mm" : activeTab === "temperature" ? "°C" : activeTab === "wind" ? "km/h" : "%";

                return (
                  <React.Fragment key={`dot-${district.id}-${timelineIndex}`}>
                    <CircleMarker
                      center={[district.lat, district.lon]}
                      radius={radius}
                      pathOptions={{
                        className: `district-dot-marker ${isPlaying ? "dot-tri-blink" : ""}`,
                        fillColor: color,
                        fillOpacity: 0.92,
                        color: "#FFFFFF",
                        weight: isSelected ? 2.5 : 1.5,
                      }}
                    >
                      <Tooltip direction="top" offset={[0, -6]} className="minimal-dot-tooltip">
                        <div className="mdot-tip">
                          <strong>{district.name}</strong>
                          <span style={{ color }}>{val} {unit}</span>
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  </React.Fragment>
                );
              })}
            </>
          )}

          {/* 3. PROMINENT RED LOCATION PIN (Matching the user reference screenshot) */}
          {!isThunderstormMode && !isLightningMode && (() => {
            const primaryDistrict = districtPoints.find(
              (d) => selectedDistrict.toLowerCase().includes(d.name.toLowerCase()) || d.isPrimary
            ) || districtPoints[0];
            const pVal = currentStepData[primaryDistrict.id] ?? 24;
            const { color: pColor, level: pLevel } = getDotVisualForMode(activeTab, pVal, true);
            const modeLabel = activeTab === "rainfall" ? "Rainfall" : activeTab === "temperature" ? "Temperature" : activeTab === "wind" ? "Wind Speed" : "Humidity";
            const unit = activeTab === "rainfall" ? "mm" : activeTab === "temperature" ? "°C" : activeTab === "wind" ? "km/h" : "%";

            const redPinDivIcon = L.divIcon({
              className: "custom-weather-red-pin",
              html: `
                <div class="user-map-pin-container">
                  <div class="user-pin-svg">
                    <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="rgba(0,0,0,0.4)"/>
                      </filter>
                      <path d="M17 0C7.61116 0 0 7.61116 0 17C0 28.5 17 44 17 44C17 44 34 28.5 34 17C34 7.61116 26.3888 0 17 0Z" fill="#EF4444" filter="url(#pinShadow)"/>
                      <circle cx="17" cy="16" r="6" fill="#FFFFFF"/>
                    </svg>
                  </div>
                  ${isPlaying ? `<div class="user-pin-pulse-wave" style="border-color: ${pColor};"></div>` : ""}
                </div>
              `,
              iconSize: [34, 44],
              iconAnchor: [17, 44],
            });

            return (
              <Marker
                key={`red-pin-${primaryDistrict.id}-${timelineIndex}`}
                position={[primaryDistrict.lat, primaryDistrict.lon]}
                icon={redPinDivIcon}
                zIndexOffset={1000}
              >
                <Tooltip
                  direction="right"
                  offset={[16, -24]}
                  permanent={true}
                  className="doppler-pin-bubble-tooltip"
                >
                  <div className="doppler-pin-card">
                    <div className="dpc-title">{primaryDistrict.name}</div>
                    <div className="dpc-metric-row">
                      <span className="dpc-lbl">{modeLabel}:</span>
                      <strong className="dpc-val" style={{ color: pColor }}>{pVal} {unit}</strong>
                    </div>
                    <div className="dpc-status-tag" style={{ background: `${pColor}18`, color: pColor, borderColor: `${pColor}40` }}>
                      {pLevel}
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            );
          })()}

          {/* 4. THUNDERSTORM MODE: Convective dBZ Storm Cells */}
          {isThunderstormMode && layersState.stormCells && (
            <>
              {currentStormCells.map((cell) => {
                const isSevere = cell.intensity === "Severe";
                const cellColor = isSevere ? "#EF4444" : cell.intensity === "Strong" ? "#F97316" : "#FBBF24";

                return (
                  <React.Fragment key={`storm-${cell.id}-${timelineIndex}`}>
                    <CircleMarker
                      center={[cell.lat, cell.lon]}
                      radius={cell.radiusKm * 1.5}
                      pathOptions={{
                        fillColor: cellColor,
                        fillOpacity: 0.22,
                        color: cellColor,
                        weight: 1.5,
                        dashArray: "3, 3",
                      }}
                    />
                    <CircleMarker
                      center={[cell.lat, cell.lon]}
                      radius={cell.radiusKm * 0.7}
                      pathOptions={{
                        fillColor: cellColor,
                        fillOpacity: 0.8,
                        color: "#FFFFFF",
                        weight: 2,
                      }}
                    >
                      <Tooltip direction="top" className="minimal-storm-tooltip">
                        <div className="mstorm-tip">
                          <span className="mstorm-badge" style={{ background: cellColor }}>{cell.intensity}</span>
                          <strong>{cell.label}</strong>
                          <span>{cell.dbz} dBZ • {cell.motion}</span>
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  </React.Fragment>
                );
              })}
            </>
          )}

          {/* 5. LIGHTNING MODE: Live Strikes (⚡) */}
          {isLightningMode && layersState.lightningFlashes && (
            <>
              {currentLightningStrikes.map((strike) => {
                const isExtreme = strike.density === "Extreme";
                const zapColor = isExtreme ? "#A855F7" : strike.density === "High" ? "#EF4444" : "#FBBF24";

                const zapDivIcon = L.divIcon({
                  className: "custom-lightning-strike-icon",
                  html: `
                    <div class="lightning-strike-node ${strike.recent ? "recent-flash" : "older-strike"}">
                      <div class="zap-svg-wrap" style="color: ${zapColor};">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                        </svg>
                      </div>
                      ${strike.recent ? `<div class="zap-electric-ring" style="border-color: ${zapColor};"></div>` : ""}
                    </div>
                  `,
                  iconSize: [22, 22],
                  iconAnchor: [11, 11],
                });

                return (
                  <Marker
                    key={`zap-${strike.id}-${timelineIndex}`}
                    position={[strike.lat, strike.lon]}
                    icon={zapDivIcon}
                  >
                    <Tooltip direction="top" className="minimal-zap-tooltip">
                      <div className="mzap-tip">
                        <span>⚡ {strike.type}</span>
                        <strong>{strike.peakKa} kA ({strike.density})</strong>
                      </div>
                    </Tooltip>
                  </Marker>
                );
              })}
            </>
          )}
        </MapContainer>

        {/* ── Sleek Vertical Intensity Legend on Right (Positioned cleanly below top nav) ── */}
        <div className="radar-vertical-legend">
          <div className="rvl-title">
            {isThunderstormMode
              ? "Doppler dBZ\nReflectivity"
              : isLightningMode
              ? "Lightning\nDensity"
              : activeTab === "temperature"
              ? "Temperature\n(°C)"
              : activeTab === "wind"
              ? "Wind Gusts\n(km/h)"
              : activeTab === "humidity"
              ? "Humidity\n(%)"
              : "Rainfall\nIntensity"}
          </div>

          <div className="rvl-scale-container">
            <div
              className={`rvl-color-bar ${isThunderstormMode ? "storm-grad" : isLightningMode ? "lightning-grad" : "standard-grad"}`}
            />
            <div className="rvl-ticks">
              {isThunderstormMode ? (
                <>
                  <span className="rvl-tick-label high">60+ Severe</span>
                  <span className="rvl-tick-label">45 Strong</span>
                  <span className="rvl-tick-label">35 Mod</span>
                  <span className="rvl-tick-label low">20 Low</span>
                </>
              ) : isLightningMode ? (
                <>
                  <span className="rvl-tick-label high">Extreme (⚡)</span>
                  <span className="rvl-tick-label">High</span>
                  <span className="rvl-tick-label">Moderate</span>
                  <span className="rvl-tick-label low">Low</span>
                </>
              ) : (
                <>
                  <span className="rvl-tick-label high">High (Red)</span>
                  <span className="rvl-tick-label med">Mod (Yellow)</span>
                  <span className="rvl-tick-label low">Low (Green)</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Zoom & Target Controls (Bottom Left) */}
        <div className="radar-zoom-controls">
          <button className="rz-btn" onClick={handleZoomIn} title="Zoom in">
            <Plus size={15} />
          </button>
          <button className="rz-btn" onClick={handleZoomOut} title="Zoom out">
            <Minus size={15} />
          </button>
          <button className="rz-btn" onClick={handleResetCenter} title="Focus Ranchi">
            <Crosshair size={15} />
          </button>
        </div>
      </div>

      {/* ── Bottom Interactive Timeline Player Bar ── */}
      <div className="radar-bottom-timeline-bar">
        {/* Play/Pause button */}
        <button
          className={`radar-play-circle-btn ${isPlaying ? "playing" : ""}`}
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? "Pause Simulation" : "Play Forecast Simulation"}
        >
          {isPlaying ? <Pause size={15} fill="white" /> : <Play size={15} fill="white" />}
        </button>

        {/* Timestamp & Interactive Timeline Slider */}
        <div className="radar-timeline-track-block">
          <div className="radar-timeline-header-meta">
            <span className="radar-timeline-timestamp">{currentTimeline.time}</span>
            <span className="radar-timeline-status-note">
              {currentTimeline.status} • Mode: <strong>{activeTab.toUpperCase()}</strong>
            </span>
          </div>

          <div className="radar-timeline-steps-track">
            {timelineSteps.map((stepState, idx) => {
              const isPassed = idx <= timelineIndex;
              const isCurrent = idx === timelineIndex;
              return (
                <div
                  key={stepState.label}
                  className={`rtrack-step-node ${isPassed ? "passed" : ""} ${isCurrent ? "current" : ""}`}
                  onClick={() => setTimelineIndex(idx)}
                >
                  <div className="rnode-circle" />
                  <span className="rnode-label">{stepState.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fullscreen Toggle */}
        <button
          className="radar-fullscreen-btn"
          onClick={() => setIsFullscreen(!isFullscreen)}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          <span>{isFullscreen ? "Exit" : "Full Screen"}</span>
        </button>
      </div>
    </div>
  );
}
