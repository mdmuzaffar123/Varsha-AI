import React, { useState } from "react";
import ModelHeader from "../components/models/ModelHeader";
import ModelHeroShowcase from "../components/models/ModelHeroShowcase";
import InputDataSources from "../components/models/InputDataSources";
import PredictionOutputMap from "../components/models/PredictionOutputMap";
import TrainingLossChart from "../components/models/TrainingLossChart";
import EvaluationMetricsTable from "../components/models/EvaluationMetricsTable";
import SamplePredictions from "../components/models/SamplePredictions";
import AIModelInsights from "../components/models/AIModelInsights";
import EndToEndWorkflow from "../components/models/EndToEndWorkflow";
import ModelDetailsModal from "../components/models/ModelDetailsModal";
import "./AIModels.css";

export default function AIModels() {
  const [activeModelTab, setActiveModelTab] = useState("earthformer");
  const [selectedRegion, setSelectedRegion] = useState("Jharkhand");
  const [selectedDistrict, setSelectedDistrict] = useState("Ranchi");
  const [activeModalModel, setActiveModalModel] = useState(null);

  return (
    <div className="ai-models-page-container">
      {/* ── 1. Page Header & 4 Top Model Tabs ── */}
      <ModelHeader
        activeTab={activeModelTab}
        onTabChange={setActiveModelTab}
        selectedRegion={selectedRegion}
        selectedDistrict={selectedDistrict}
        onDistrictChange={setSelectedDistrict}
      />

      {/* ── 2. Hero Model Showcase & Comparison Bar Chart ── */}
      <ModelHeroShowcase
        activeTab={activeModelTab}
        selectedDistrict={selectedDistrict}
        onOpenModelDetails={setActiveModalModel}
      />

      {/* ── 3. Middle Section: Input Data Sources (Left) + Prediction Output Map (Right) ── */}
      <div className="models-middle-split-grid">
        <div className="models-middle-left-col">
          <InputDataSources />
        </div>
        <div className="models-middle-right-col">
          <PredictionOutputMap selectedDistrict={selectedDistrict} />
        </div>
      </div>

      {/* ── 4. Bottom 4-Card Technical Row (Exact Match with Reference Mockup) ── */}
      <div className="models-bottom-four-cards-grid">
        <TrainingLossChart />
        <EvaluationMetricsTable />
        <SamplePredictions />
        <AIModelInsights />
      </div>

      {/* ── 5. End-to-End VarshaAI Intelligence Workflow Pipeline ── */}
      <EndToEndWorkflow />

      {/* ── 6. Model Details Modal (Deep Dive) ── */}
      {activeModalModel && (
        <ModelDetailsModal
          model={activeModalModel}
          onClose={() => setActiveModalModel(null)}
        />
      )}
    </div>
  );
}
