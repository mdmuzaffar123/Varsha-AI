// ============================================================
// VarshaAI — Weather Service
// Uses Open-Meteo (free, no API key) for live weather data.
// Uses RainViewer for live precipitation radar tiles.
// Replace with Python backend in next phase.
// ============================================================

const OPEN_METEO_BASE = "https://api.open-meteo.com/v1/forecast";
const RAINVIEWER_API  = "https://api.rainviewer.com/public/weather-maps.json";

// WMO weather code → human label
const WMO_CODES = {
  0:"Clear Sky", 1:"Mainly Clear", 2:"Partly Cloudy", 3:"Overcast",
  45:"Foggy", 48:"Icy Fog", 51:"Light Drizzle", 53:"Moderate Drizzle",
  55:"Heavy Drizzle", 61:"Light Rain", 63:"Moderate Rain", 65:"Heavy Rain",
  71:"Light Snow", 73:"Moderate Snow", 75:"Heavy Snow", 80:"Rain Showers",
  81:"Heavy Showers", 82:"Violent Showers", 95:"Thunderstorm",
  96:"Thunderstorm+Hail", 99:"Severe Thunderstorm",
};

export function getWeatherLabel(code) {
  return WMO_CODES[code] ?? "Unknown";
}

// Fetch current + hourly weather from Open-Meteo for a given location
export async function fetchWeather(lat = 23.34, lon = 85.31) {
  const params = new URLSearchParams({
    latitude:  lat,
    longitude: lon,
    current: [
      "temperature_2m","relative_humidity_2m","wind_speed_10m",
      "wind_direction_10m","precipitation","cloud_cover","weather_code",
    ].join(","),
    hourly: [
      "precipitation","temperature_2m","wind_speed_10m",
      "relative_humidity_2m","cloud_cover","precipitation_probability",
    ].join(","),
    daily: [
      "precipitation_sum","temperature_2m_max","temperature_2m_min",
    ].join(","),
    timezone: "Asia/Kolkata",
    forecast_days: 2,
  });

  const res  = await fetch(`${OPEN_METEO_BASE}?${params}`);
  if (!res.ok) throw new Error("Weather API error");
  const json = await res.json();

  const c = json.current;
  return {
    temperature:  c.temperature_2m,
    humidity:     c.relative_humidity_2m,
    windSpeed:    c.wind_speed_10m,
    windDir:      c.wind_direction_10m,
    precipitation: c.precipitation,
    cloudCover:   c.cloud_cover,
    weatherCode:  c.weather_code,
    weatherLabel: getWeatherLabel(c.weather_code),
    hourly: json.hourly,
    daily:  json.daily,
    raw:    json,
  };
}

// Fetch latest RainViewer radar frame timestamps
export async function fetchRadarFrames() {
  try {
    const res  = await fetch(RAINVIEWER_API);
    const json = await res.json();
    const frames = json?.radar?.past ?? [];
    return frames; // [{time, path}, ...]
  } catch {
    return [];
  }
}

// Build RainViewer tile URL from a frame path
export function radarTileUrl(path) {
  return `https://tilecache.rainviewer.com${path}/256/{z}/{x}/{y}/8/1_1.png`;
}

// Wind direction degrees → compass label
export function degToCompass(deg) {
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
}
