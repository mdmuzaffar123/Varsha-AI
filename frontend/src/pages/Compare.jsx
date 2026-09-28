import React, { useState, useEffect } from "react";
import LocationSelector from "../components/compare/LocationSelector";
import CategoryTabs from "../components/compare/CategoryTabs";
import LocationHeaderCards from "../components/compare/LocationHeaderCards";
import RainfallComparisonChart from "../components/compare/RainfallComparisonChart";
import TemperatureTrendChart from "../components/compare/TemperatureTrendChart";
import QuickGaugesRow from "../components/compare/QuickGaugesRow";
import AIComparisonInsight from "../components/compare/AIComparisonInsight";
import RecommendedActions from "../components/compare/RecommendedActions";
import ForecastTable from "../components/compare/ForecastTable";
import RiskComparisonMatrix from "../components/compare/RiskComparisonMatrix";
import ThunderstormLightningComparison from "../components/compare/ThunderstormLightningComparison";
import RadarComparisonPanels from "../components/compare/RadarComparisonPanels";
import DifferenceSummary from "../components/compare/DifferenceSummary";
import ComparisonTable from "../components/compare/ComparisonTable";
import ExportActions from "../components/compare/ExportActions";

import { ALL_LOCATIONS_MASTER } from "../data/compareData";
import { getWeatherComparison } from "../services/compareService";
import "./Compare.css";

export default function Compare() {
  const [selectedIds, setSelectedIds] = useState(["ranchi", "patna"]);
  const [activeTab, setActiveTab] = useState("overview");
  const [forecastHorizon, setForecastHorizon] = useState("6 Hours");
  const [activeLocations, setActiveLocations] = useState([]);

  // Fetch location records when selectedIds change
  useEffect(() => {
    getWeatherComparison(selectedIds).then((data) => {
      setActiveLocations(data);
    });
  }, [selectedIds]);

  const handleSelectLocation = (index, locationId) => {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[index] = locationId;
      return next;
    });
  };

  const handleSwapLocations = () => {
    setSelectedIds((prev) => {
      if (prev.length < 2) return prev;
      const next = [...prev];
      const temp = next[0];
      next[0] = next[1];
      next[1] = temp;
      return next;
    });
  };

  const handleAddLocation = () => {
    if (selectedIds.length >= 4) return;
    const available = ALL_LOCATIONS_MASTER.find(
      (loc) => !selectedIds.includes(loc.id)
    );
    if (available) {
      setSelectedIds((prev) => [...prev, available.id]);
    }
  };

  const handleRemoveLocation = (indexToRemove) => {
    if (selectedIds.length <= 2) return; // Keep at least 2 locations
    setSelectedIds((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleReset = () => {
    setSelectedIds(["ranchi", "patna"]);
    setForecastHorizon("6 Hours");
    setActiveTab("overview");
  };

  return (
    <div className="compare-page-container">
      {/* 1. Header & Location Selector Bar */}
      <LocationSelector
        selectedIds={selectedIds}
        onSelectLocation={handleSelectLocation}
        onSwapLocations={handleSwapLocations}
        onAddLocation={handleAddLocation}
        onRemoveLocation={handleRemoveLocation}
        onReset={handleReset}
        forecastHorizon={forecastHorizon}
        onHorizonChange={setForecastHorizon}
      />

      {/* 2. Category Navigation Tabs */}
      <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 3. Location Showcase Cards + Mini Leaflet Map */}
      <LocationHeaderCards locations={activeLocations} />

      {/* 4. Rainfall & Temperature Charts (2 Columns) */}
      <div className="compare-two-col">
        <RainfallComparisonChart locations={activeLocations} />
        <TemperatureTrendChart locations={activeLocations} />
      </div>

      {/* 5. Parameter Gauges (4 Progress Bars side-by-side) */}
      <QuickGaugesRow locations={activeLocations} />

      {/* 6. AI Comparison Insights & Recommended Actions (2 Columns) */}
      <div className="compare-two-col">
        <AIComparisonInsight locations={activeLocations} />
        <RecommendedActions locations={activeLocations} />
      </div>

      {/* 7. Forecast Table & Risk Level Matrix (2 Columns) */}
      <div className="compare-two-col">
        <ForecastTable locations={activeLocations} />
        <RiskComparisonMatrix locations={activeLocations} />
      </div>

      {/* 8. Thunderstorm & Lightning Comparison */}
      <ThunderstormLightningComparison locations={activeLocations} />

      {/* 9. Radar Conditions & Reflectivity Panels */}
      <RadarComparisonPanels locations={activeLocations} />

      {/* 10. Key Differences Neutral Delta Cards */}
      <DifferenceSummary locations={activeLocations} />

      {/* 11. Full Metric Comparison Table */}
      <ComparisonTable locations={activeLocations} forecastHorizon={forecastHorizon} />

      {/* 12. Export & Decision Sharing */}
      <ExportActions />
    </div>
  );
}
