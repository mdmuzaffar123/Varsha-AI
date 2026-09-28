import React, { useState } from "react";
import ForecastHeader from "../components/forecast/ForecastHeader";
import TopMetricCards from "../components/forecast/TopMetricCards";
import InteractiveRadarMap from "../components/forecast/InteractiveRadarMap";
import HourlyForecastChart from "../components/forecast/HourlyForecastChart";
import AIForecastInsights from "../components/forecast/AIForecastInsights";
import SevenDayForecast from "../components/forecast/SevenDayForecast";
import RainfallTrendChart from "../components/forecast/RainfallTrendChart";
import RiskAssessmentCard from "../components/forecast/RiskAssessmentCard";
import DistrictForecastTable from "../components/forecast/DistrictForecastTable";
import DownloadShareCard from "../components/forecast/DownloadShareCard";
import ForecastBottomData from "../components/forecast/ForecastBottomData";
import { useWeather } from "../services/useWeather";
import "./Forecast.css";

export default function Forecast() {
  const [activeWeatherTab, setActiveWeatherTab] = useState("rainfall");
  const [activeTimeFilter, setActiveTimeFilter] = useState("now");
  const [selectedState, setSelectedState] = useState("Jharkhand");
  const [selectedDistrict, setSelectedDistrict] = useState("Ranchi");
  const [selectedDate, setSelectedDate] = useState("Mon, 22 Sep 2026");

  // Live weather hook for real background sync
  const { data: liveWeather } = useWeather(23.3441, 85.3096);

  return (
    <div className="forecast-dashboard-page">
      {/* 1. Header with Title, State/District/Date Selectors, Weather Tabs, and Time Range Buttons */}
      <ForecastHeader
        activeTab={activeWeatherTab}
        onTabChange={setActiveWeatherTab}
        activeTimeFilter={activeTimeFilter}
        onTimeFilterChange={setActiveTimeFilter}
        selectedState={selectedState}
        onStateChange={setSelectedState}
        selectedDistrict={selectedDistrict}
        onDistrictChange={setSelectedDistrict}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {/* 2. Top Metric Cards (6 Cards Row) */}
      <TopMetricCards liveWeather={liveWeather} activeTab={activeWeatherTab} />

      {/* 3. Middle Section (Map + Hourly & AI Insights + 7-Day Forecast) */}
      <div className="forecast-middle-grid">
        {/* Left: Main Interactive Radar Map */}
        <div className="fmiddle-map-col">
          <InteractiveRadarMap
            selectedDistrict={selectedDistrict}
            liveWeather={liveWeather}
            activeTab={activeWeatherTab}
          />
        </div>

        {/* Center-Right: Hourly Forecast + AI Insights */}
        <div className="fmiddle-hourly-col">
          <HourlyForecastChart />
          <AIForecastInsights liveWeather={liveWeather} />
        </div>

        {/* Right: 7-Day Forecast */}
        <div className="fmiddle-sevenday-col">
          <SevenDayForecast />
        </div>
      </div>

      {/* 4. Bottom Section (4-Column Grid: Rainfall Trend + Risk Assessment + District Forecast + Download & Share) */}
      <div className="forecast-bottom-grid">
        <RainfallTrendChart />
        <RiskAssessmentCard />
        <DistrictForecastTable
          selectedDistrict={selectedDistrict}
          onSelectDistrict={setSelectedDistrict}
        />
        <DownloadShareCard />
      </div>

      {/* 5. Meteorological Telemetry, Ingest Status & Official Public Advisory */}
      <ForecastBottomData liveWeather={liveWeather} />
    </div>
  );
}
