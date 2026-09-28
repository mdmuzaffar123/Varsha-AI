/**
 * Compare Service Layer for VarshaAI
 * 
 * Prepares architecture for future Python/FastAPI backend integration.
 * Returns frontend demo data from src/data/compareData.js.
 * 
 * FUTURE API CONTRACTS (PLANNED):
 * - GET /api/compare/locations -> Available location master list
 * - GET /api/compare/weather?locs=ranchi,patna -> Comparative weather overview
 * - GET /api/compare/rainfall?locs=ranchi,patna&horizon=6h -> Rainfall forecast comparison
 * - GET /api/compare/temperature?locs=ranchi,patna -> Temperature trend comparison
 * - GET /api/compare/storms?locs=ranchi,patna -> Thunderstorm & lightning comparative metrics
 * - GET /api/compare/risk?locs=ranchi,patna -> Multi-hazard risk level comparison
 * - GET /api/compare/radar?locs=ranchi,patna -> DNR Radar reflectivity comparison
 * - POST /api/compare/ai-insight -> Natural language comparative AI insight
 */

import {
  ALL_LOCATIONS_MASTER,
  RAINFALL_7DAY_DATA,
  TEMP_TREND_DATA,
  THUNDERSTORM_COMPARISON_DATA,
  LIGHTNING_COMPARISON_DATA,
  RISK_LEVEL_MATRIX_DATA,
  RECOMMENDED_ACTIONS_DATA,
  AI_COMPARISON_INSIGHTS_POOL,
} from "../data/compareData";

/**
 * Get all available location master records
 */
export async function getMasterLocations() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ALL_LOCATIONS_MASTER);
    }, 30);
  });
}

/**
 * Get comparative weather overview for selected location IDs
 */
export async function getWeatherComparison(locationIds = ["ranchi", "patna"]) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const selected = ALL_LOCATIONS_MASTER.filter((loc) =>
        locationIds.includes(loc.id)
      );
      resolve(selected.length > 0 ? selected : ALL_LOCATIONS_MASTER.slice(0, 2));
    }, 30);
  });
}

/**
 * Get 7-day rainfall comparison data for selected locations
 */
export async function getRainfallComparison(locationIds = ["ranchi", "patna"]) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = {};
      locationIds.forEach((id) => {
        result[id] = RAINFALL_7DAY_DATA[id] || RAINFALL_7DAY_DATA.ranchi;
      });
      resolve(result);
    }, 30);
  });
}

/**
 * Get temperature trend comparison data
 */
export async function getTemperatureComparison(locationIds = ["ranchi", "patna"]) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = {};
      locationIds.forEach((id) => {
        result[id] = TEMP_TREND_DATA[id] || TEMP_TREND_DATA.ranchi;
      });
      resolve(result);
    }, 30);
  });
}

/**
 * Get thunderstorm comparative data
 */
export async function getStormComparison(locationIds = ["ranchi", "patna"]) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = {};
      locationIds.forEach((id) => {
        result[id] = THUNDERSTORM_COMPARISON_DATA[id] || THUNDERSTORM_COMPARISON_DATA.ranchi;
      });
      resolve(result);
    }, 30);
  });
}

/**
 * Get lightning comparative data
 */
export async function getLightningComparison(locationIds = ["ranchi", "patna"]) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = {};
      locationIds.forEach((id) => {
        result[id] = LIGHTNING_COMPARISON_DATA[id] || LIGHTNING_COMPARISON_DATA.ranchi;
      });
      resolve(result);
    }, 30);
  });
}

/**
 * Get risk matrix comparison data
 */
export async function getRiskMatrixComparison() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(RISK_LEVEL_MATRIX_DATA);
    }, 30);
  });
}

/**
 * Get recommended actions for selected locations
 */
export async function getRecommendedActions(locationIds = ["ranchi", "patna"]) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = {};
      locationIds.forEach((id) => {
        result[id] = RECOMMENDED_ACTIONS_DATA[id] || RECOMMENDED_ACTIONS_DATA.ranchi;
      });
      resolve(result);
    }, 30);
  });
}

/**
 * Cycle AI comparison insight
 */
export async function generateAIComparisonInsight(currentIndex = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % AI_COMPARISON_INSIGHTS_POOL.length;
      resolve(AI_COMPARISON_INSIGHTS_POOL[nextIndex]);
    }, 100);
  });
}
