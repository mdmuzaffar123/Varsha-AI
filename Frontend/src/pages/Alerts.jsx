import React, { useState, useEffect } from "react";
import AlertHeader from "../components/alerts/AlertHeader";
import AlertSummary from "../components/alerts/AlertSummary";
import AlertStatusBar from "../components/alerts/AlertStatusBar";
import AlertFilters from "../components/alerts/AlertFilters";
import ActiveAlertList from "../components/alerts/ActiveAlertList";
import AlertMap from "../components/alerts/AlertMap";
import RiskTimeline from "../components/alerts/RiskTimeline";
import RiskMatrix from "../components/alerts/RiskMatrix";
import AIAgentAlert from "../components/alerts/AIAgentAlert";
import WeatherRiskTypes from "../components/alerts/WeatherRiskTypes";
import AlertHistory from "../components/alerts/AlertHistory";
import AlertSources from "../components/alerts/AlertSources";
import AlertPipeline from "../components/alerts/AlertPipeline";
import NotificationPreview from "../components/alerts/NotificationPreview";
import AlertDetailModal from "../components/alerts/AlertDetailModal";

import { getActiveAlerts } from "../services/alertService";
import "./Alerts.css";

export default function Alerts() {
  const [selectedLocation, setSelectedLocation] = useState("Ranchi, Jharkhand");
  const [activeSeverity, setActiveSeverity] = useState("ALL");
  const [activeWeather, setActiveWeather] = useState("ALL");
  const [activeFilterLocation, setActiveFilterLocation] = useState("ALL");
  const [activeTime, setActiveTime] = useState("Now");

  const [alertsList, setAlertsList] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load active alerts based on filters
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getActiveAlerts({
      severity: activeSeverity,
      eventType: activeWeather,
      location: activeFilterLocation,
      time: activeTime,
    }).then((data) => {
      if (isMounted) {
        setAlertsList(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [activeSeverity, activeWeather, activeFilterLocation, activeTime]);

  const handleRefresh = () => {
    setIsLoading(true);
    getActiveAlerts({
      severity: activeSeverity,
      eventType: activeWeather,
      location: activeFilterLocation,
      time: activeTime,
    }).then((data) => {
      setAlertsList(data);
      setIsLoading(false);
    });
  };

  return (
    <div className="alerts-page-container">
      {/* 1. Page Header */}
      <AlertHeader
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        onRefresh={handleRefresh}
      />

      {/* 2. Top Alert Summary (4 Cards) */}
      <AlertSummary />

      {/* 3. Horizontal Status Bar */}
      <AlertStatusBar />

      {/* 4. Alert Priority & Hazard Filters */}
      <AlertFilters
        activeSeverity={activeSeverity}
        onSeverityChange={setActiveSeverity}
        activeWeather={activeWeather}
        onWeatherChange={setActiveWeather}
        activeLocation={activeFilterLocation}
        onLocationChange={setActiveFilterLocation}
        activeTime={activeTime}
        onTimeChange={setActiveTime}
      />

      {/* 5. Main Alert Grid: Active Alerts Feed (Left) + Alert Map (Right) */}
      <div className="alerts-main-two-col">
        <div className="alerts-feed-col">
          <ActiveAlertList
            alerts={alertsList}
            onSelectAlert={(alert) => setSelectedAlert(alert)}
          />
        </div>

        <div className="alerts-map-col">
          <AlertMap />
        </div>
      </div>

      {/* 6. Weather Risk Timeline */}
      <RiskTimeline />

      {/* 7. Risk Assessment Matrix & Monitored Weather Risks (2 Columns) */}
      <div className="alerts-row-two-col">
        <RiskMatrix />
        <WeatherRiskTypes />
      </div>

      {/* 8. AI Agent Section (AI Alert Intelligence) */}
      <AIAgentAlert />

      {/* 9. Recent Alert History (Collapsible) */}
      <AlertHistory />

      {/* 10. Technical Sources & Architecture Pipeline */}
      <div className="alerts-row-two-col">
        <AlertSources />
        <NotificationPreview />
      </div>

      {/* 11. AI Alert Pipeline Diagram */}
      <AlertPipeline />

      {/* Alert Detail Modal Dialog */}
      {selectedAlert && (
        <AlertDetailModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      )}
    </div>
  );
}
