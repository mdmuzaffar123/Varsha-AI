// Comprehensive Doppler Weather Radar (DNR) Dataset for VarshaAI
// Supports multi-location switching, spatiotemporal frames, storm cells, and vertical cross-sections.

export const RADAR_LOCATIONS = [
  { id: "ranchi",   name: "Ranchi, Jharkhand",    state: "Jharkhand",   lat: 23.3441, lon: 85.3096, station: "Ranchi DWR (Birsa Munda)", rangeKm: 250 },
  { id: "raipur",   name: "Raipur, Chhattisgarh", state: "Chhattisgarh",lat: 21.2514, lon: 81.6296, station: "Raipur DWR",                 rangeKm: 250 },
  { id: "patna",    name: "Patna, Bihar",         state: "Bihar",       lat: 25.5941, lon: 85.1376, station: "Patna DWR (Jay Prakash)",    rangeKm: 250 },
  { id: "kolkata",  name: "Kolkata, West Bengal", state: "West Bengal", lat: 22.5726, lon: 88.3639, station: "Kolkata DWR (New Town)",     rangeKm: 250 },
  { id: "delhi",    name: "New Delhi, NCR",       state: "Delhi",       lat: 28.6139, lon: 77.2090, station: "Palam DWR (Delhi)",          rangeKm: 250 },
  { id: "mumbai",   name: "Mumbai, Maharashtra",  state: "Maharashtra", lat: 19.0760, lon: 72.8777, station: "Colaba DWR (Mumbai)",        rangeKm: 250 },
];

export const RADAR_TIMELINE_FRAMES = [
  { id: "f0", time: "08:30 AM", label: "08:30", isObserved: true,  desc: "Initial convective echo formation" },
  { id: "f1", time: "09:00 AM", label: "09:00", isObserved: true,  desc: "Echo intensification along ridge" },
  { id: "f2", time: "09:30 AM", label: "09:30", isObserved: true,  desc: "Multi-cell storm coalescence" },
  { id: "f3", time: "10:00 AM", label: "10:00", isObserved: true,  desc: "Peak precipitation core over Ranchi" },
  { id: "f4", time: "10:30 AM", label: "10:30", isObserved: true,  desc: "Convective cell expanding NE" },
  { id: "f5", time: "11:00 AM", label: "11:00", isObserved: true,  desc: "Severe reflectivity core active" },
  { id: "f6", time: "11:30 AM", label: "11:30", isObserved: true,  desc: "Current Live Observation (NOW)", isCurrent: true },
];

export const RADAR_MINI_PLAYBACK_STEPS = [
  { id: "m-2h", label: "-2h", time: "09:30 AM", offsetMin: -120 },
  { id: "m-1h", label: "-1h", time: "10:30 AM", offsetMin: -60 },
  { id: "m-now", label: "Now", time: "11:30 AM", offsetMin: 0, isCurrent: true },
  { id: "m+1h", label: "+1h", time: "12:30 PM", offsetMin: 60, isForecast: true },
  { id: "m+2h", label: "+2h", time: "01:30 PM", offsetMin: 120, isForecast: true },
];

export const radarDataByLocation = {
  ranchi: {
    location: {
      id: "ranchi",
      city: "Ranchi",
      state: "Jharkhand",
      label: "Ranchi, Jharkhand",
      lat: 23.3441,
      lon: 85.3096,
      elevation: "651 m",
      station: "Ranchi (DWR)",
      rangeKm: 250,
      timestamp: "22 Sep 2026, 11:30 AM",
    },
    current: {
      reflectivity: 42,
      rainfallRate: 24,
      intensity: "Moderate Intensity",
      intensityLevel: "moderate", // 'light', 'moderate', 'heavy', 'severe'
      intensityColor: "#8B5CF6", // Purple accent as seen in reference
      movementDir: "Moving East",
      movementAngle: "NE 65°",
      movementSpeed: "15 km/h",
      coverage: "~120 km radius",
      stormCellCount: 7,
      echoTop: "11.2 km",
      vil: "38 kg/m²", // Vertically Integrated Liquid
      hailProbability: "25%",
      status: "Available",
      updateInterval: "10 min",
      lastUpdate: "11:30 AM",
      dataType: "Reflectivity (dBZ)",
      mode: "Demo Data",
    },
    // Spatiotemporal radar cluster frames for map visualization
    frames: [
      // Frame 0 (08:30)
      {
        frameId: "f0",
        clusters: [
          { id: "c1", lat: 23.25, lon: 85.18, radius: 28, dbz: 32, label: "Cell A01" },
          { id: "c2", lat: 23.60, lon: 85.45, radius: 20, dbz: 26, label: "Cell A02" },
        ],
      },
      // Frame 1 (09:00)
      {
        frameId: "f1",
        clusters: [
          { id: "c1", lat: 23.28, lon: 85.22, radius: 34, dbz: 36, label: "Cell A01" },
          { id: "c2", lat: 23.65, lon: 85.52, radius: 24, dbz: 30, label: "Cell A02" },
          { id: "c3", lat: 23.82, lon: 85.90, radius: 18, dbz: 28, label: "Cell A03" },
        ],
      },
      // Frame 2 (09:30)
      {
        frameId: "f2",
        clusters: [
          { id: "c1", lat: 23.31, lon: 85.26, radius: 42, dbz: 40, label: "Cell A01" },
          { id: "c2", lat: 23.70, lon: 85.60, radius: 30, dbz: 35, label: "Cell A02" },
          { id: "c3", lat: 23.88, lon: 86.05, radius: 26, dbz: 34, label: "Cell A03" },
        ],
      },
      // Frame 3 (10:00)
      {
        frameId: "f3",
        clusters: [
          { id: "c1", lat: 23.33, lon: 85.29, radius: 52, dbz: 46, label: "Cell A01" },
          { id: "c2", lat: 23.75, lon: 85.68, radius: 36, dbz: 42, label: "Cell A02" },
          { id: "c3", lat: 23.95, lon: 86.18, radius: 32, dbz: 40, label: "Cell A03" },
        ],
      },
      // Frame 4 (10:30)
      {
        frameId: "f4",
        clusters: [
          { id: "c1", lat: 23.34, lon: 85.31, radius: 58, dbz: 48, label: "Cell A01" },
          { id: "c2", lat: 23.78, lon: 85.74, radius: 42, dbz: 45, label: "Cell A02" },
          { id: "c3", lat: 24.02, lon: 86.28, radius: 36, dbz: 44, label: "Cell A03" },
          { id: "c4", lat: 23.05, lon: 85.15, radius: 24, dbz: 32, label: "Cell A04" },
        ],
      },
      // Frame 5 (11:00)
      {
        frameId: "f5",
        clusters: [
          { id: "c1", lat: 23.35, lon: 85.33, radius: 62, dbz: 52, label: "Cell A01" },
          { id: "c2", lat: 23.82, lon: 85.80, radius: 46, dbz: 47, label: "Cell A02" },
          { id: "c3", lat: 24.08, lon: 86.35, radius: 38, dbz: 48, label: "Cell A03" },
          { id: "c4", lat: 23.10, lon: 85.20, radius: 28, dbz: 36, label: "Cell A04" },
        ],
      },
      // Frame 6 (11:30 - Current Snapshot matching reference)
      {
        frameId: "f6",
        clusters: [
          { id: "c1", lat: 23.3441, lon: 85.3096, radius: 68, dbz: 55, label: "Cell A01 (Ranchi)", severe: true, vector: "↗ NE 15 km/h" },
          { id: "c2", lat: 23.6300, lon: 85.5100, radius: 48, dbz: 44, label: "Cell A02 (Ramgarh)", vector: "↗ NE 18 km/h" },
          { id: "c3", lat: 23.6693, lon: 86.1511, radius: 52, dbz: 49, label: "Cell A03 (Bokaro)", vector: "→ E 16 km/h" },
          { id: "c4", lat: 23.7957, lon: 86.4304, radius: 40, dbz: 42, label: "Cell A04 (Dhanbad)", vector: "→ E 14 km/h" },
          { id: "c5", lat: 23.9925, lon: 85.3637, radius: 36, dbz: 38, label: "Cell A05 (Hazaribagh)", vector: "↗ NE 12 km/h" },
          { id: "c6", lat: 23.0740, lon: 85.2780, radius: 32, dbz: 35, label: "Cell A06 (Khunti)", vector: "↗ NE 14 km/h" },
          { id: "c7", lat: 23.4350, lon: 84.6810, radius: 30, dbz: 32, label: "Cell A07 (Lohardaga)", vector: "→ E 10 km/h" },
        ],
      },
    ],
    // Surrounding key reference nodes with range from radar
    surroundingDistricts: [
      { name: "Ranchi",       lat: 23.3441, lon: 85.3096, isPrimary: true, distanceKm: 0 },
      { name: "Hazaribagh",   lat: 23.9925, lon: 85.3637, distanceKm: 72 },
      { name: "Dhanbad",      lat: 23.7957, lon: 86.4304, distanceKm: 125 },
      { name: "Bokaro",       lat: 23.6693, lon: 86.1511, distanceKm: 92 },
      { name: "Giridih",      lat: 24.1856, lon: 86.3097, distanceKm: 138 },
      { name: "Chatra",       lat: 24.2120, lon: 84.8720, distanceKm: 106 },
      { name: "Latehar",      lat: 23.7430, lon: 84.4980, distanceKm: 94 },
      { name: "Khunti",       lat: 23.0740, lon: 85.2780, distanceKm: 32 },
      { name: "Gumla",        lat: 23.0440, lon: 84.5420, distanceKm: 88 },
      { name: "Simdega",      lat: 22.6140, lon: 84.5090, distanceKm: 122 },
      { name: "West Bengal",  lat: 23.3322, lon: 86.8652, isStateBorder: true },
      { name: "Odisha",       lat: 22.2604, lon: 85.1536, isStateBorder: true },
    ],
    // Detected Storm Cells table
    stormCells: [
      { id: "A01", label: "Cell A01 (Ranchi Core)", intensity: "55 dBZ", intensityLevel: "Severe",   movement: "NE", speed: "15 km/h", distance: "0 km",   status: "Mature Supercell",  radiusKm: 16, hailProb: "45%" },
      { id: "A02", label: "Cell A02 (Ramgarh Gap)", intensity: "44 dBZ", intensityLevel: "Strong",   movement: "NE", speed: "18 km/h", distance: "38 km",  status: "Developing",        radiusKm: 12, hailProb: "15%" },
      { id: "A03", label: "Cell A03 (Bokaro Sector)",intensity: "49 dBZ", intensityLevel: "Severe",  movement: "E",  speed: "16 km/h", distance: "92 km",  status: "Intensifying",      radiusKm: 14, hailProb: "30%" },
      { id: "A04", label: "Cell A04 (Dhanbad Front)", intensity: "42 dBZ", intensityLevel: "Moderate",movement: "E",  speed: "14 km/h", distance: "125 km", status: "Active Multi-cell", radiusKm: 10, hailProb: "5%" },
      { id: "A05", label: "Cell A05 (Hazaribagh N)", intensity: "38 dBZ", intensityLevel: "Moderate",movement: "NE", speed: "12 km/h", distance: "72 km",  status: "Stratiform",       radiusKm: 9,  hailProb: "0%" },
      { id: "A06", label: "Cell A06 (Khunti Ridge)",  intensity: "35 dBZ", intensityLevel: "Moderate",movement: "NE", speed: "14 km/h", distance: "32 km",  status: "Dissipating",       radiusKm: 8,  hailProb: "0%" },
      { id: "A07", label: "Cell A07 (Lohardaga W)",  intensity: "32 dBZ", intensityLevel: "Light",   movement: "E",  speed: "10 km/h", distance: "94 km",  status: "Scattered Showers", radiusKm: 7,  hailProb: "0%" },
    ],
    // AI Insights (4 Colored Alerts matching reference)
    aiInsights: [
      {
        id: "ai-1",
        type: "rain",
        colorScheme: "blue",
        icon: "CloudRain",
        title: "Rainfall Observation",
        text: "Moderate to heavy rainfall detected over Ranchi and surrounding areas.",
        badge: "Active Echo",
        confidence: "94%",
        explanation: "Doppler radar reflectivity values exceeding 45 dBZ indicate convective rain rates between 20-35 mm/hr over urban Ranchi.",
      },
      {
        id: "ai-2",
        type: "trend",
        colorScheme: "cyan",
        icon: "TrendingUp",
        title: "Nowcast Trajectory",
        text: "Rainfall intensity likely to increase in next 1-3 hours towards eastern districts.",
        badge: "Vector Forecast",
        confidence: "89%",
        explanation: "Mean storm cell vector is moving East-Northeast at 15-18 km/h, shifting the main precipitation core toward Ramgarh and Bokaro.",
      },
      {
        id: "ai-3",
        type: "risk",
        colorScheme: "green",
        icon: "MapPin",
        title: "Inundation Alert",
        text: "High probability of localized water logging in low-lying areas.",
        badge: "Urban Hazard",
        confidence: "91%",
        explanation: "Sustained precipitation over saturated soil profiles may lead to localized ponding along Ranchi-Kanke drainage corridors.",
      },
      {
        id: "ai-4",
        type: "safety",
        colorScheme: "emerald",
        icon: "ShieldCheck",
        title: "Synoptic Stability",
        text: "No cyclonic activity detected in the region currently.",
        badge: "No Cyclonic Risk",
        confidence: "98%",
        explanation: "Convection is driven by local thermodynamic moisture convergence rather than organized tropical cyclonic circulations.",
      },
    ],
    // Vertical Cross-Section Data (Height 0-15 km vs Distance 0-120 km)
    crossSection: {
      title: "Vertical Cross-Section (Height vs Reflectivity)",
      maxHeightKm: 15,
      maxDistanceKm: 120,
      corePeakAlt: 8.5, // Core extends up to 8.5 km
      peakDbz: 55,
      sliceBearing: "SW to NE (225° - 45°)",
    },
    // Distance Profile (km vs dBZ)
    reflectivityProfile: [
      { distance: 0,   dbz: 18, rainRate: 2 },
      { distance: 15,  dbz: 28, rainRate: 6 },
      { distance: 30,  dbz: 36, rainRate: 14 },
      { distance: 45,  dbz: 48, rainRate: 28 },
      { distance: 60,  dbz: 55, rainRate: 42 },
      { distance: 75,  dbz: 44, rainRate: 22 },
      { distance: 90,  dbz: 34, rainRate: 10 },
      { distance: 105, dbz: 22, rainRate: 3 },
      { distance: 120, dbz: 14, rainRate: 1 },
    ],
    // Technical Station Specs
    stationSpecs: {
      stationName: "Ranchi (DWR)",
      radarType: "S-Band Doppler Weather Radar (METEK/IMD)",
      frequency: "2.8 GHz",
      peakPower: "750 kW",
      beamWidth: "1.0°",
      range: "250 km",
      updateFrequency: "10 minutes",
      elevationAngles: "0.5°, 1.5°, 3.0°, 4.5°, 6.0°, 9.0°, 12.0°, 15.0°",
      dataSource: "IMD DWR + AI Processing",
      status: "Demo / Frontend",
    },
  },

  // Other regional locations
  raipur: {
    location: {
      id: "raipur",
      city: "Raipur",
      state: "Chhattisgarh",
      label: "Raipur, Chhattisgarh",
      lat: 21.2514,
      lon: 81.6296,
      elevation: "298 m",
      station: "Raipur (DWR)",
      rangeKm: 250,
      timestamp: "22 Sep 2026, 11:30 AM",
    },
    current: {
      reflectivity: 36,
      rainfallRate: 14,
      intensity: "Moderate Intensity",
      intensityLevel: "moderate",
      intensityColor: "#8B5CF6",
      movementDir: "Moving North",
      movementAngle: "N 10°",
      movementSpeed: "12 km/h",
      coverage: "~110 km radius",
      stormCellCount: 4,
      echoTop: "9.8 km",
      vil: "24 kg/m²",
      hailProbability: "10%",
      status: "Available",
      updateInterval: "10 min",
      lastUpdate: "11:30 AM",
      dataType: "Reflectivity (dBZ)",
      mode: "Demo Data",
    },
    frames: [
      { frameId: "f0", clusters: [{ id: "c1", lat: 21.20, lon: 81.60, radius: 24, dbz: 25 }] },
      { frameId: "f6", clusters: [{ id: "c1", lat: 21.25, lon: 81.63, radius: 45, dbz: 42, label: "Cell R01" }, { id: "c2", lat: 21.50, lon: 81.80, radius: 32, dbz: 36 }] },
    ],
    surroundingDistricts: [
      { name: "Raipur", lat: 21.2514, lon: 81.6296, isPrimary: true, distanceKm: 0 },
      { name: "Durg",   lat: 21.1904, lon: 81.2849, distanceKm: 38 },
      { name: "Bilaspur",lat: 22.0797, lon: 82.1409, distanceKm: 110 },
    ],
    stormCells: [
      { id: "R01", label: "Cell R01 (Raipur Center)", intensity: "42 dBZ", intensityLevel: "Moderate", movement: "N", speed: "12 km/h", distance: "0 km", status: "Active", radiusKm: 12, hailProb: "10%" },
    ],
    aiInsights: [
      { id: "ai-1", type: "rain", colorScheme: "blue", icon: "CloudRain", title: "Rainfall Observation", text: "Scattered moderate showers observed across Raipur basin.", badge: "Active Echo", confidence: "90%", explanation: "Echo tops reaching 9.8 km with moderate reflectivity." },
      { id: "ai-2", type: "trend", colorScheme: "cyan", icon: "TrendingUp", title: "Nowcast Trajectory", text: "Cells moving northward toward Bilaspur corridor.", badge: "Vector Forecast", confidence: "87%", explanation: "Northerly steering flow active." },
      { id: "ai-3", type: "risk", colorScheme: "green", icon: "MapPin", title: "Inundation Alert", text: "Low risk of localized water logging in low areas.", badge: "Minor Risk", confidence: "92%", explanation: "Soil capacity within safe margins." },
      { id: "ai-4", type: "safety", colorScheme: "emerald", icon: "ShieldCheck", title: "Synoptic Stability", text: "No cyclonic disturbance in Chhattisgarh region.", badge: "Stable", confidence: "99%", explanation: "Standard monsoon moisture pulse." },
    ],
    crossSection: { title: "Vertical Cross-Section (Height vs Reflectivity)", maxHeightKm: 15, maxDistanceKm: 120, corePeakAlt: 7.2, peakDbz: 42, sliceBearing: "S to N" },
    reflectivityProfile: [{ distance: 0, dbz: 14 }, { distance: 30, dbz: 32 }, { distance: 60, dbz: 42 }, { distance: 90, dbz: 26 }, { distance: 120, dbz: 10 }],
    stationSpecs: { stationName: "Raipur (DWR)", radarType: "C-Band Doppler Weather Radar", frequency: "5.6 GHz", peakPower: "500 kW", beamWidth: "1.0°", range: "250 km", updateFrequency: "10 minutes", dataSource: "IMD DWR + AI Processing", status: "Demo / Frontend" },
  },

  patna: {
    location: {
      id: "patna",
      city: "Patna",
      state: "Bihar",
      label: "Patna, Bihar",
      lat: 25.5941,
      lon: 85.1376,
      elevation: "53 m",
      station: "Patna (DWR)",
      rangeKm: 250,
      timestamp: "22 Sep 2026, 11:30 AM",
    },
    current: {
      reflectivity: 28,
      rainfallRate: 8,
      intensity: "Light to Moderate",
      intensityLevel: "light",
      intensityColor: "#10B981",
      movementDir: "Moving East",
      movementAngle: "E 90°",
      movementSpeed: "18 km/h",
      coverage: "~140 km radius",
      stormCellCount: 3,
      echoTop: "7.5 km",
      vil: "16 kg/m²",
      hailProbability: "0%",
      status: "Available",
      updateInterval: "10 min",
      lastUpdate: "11:30 AM",
      dataType: "Reflectivity (dBZ)",
      mode: "Demo Data",
    },
    frames: [
      { frameId: "f0", clusters: [{ id: "c1", lat: 25.55, lon: 85.05, radius: 20, dbz: 20 }] },
      { frameId: "f6", clusters: [{ id: "c1", lat: 25.60, lon: 85.15, radius: 35, dbz: 32, label: "Cell P01" }] },
    ],
    surroundingDistricts: [
      { name: "Patna", lat: 25.5941, lon: 85.1376, isPrimary: true, distanceKm: 0 },
      { name: "Gaya",  lat: 24.7955, lon: 85.0002, distanceKm: 98 },
      { name: "Muzaffarpur", lat: 26.1209, lon: 85.3647, distanceKm: 68 },
    ],
    stormCells: [
      { id: "P01", label: "Cell P01 (Ganga Basin)", intensity: "32 dBZ", intensityLevel: "Light", movement: "E", speed: "18 km/h", distance: "0 km", status: "Scattered", radiusKm: 8, hailProb: "0%" },
    ],
    aiInsights: [
      { id: "ai-1", type: "rain", colorScheme: "blue", icon: "CloudRain", title: "Rainfall Observation", text: "Light to moderate stratiform showers along Ganga river valley.", badge: "Stratiform", confidence: "93%", explanation: "Echo tops around 7.5 km." },
      { id: "ai-2", type: "trend", colorScheme: "cyan", icon: "TrendingUp", title: "Nowcast Trajectory", text: "Showers propagating eastward into Begusarai.", badge: "Vector Forecast", confidence: "91%", explanation: "Uniform zonal drift." },
      { id: "ai-3", type: "risk", colorScheme: "green", icon: "MapPin", title: "Inundation Alert", text: "No significant urban water logging expected.", badge: "Normal", confidence: "96%", explanation: "Precipitation within drainage thresholds." },
      { id: "ai-4", type: "safety", colorScheme: "emerald", icon: "ShieldCheck", title: "Synoptic Stability", text: "Clear of organized severe convective systems.", badge: "Safe", confidence: "99%", explanation: "Stable mid-tropospheric lapse rates." },
    ],
    crossSection: { title: "Vertical Cross-Section (Height vs Reflectivity)", maxHeightKm: 15, maxDistanceKm: 120, corePeakAlt: 5.5, peakDbz: 32, sliceBearing: "W to E" },
    reflectivityProfile: [{ distance: 0, dbz: 10 }, { distance: 30, dbz: 24 }, { distance: 60, dbz: 32 }, { distance: 90, dbz: 18 }, { distance: 120, dbz: 8 }],
    stationSpecs: { stationName: "Patna (DWR)", radarType: "S-Band Doppler Weather Radar", frequency: "2.8 GHz", peakPower: "750 kW", beamWidth: "1.0°", range: "250 km", updateFrequency: "10 minutes", dataSource: "IMD DWR + AI Processing", status: "Demo / Frontend" },
  },

  kolkata: {
    location: {
      id: "kolkata",
      city: "Kolkata",
      state: "West Bengal",
      label: "Kolkata, West Bengal",
      lat: 22.5726,
      lon: 88.3639,
      elevation: "9 m",
      station: "Kolkata (DWR)",
      rangeKm: 250,
      timestamp: "22 Sep 2026, 11:30 AM",
    },
    current: {
      reflectivity: 48,
      rainfallRate: 32,
      intensity: "Heavy Rain / Squall",
      intensityLevel: "heavy",
      intensityColor: "#EF4444",
      movementDir: "Moving NW",
      movementAngle: "NW 315°",
      movementSpeed: "22 km/h",
      coverage: "~160 km radius",
      stormCellCount: 8,
      echoTop: "13.5 km",
      vil: "48 kg/m²",
      hailProbability: "40%",
      status: "Available",
      updateInterval: "10 min",
      lastUpdate: "11:30 AM",
      dataType: "Reflectivity (dBZ)",
      mode: "Demo Data",
    },
    frames: [
      { frameId: "f0", clusters: [{ id: "c1", lat: 22.40, lon: 88.25, radius: 30, dbz: 35 }] },
      { frameId: "f6", clusters: [{ id: "c1", lat: 22.58, lon: 88.38, radius: 65, dbz: 52, label: "Cell K01 (Hooghly Core)" }, { id: "c2", lat: 22.75, lon: 88.50, radius: 45, dbz: 46 }] },
    ],
    surroundingDistricts: [
      { name: "Kolkata",  lat: 22.5726, lon: 88.3639, isPrimary: true, distanceKm: 0 },
      { name: "Howrah",   lat: 22.5958, lon: 88.2636, distanceKm: 12 },
      { name: "Hooghly",  lat: 22.9011, lon: 88.3968, distanceKm: 38 },
      { name: "North 24P",lat: 22.7210, lon: 88.4847, distanceKm: 24 },
    ],
    stormCells: [
      { id: "K01", label: "Cell K01 (Kolkata Metro)", intensity: "52 dBZ", intensityLevel: "Severe", movement: "NW", speed: "22 km/h", distance: "0 km", status: "Severe Convection", radiusKm: 18, hailProb: "40%" },
    ],
    aiInsights: [
      { id: "ai-1", type: "rain", colorScheme: "blue", icon: "CloudRain", title: "Rainfall Observation", text: "High-intensity coastal thunderstorm squall active over Kolkata.", badge: "Severe Core", confidence: "96%", explanation: "Reflectivity exceeding 50 dBZ with intense cloud-to-ground lightning." },
      { id: "ai-2", type: "trend", colorScheme: "cyan", icon: "TrendingUp", title: "Nowcast Trajectory", text: "Squall front tracking northwest toward Bardhaman district.", badge: "Vector Forecast", confidence: "92%", explanation: "Strong coastal inflow feeding the convective tower." },
      { id: "ai-3", type: "risk", colorScheme: "green", icon: "MapPin", title: "Inundation Alert", text: "Significant urban water logging alert for low-lying metro areas.", badge: "High Risk", confidence: "94%", explanation: "Peak rain rates of 35-50 mm/hr will test stormwater systems." },
      { id: "ai-4", type: "safety", colorScheme: "emerald", icon: "ShieldCheck", title: "Synoptic Stability", text: "Bay of Bengal low-pressure peripheral moisture convergence.", badge: "Monsoon Surge", confidence: "95%", explanation: "Vigorous monsoon trough aligned near coastal delta." },
    ],
    crossSection: { title: "Vertical Cross-Section (Height vs Reflectivity)", maxHeightKm: 15, maxDistanceKm: 120, corePeakAlt: 11.2, peakDbz: 52, sliceBearing: "SE to NW" },
    reflectivityProfile: [{ distance: 0, dbz: 22 }, { distance: 30, dbz: 44 }, { distance: 60, dbz: 52 }, { distance: 90, dbz: 38 }, { distance: 120, dbz: 20 }],
    stationSpecs: { stationName: "Kolkata (DWR)", radarType: "S-Band Doppler Weather Radar", frequency: "2.8 GHz", peakPower: "750 kW", beamWidth: "1.0°", range: "250 km", updateFrequency: "10 minutes", dataSource: "IMD DWR + AI Processing", status: "Demo / Frontend" },
  },

  delhi: {
    location: { id: "delhi", city: "Delhi", state: "Delhi", label: "New Delhi, NCR", lat: 28.6139, lon: 77.2090, elevation: "216 m", station: "Palam (DWR)", rangeKm: 250, timestamp: "22 Sep 2026, 11:30 AM" },
    current: { reflectivity: 22, rainfallRate: 4, intensity: "Clear / Fair", intensityLevel: "light", intensityColor: "#10B981", movementDir: "Moving East", movementAngle: "E 90°", movementSpeed: "8 km/h", coverage: "~100 km radius", stormCellCount: 1, echoTop: "4.2 km", vil: "8 kg/m²", hailProbability: "0%", status: "Available", updateInterval: "10 min", lastUpdate: "11:30 AM", dataType: "Reflectivity (dBZ)", mode: "Demo Data" },
    frames: [{ frameId: "f6", clusters: [{ id: "c1", lat: 28.65, lon: 77.30, radius: 22, dbz: 24, label: "Cell D01" }] }],
    surroundingDistricts: [{ name: "Delhi", lat: 28.6139, lon: 77.2090, isPrimary: true, distanceKm: 0 }, { name: "Noida", lat: 28.5355, lon: 77.3910, distanceKm: 22 }, { name: "Gurugram", lat: 28.4595, lon: 77.0266, distanceKm: 28 }],
    stormCells: [{ id: "D01", label: "Cell D01 (NCR East)", intensity: "24 dBZ", intensityLevel: "Light", movement: "E", speed: "8 km/h", distance: "22 km", status: "Isolated Light", radiusKm: 6, hailProb: "0%" }],
    aiInsights: [
      { id: "ai-1", type: "rain", colorScheme: "blue", icon: "CloudRain", title: "Rainfall Observation", text: "Mainly dry conditions with isolated light echoes over NCR.", badge: "Clear/Light", confidence: "97%", explanation: "Weak reflectivity below convective threshold." },
      { id: "ai-2", type: "trend", colorScheme: "cyan", icon: "TrendingUp", title: "Nowcast Trajectory", text: "No significant storm development expected in next 3 hours.", badge: "Stable", confidence: "95%", explanation: "Dry continental air intrusion." },
      { id: "ai-3", type: "risk", colorScheme: "green", icon: "MapPin", title: "Inundation Alert", text: "Zero water logging hazard currently.", badge: "Safe", confidence: "99%", explanation: "Dry road network." },
      { id: "ai-4", type: "safety", colorScheme: "emerald", icon: "ShieldCheck", title: "Synoptic Stability", text: "Stable atmospheric boundary layer.", badge: "Clear", confidence: "99%", explanation: "High barometric stability." },
    ],
    crossSection: { title: "Vertical Cross-Section (Height vs Reflectivity)", maxHeightKm: 15, maxDistanceKm: 120, corePeakAlt: 3.8, peakDbz: 24, sliceBearing: "W to E" },
    reflectivityProfile: [{ distance: 0, dbz: 8 }, { distance: 30, dbz: 14 }, { distance: 60, dbz: 24 }, { distance: 90, dbz: 12 }, { distance: 120, dbz: 6 }],
    stationSpecs: { stationName: "Palam DWR (Delhi)", radarType: "C-Band Doppler Weather Radar", frequency: "5.6 GHz", peakPower: "500 kW", beamWidth: "1.0°", range: "250 km", updateFrequency: "10 minutes", dataSource: "IMD DWR + AI Processing", status: "Demo / Frontend" },
  },

  mumbai: {
    location: { id: "mumbai", city: "Mumbai", state: "Maharashtra", label: "Mumbai, Maharashtra", lat: 19.0760, lon: 72.8777, elevation: "14 m", station: "Colaba (DWR)", rangeKm: 250, timestamp: "22 Sep 2026, 11:30 AM" },
    current: { reflectivity: 44, rainfallRate: 26, intensity: "Moderate to Heavy Rain", intensityLevel: "moderate", intensityColor: "#F59E0B", movementDir: "Moving East", movementAngle: "E 85°", movementSpeed: "20 km/h", coverage: "~150 km radius", stormCellCount: 6, echoTop: "10.8 km", vil: "34 kg/m²", hailProbability: "15%", status: "Available", updateInterval: "10 min", lastUpdate: "11:30 AM", dataType: "Reflectivity (dBZ)", mode: "Demo Data" },
    frames: [{ frameId: "f6", clusters: [{ id: "c1", lat: 19.08, lon: 72.88, radius: 55, dbz: 46, label: "Cell M01 (Coastal Front)" }] }],
    surroundingDistricts: [{ name: "Mumbai", lat: 19.0760, lon: 72.8777, isPrimary: true, distanceKm: 0 }, { name: "Thane", lat: 19.2183, lon: 72.9781, distanceKm: 24 }, { name: "Navi Mumbai", lat: 19.0330, lon: 73.0297, distanceKm: 18 }],
    stormCells: [{ id: "M01", label: "Cell M01 (Mumbai Coast)", intensity: "46 dBZ", intensityLevel: "Strong", movement: "E", speed: "20 km/h", distance: "0 km", status: "Active Offshore Band", radiusKm: 15, hailProb: "15%" }],
    aiInsights: [
      { id: "ai-1", type: "rain", colorScheme: "blue", icon: "CloudRain", title: "Rainfall Observation", text: "Active monsoon squall bands approaching Mumbai coastline.", badge: "Coastal Band", confidence: "94%", explanation: "Reflectivity up to 46 dBZ pushing onshore." },
      { id: "ai-2", type: "trend", colorScheme: "cyan", icon: "TrendingUp", title: "Nowcast Trajectory", text: "Rain bands penetrating inland towards Thane and Navi Mumbai.", badge: "Vector Forecast", confidence: "91%", explanation: "Strong westerly Arabian Sea monsoon winds." },
      { id: "ai-3", type: "risk", colorScheme: "green", icon: "MapPin", title: "Inundation Alert", text: "Moderate water logging risk during upcoming high tide.", badge: "Tidal Risk", confidence: "93%", explanation: "Combined rain and coastal surge." },
      { id: "ai-4", type: "safety", colorScheme: "emerald", icon: "ShieldCheck", title: "Synoptic Stability", text: "Offshore trough active along Konkan coast.", badge: "Monsoon Trough", confidence: "97%", explanation: "Standard monsoon surge structure." },
    ],
    crossSection: { title: "Vertical Cross-Section (Height vs Reflectivity)", maxHeightKm: 15, maxDistanceKm: 120, corePeakAlt: 8.8, peakDbz: 46, sliceBearing: "W to E" },
    reflectivityProfile: [{ distance: 0, dbz: 28 }, { distance: 30, dbz: 46 }, { distance: 60, dbz: 38 }, { distance: 90, dbz: 24 }, { distance: 120, dbz: 14 }],
    stationSpecs: { stationName: "Colaba DWR (Mumbai)", radarType: "S-Band Doppler Weather Radar", frequency: "2.8 GHz", peakPower: "750 kW", beamWidth: "1.0°", range: "250 km", updateFrequency: "10 minutes", dataSource: "IMD DWR + AI Processing", status: "Demo / Frontend" },
  },
};

// AI Workflow Pipeline preview data
export const RADAR_AI_PIPELINE_STEPS = [
  { step: 1, name: "DNR Radar", desc: "S/C-Band raw polar volume reflectivity scan", icon: "Radio" },
  { step: 2, name: "Radar Preprocessing", desc: "Clutter filter, velocity dealiasing, calibration", icon: "Sliders" },
  { step: 3, name: "Spatio-Temporal Data", desc: "Multi-timestep 4D Cartesian gridded tensor", icon: "Layers" },
  { step: 4, name: "EarthFormer / ConvNeXt-3D", desc: "Deep spatio-temporal neural nowcasting model", icon: "Cpu" },
  { step: 5, name: "Rainfall Prediction", desc: "High-resolution 0–3 hour precipitation field", icon: "CloudRain" },
  { step: 6, name: "AI Agent", desc: "LLM contextual meteorological reasoning engine", icon: "Sparkles" },
  { step: 7, name: "Actionable Insight", desc: "District flood & storm advisory alerts", icon: "ShieldAlert" },
];
