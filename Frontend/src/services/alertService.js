/**
 * Alert Service Layer for VarshaAI
 * 
 * Prepares the architecture for future Python/FastAPI backend integration.
 * Currently returns frontend demo data from src/data/alertData.js.
 * 
 * FUTURE API CONTRACTS (PLANNED):
 * - GET /api/alerts -> List all alerts
 * - GET /api/alerts/active -> Active priority alerts
 * - GET /api/alerts/{id} -> Single alert detail with spatial data
 * - GET /api/alerts/history -> Historical alert archive
 * - GET /api/alerts/risk -> Multi-hazard risk matrix
 * - GET /api/alerts/timeline -> 24h risk timeline
 * - POST /api/ai-agent/alert -> Generate natural language AI insight
 * - GET /api/notifications/preferences -> User notification settings
 */

import {
  ALERT_SUMMARY_CARDS,
  ALERT_STATUS_BAR,
  ACTIVE_ALERTS,
  MAP_ALERT_MARKERS,
  RISK_TIMELINE_DATA,
  RISK_MATRIX_DATA,
  AI_AGENT_INSIGHTS,
  WEATHER_RISK_TYPES,
  ALERT_HISTORY_DATA,
  ALERT_SOURCES_DATA,
  ALERT_PIPELINE_STAGES,
  NOTIFICATION_PREFERENCES_DEMO,
} from "../data/alertData";

/**
 * Fetch top alert summary cards
 */
export async function getAlertSummary() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ALERT_SUMMARY_CARDS);
    }, 50);
  });
}

/**
 * Fetch horizontal alert status bar metadata
 */
export async function getAlertStatusBar() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ALERT_STATUS_BAR);
    }, 50);
  });
}

/**
 * Fetch active weather alerts with optional filters
 */
export async function getActiveAlerts(filters = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let alerts = [...ACTIVE_ALERTS];

      if (filters.severity && filters.severity !== "ALL") {
        alerts = alerts.filter(
          (a) => a.severity.toUpperCase() === filters.severity.toUpperCase()
        );
      }

      if (filters.eventType && filters.eventType !== "ALL") {
        alerts = alerts.filter(
          (a) =>
            a.eventType.toLowerCase().includes(filters.eventType.toLowerCase()) ||
            filters.eventType.toLowerCase().includes(a.eventType.toLowerCase())
        );
      }

      if (filters.location && filters.location !== "ALL") {
        alerts = alerts.filter((a) =>
          a.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      resolve(alerts);
    }, 50);
  });
}

/**
 * Fetch single alert details by ID
 */
export async function getAlertDetails(alertId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const alert = ACTIVE_ALERTS.find((a) => a.id === alertId) || ACTIVE_ALERTS[0];
      resolve(alert);
    }, 50);
  });
}

/**
 * Fetch map location markers for illustrative alert map
 */
export async function getAlertMapMarkers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MAP_ALERT_MARKERS);
    }, 50);
  });
}

/**
 * Fetch 24-hour weather risk timeline
 */
export async function getRiskTimeline() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(RISK_TIMELINE_DATA);
    }, 50);
  });
}

/**
 * Fetch multi-hazard risk assessment matrix
 */
export async function getRiskMatrix() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(RISK_MATRIX_DATA);
    }, 50);
  });
}

/**
 * Fetch recent alert history archive
 */
export async function getAlertHistory(timeFilter = "Today") {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!timeFilter || timeFilter === "All") {
        resolve(ALERT_HISTORY_DATA);
      } else {
        const filtered = ALERT_HISTORY_DATA.filter(
          (item) => item.dateGroup.toLowerCase() === timeFilter.toLowerCase()
        );
        resolve(filtered.length > 0 ? filtered : ALERT_HISTORY_DATA);
      }
    }, 50);
  });
}

/**
 * Fetch intelligence data sources
 */
export async function getAlertSources() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ALERT_SOURCES_DATA);
    }, 50);
  });
}

/**
 * Fetch monitored weather risk categories
 */
export async function getWeatherRiskTypes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(WEATHER_RISK_TYPES);
    }, 50);
  });
}

/**
 * Fetch AI pipeline stages
 */
export async function getAlertPipeline() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ALERT_PIPELINE_STAGES);
    }, 50);
  });
}

/**
 * Cycle/generate next AI alert intelligence insight (Demo)
 */
export async function generateAIInsight(currentIndex = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % AI_AGENT_INSIGHTS.length;
      resolve(AI_AGENT_INSIGHTS[nextIndex]);
    }, 150);
  });
}
