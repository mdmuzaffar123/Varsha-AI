// ============================================================
// useWeather — React hook for live Open-Meteo weather data
// ============================================================
import { useState, useEffect } from "react";
import { fetchWeather, degToCompass } from "../services/weatherService";

export function useWeather(lat = 23.34, lon = 85.31) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchWeather(lat, lon)
      .then(w => { if (!cancelled) { setData(w); setLoading(false); } })
      .catch(e => { if (!cancelled) { setError(e.message); setLoading(false); } });

    return () => { cancelled = true; };
  }, [lat, lon]);

  return { data, loading, error };
}
