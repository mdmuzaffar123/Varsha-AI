// Model Service Layer for VarshaAI
// Prepares frontend architecture for future Python/FastAPI endpoints:
// GET /api/models/status
// GET /api/models
// GET /api/models/{model}
// GET /api/models/{model}/metrics
// GET /api/models/{model}/forecast
// GET /api/models/compare
// GET /api/ai-agent/insight

import {
  MODEL_TABS,
  MODEL_ARCHITECTURES,
  INPUT_DATA_SOURCES,
  ACCURACY_COMPARISON_BARS,
  LOSS_CURVE_DATA,
  EVALUATION_METRICS_TABLE,
  SAMPLE_PREDICTION_STEPS,
  AI_MODEL_INSIGHTS,
  END_TO_END_WORKFLOW_STEPS,
} from "../data/modelData";

export async function fetchModelStatus() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pipelineStatus: "Demo Mode",
        inputSources: "3+",
        modelsLoaded: 2,
        forecastHorizon: "0–24h",
        aiOutput: "Actionable",
        activeModel: "EarthFormer",
      });
    }, 100);
  });
}

export async function fetchModelDetails(modelId = "earthformer") {
  return new Promise((resolve) => {
    setTimeout(() => {
      const model =
        MODEL_ARCHITECTURES[modelId] ||
        MODEL_ARCHITECTURES.earthFormer;
      resolve(model);
    }, 120);
  });
}

export async function fetchModelComparison() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ACCURACY_COMPARISON_BARS);
    }, 100);
  });
}

export async function fetchTrainingLossHistory() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(LOSS_CURVE_DATA);
    }, 100);
  });
}

export async function fetchEvaluationMetrics() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(EVALUATION_METRICS_TABLE);
    }, 80);
  });
}

export async function fetchSamplePredictions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SAMPLE_PREDICTION_STEPS);
    }, 100);
  });
}

export async function fetchAIModelInsights() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(AI_MODEL_INSIGHTS);
    }, 80);
  });
}

export async function fetchEndToEndWorkflow() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(END_TO_END_WORKFLOW_STEPS);
    }, 80);
  });
}
