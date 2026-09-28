// ============================================================
// VarshaAI — Comprehensive Forecast Data (Dynamic & Backend Ready)
// ============================================================

export const weatherTabs = [
  { id: "rainfall",      label: "Rainfall",     icon: "cloud-rain"  },
  { id: "temperature",   label: "Temperature",  icon: "thermometer" },
  { id: "wind",          label: "Wind Speed",   icon: "wind"        },
  { id: "humidity",      label: "Humidity",     icon: "droplets"    },
  { id: "cloudCover",    label: "Cloud Cover",  icon: "cloud"       },
  { id: "thunderstorm",  label: "Thunderstorm", icon: "zap"         },
  { id: "lightning",     label: "Lightning",    icon: "zap"         },
];

export const forecastData = {
  thunderstorm: {
    stormCells: [
      { id: 1, x: 52, y: 38, intensity: "severe",   size: 18, label: "Cell A" },
      { id: 2, x: 44, y: 46, intensity: "strong",   size: 14, label: "Cell B" },
      { id: 3, x: 58, y: 52, intensity: "moderate", size: 12, label: "Cell C" },
      { id: 4, x: 48, y: 55, intensity: "moderate", size: 10, label: "Cell D" },
      { id: 5, x: 62, y: 40, intensity: "weak",     size: 8,  label: "Cell E" },
      { id: 6, x: 38, y: 60, intensity: "weak",     size: 7,  label: "Cell F" },
      { id: 7, x: 56, y: 62, intensity: "developing",size: 9, label: "Cell G" },
    ],
  },
  lightning: {
    strikes: [
      { id: 1, x: 50, y: 42, recent: true,  intensity: "high"     },
      { id: 2, x: 55, y: 36, recent: true,  intensity: "high"     },
      { id: 3, x: 46, y: 48, recent: true,  intensity: "moderate" },
      { id: 4, x: 60, y: 44, recent: false, intensity: "low"      },
      { id: 5, x: 43, y: 54, recent: false, intensity: "moderate" },
      { id: 6, x: 58, y: 58, recent: false, intensity: "low"      },
      { id: 7, x: 52, y: 62, recent: true,  intensity: "high"     },
      { id: 8, x: 65, y: 38, recent: false, intensity: "low"      },
    ],
  },
};

export const timeFilterButtons = [
  { id: "now",      label: "Now" },
  { id: "3h",       label: "Next 3 Hours" },
  { id: "24h",      label: "Next 24 Hours" },
  { id: "7d",       label: "Next 7 Days" },
];

export const statesList = [
  { id: "jharkhand",     name: "Jharkhand" },
  { id: "bihar",         name: "Bihar" },
  { id: "west_bengal",   name: "West Bengal" },
  { id: "odisha",        name: "Odisha" },
  { id: "chhattisgarh",  name: "Chhattisgarh" },
  { id: "uttar_pradesh", name: "Uttar Pradesh" },
];

export const districtsList = [
  { id: "ranchi",      name: "Ranchi",      lat: 23.3441, lon: 85.3096 },
  { id: "hazaribagh",  name: "Hazaribagh",  lat: 23.9925, lon: 85.3637 },
  { id: "dhanbad",     name: "Dhanbad",     lat: 23.7957, lon: 86.4304 },
  { id: "jamshedpur",  name: "Jamshedpur",  lat: 22.8046, lon: 86.2029 },
  { id: "deoghar",     name: "Deoghar",     lat: 24.4826, lon: 86.7000 },
  { id: "bokaro",      name: "Bokaro",      lat: 23.6693, lon: 86.1511 },
  { id: "giridih",     name: "Giridih",     lat: 24.1856, lon: 86.3097 },
];

// Top 6 metric cards
export const topMetricCardsData = [
  {
    id: "rainfall",
    icon: "cloud-rain",
    value: "24 mm",
    label: "Moderate Rain",
    statusBadge: "Normal for this time",
    statusBadgeColor: "#16B86A",
    sparklineColor: "#1677FF",
    sparklinePoints: [10, 15, 12, 24, 28, 20, 24],
  },
  {
    id: "temperature",
    icon: "thermometer",
    value: "28°C",
    label: "Temperature",
    sparklineColor: "#1677FF",
    sparklinePoints: [22, 24, 26, 28, 30, 29, 28],
  },
  {
    id: "humidity",
    icon: "droplets",
    value: "78%",
    label: "Humidity",
    sparklineColor: "#20C7D9",
    sparklinePoints: [65, 70, 72, 78, 82, 80, 78],
  },
  {
    id: "wind",
    icon: "wind",
    value: "12 km/h",
    label: "Wind Speed",
    sparklineColor: "#8B5CF6",
    sparklinePoints: [8, 10, 14, 12, 16, 14, 12],
  },
  {
    id: "cloud",
    icon: "cloud",
    value: "85%",
    label: "Cloud Cover",
    sparklineColor: "#64748B",
    sparklinePoints: [60, 68, 75, 85, 90, 88, 85],
  },
  {
    id: "pressure",
    icon: "gauge",
    value: "1008 hPa",
    label: "Pressure",
    sparklineColor: "#F59E0B",
    sparklinePoints: [1012, 1010, 1009, 1008, 1007, 1008, 1008],
  },
];

// Hourly forecast (24 hours) for bar chart
export const hourly24HoursData = [
  { hour: "12 AM", value: 3,  time: "12:00 AM" },
  { hour: "1 AM",  value: 4,  time: "01:00 AM" },
  { hour: "2 AM",  value: 6,  time: "02:00 AM" },
  { hour: "3 AM",  value: 8,  time: "03:00 AM" },
  { hour: "4 AM",  value: 11, time: "04:00 AM" },
  { hour: "5 AM",  value: 13, time: "05:00 AM" },
  { hour: "6 AM",  value: 16, time: "06:00 AM" },
  { hour: "7 AM",  value: 20, time: "07:00 AM" },
  { hour: "8 AM",  value: 24, time: "08:00 AM" },
  { hour: "9 AM",  value: 26, time: "09:00 AM" },
  { hour: "10 AM", value: 28, time: "10:00 AM" },
  { hour: "11 AM", value: 30, time: "11:00 AM" },
  { hour: "12 PM", value: 32, time: "12:00 PM", isPeak: true }, // Peak highlighted in reference image
  { hour: "1 PM",  value: 29, time: "01:00 PM" },
  { hour: "2 PM",  value: 25, time: "02:00 PM" },
  { hour: "3 PM",  value: 22, time: "03:00 PM" },
  { hour: "4 PM",  value: 20, time: "04:00 PM" },
  { hour: "5 PM",  value: 17, time: "05:00 PM" },
  { hour: "6 PM",  value: 15, time: "06:00 PM" },
  { hour: "7 PM",  value: 12, time: "07:00 PM" },
  { hour: "8 PM",  value: 10, time: "08:00 PM" },
  { hour: "9 PM",  value: 8,  time: "09:00 PM" },
  { hour: "10 PM", value: 5,  time: "10:00 PM" },
  { hour: "11 PM", value: 4,  time: "11:00 PM" },
];

// 7-day daily forecast list
export const sevenDayForecastData = [
  { day: "Mon, 22 Sep", icon: "rain-moderate", rainfall: "24 mm", condition: "Moderate Rain", tempMax: 28, tempMin: 22 },
  { day: "Tue, 23 Sep", icon: "rain-light",    rainfall: "18 mm", condition: "Light Rain",    tempMax: 27, tempMin: 22 },
  { day: "Wed, 24 Sep", icon: "rain-moderate", rainfall: "32 mm", condition: "Moderate Rain", tempMax: 28, tempMin: 21 },
  { day: "Thu, 25 Sep", icon: "rain-light",    rainfall: "8 mm",  condition: "Light Rain",    tempMax: 29, tempMin: 22 },
  { day: "Fri, 26 Sep", icon: "drizzle",       rainfall: "5 mm",  condition: "Drizzle",       tempMax: 30, tempMin: 23 },
  { day: "Sat, 27 Sep", icon: "cloudy",        rainfall: "0 mm",  condition: "No Rain",       tempMax: 31, tempMin: 23 },
  { day: "Sun, 28 Sep", icon: "rain-light",    rainfall: "12 mm", condition: "Light Rain",    tempMax: 30, tempMin: 22 },
];

// 7-day rainfall trend (actual past + AI forecast)
export const rainfallTrendData = [
  { date: "22 Sep", value: 14, type: "actual" },
  { date: "23 Sep", value: 28, type: "actual" },
  { date: "24 Sep", value: 42, type: "actual" },
  { date: "25 Sep", value: 18, type: "forecast" },
  { date: "26 Sep", value: 26, type: "forecast" },
  { date: "27 Sep", value: 30, type: "forecast" },
  { date: "28 Sep", value: 52, type: "forecast" },
  { date: "29 Sep", value: 22, type: "forecast" },
];

// Risk assessment indicators
export const riskAssessmentData = [
  { id: "flood",     label: "Flood Risk",       level: "Medium", color: "#F59E0B", percent: 55, icon: "alert-triangle" },
  { id: "river",     label: "River Level Rise", level: "Low",    color: "#16B86A", percent: 25, icon: "droplets" },
  { id: "waterlog",  label: "Water Logging",    level: "Medium", color: "#F59E0B", percent: 65, icon: "waves" },
  { id: "landslide", label: "Landslide Risk",   level: "Low",    color: "#16B86A", percent: 18, icon: "mountain" },
];

// District-wise table data
export const districtWiseForecastData = [
  { id: "ranchi",     name: "Ranchi",     today: 24, tomorrow: 18, risk: "Medium", riskColor: "#F59E0B" },
  { id: "hazaribagh", name: "Hazaribagh", today: 28, tomorrow: 35, risk: "High",   riskColor: "#EF4444" },
  { id: "dhanbad",    name: "Dhanbad",    today: 12, tomorrow: 10, risk: "Low",    riskColor: "#16B86A" },
  { id: "jamshedpur", name: "Jamshedpur", today: 18, tomorrow: 22, risk: "Medium", riskColor: "#F59E0B" },
  { id: "deoghar",    name: "Deoghar",    today: 8,  tomorrow: 12, risk: "Low",    riskColor: "#16B86A" },
];

// Surrounding states / regions for map label markers
export const mapRegionLabels = [
  { name: "Uttar Pradesh", lat: 25.2, lon: 83.2 },
  { name: "Bihar",         lat: 25.4, lon: 85.8 },
  { name: "West Bengal",   lat: 23.5, lon: 87.8 },
  { name: "Odisha",        lat: 21.6, lon: 85.0 },
  { name: "Chhattisgarh",  lat: 22.8, lon: 82.8 },
  { name: "Jharkhand",     lat: 23.6, lon: 85.3 },
];

// Radar intensity legend stops (mm/hr)
export const rainfallIntensityLegend = [
  { value: 200, color: "#EF4444", label: "200" },
  { value: 100, color: "#F97316", label: "100" },
  { value: 60,  color: "#FBBF24", label: "60" },
  { value: 30,  color: "#34D399", label: "30" },
  { value: 10,  color: "#38BDF8", label: "10" },
  { value: 0,   color: "#3B82F6", label: "0" },
];

export const aiForecastInsightText = {
  summary: "Moderate rainfall is expected in Ranchi between 10 AM and 2 PM. Carry an umbrella and avoid low-lying areas. Rain intensity may increase due to a developing weather system over eastern India.",
  detailedExplanation: `Meteorological Analysis:
1. Convective Cloud Structure: Doppler radar scans indicate high reflectivity (38-46 dBZ) developing northeast of Ranchi, signaling moderate-to-heavy convective rainbands.
2. Atmospheric Dynamics: Surface trough extension combined with low-level moisture advection from the Bay of Bengal increases precipitation potential.
3. EarthFormer Deep Learning Prediction: Multi-scale spatiotemporal model projects peak accumulation of 32 mm/hr centered around noon, easing to scattered light showers by late afternoon.
4. Advisory: Commuters are advised to avoid waterlogged underpasses in the Morabadi and Lalpur areas between 11:30 AM and 2:30 PM.`,
};
