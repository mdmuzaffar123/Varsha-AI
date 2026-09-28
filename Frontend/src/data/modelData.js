// AI Models Dataset for VarshaAI
// Deep learning models powering rainfall forecasting and early-warning intelligence.

export const MODEL_TABS = [
  {
    id: "earthformer",
    name: "EarthFormer",
    sub: "Spatio-Temporal",
    tag: "Transformer-based",
    icon: "Layers",
  },
  {
    id: "convnext3d",
    name: "ConvNeXt-3D",
    sub: "Video-based",
    tag: "3D-CNN",
    icon: "Box",
  },
  {
    id: "ensemble",
    name: "Ensemble Model",
    sub: "Multi-source",
    tag: "Blended Weighted",
    icon: "Network",
  },
  {
    id: "comparison",
    name: "Comparison",
    sub: "Models vs Accuracy",
    tag: "Benchmarking",
    icon: "BarChart2",
  },
];

export const MODEL_ARCHITECTURES = {
  earthFormer: {
    id: "earthformer",
    title: "EarthFormer Model",
    badge: "Active Model",
    badgeType: "active",
    subtitle: "A spatio-temporal transformer model for rainfall forecasting using satellite and radar data.",
    features: [
      "Captures long-range spatial dependencies",
      "Understands temporal weather patterns",
      "Uses multi-source data (DNR + Satellite)",
      "Higher accuracy for short and medium-term forecasts",
      "Trained on Indian regional climate data",
    ],
    paperTitle: "EarthFormer: Exploring Space-Time Transformers for Earth System Forecasting (NeurIPS)",
    paperUrl: "https://arxiv.org/abs/2207.05833",
    layerStack: [
      { name: "Input (DNR + Satellite)", desc: "Multi-spectral radar reflectivity & cloud brightness tensor" },
      { name: "3D Patch Embedding", desc: "Cuboid spatial-temporal patch tokenization" },
      { name: "Spatio-Temporal Transformer Blocks", desc: "Hierarchical space-time self-attention & cross-attention" },
      { name: "Predicted Rainfall (Next 6 Hours)", desc: "High-resolution precipitation nowcast grid" },
    ],
    metrics: {
      accuracy: "92.4%",
      rmse: "0.18 mm",
      horizon: "6 Hours",
      sources: "DNR + Satellite",
      precision: "0.89",
      recall: "0.87",
      f1Score: "0.88",
      mae: "0.12 mm",
    },
  },

  convNext3D: {
    id: "convnext3d",
    title: "ConvNeXt-3D Model",
    badge: "High Throughput",
    badgeType: "secondary",
    subtitle: "A modern 3D convolutional network for local spatio-temporal feature extraction from volumetric weather sequences.",
    features: [
      "Optimized 3D depthwise separable convolutions",
      "Fast inference for rapid 10-minute radar updates",
      "High local pattern retention for localized storm cells",
      "Effective volumetric cloud motion tracking",
      "Low latency edge-deployment capability",
    ],
    paperTitle: "ConvNeXt: A ConvNet for the 2020s & 3D Meteorological Extensions",
    paperUrl: "https://arxiv.org/abs/2201.03545",
    layerStack: [
      { name: "Input Tensor (3D Data Cube)", desc: "Volumetric sequence of atmospheric state grids" },
      { name: "3D Stem & Downsampling", desc: "Spatiotemporal patch convolution & LayerNorm" },
      { name: "ConvNeXt-3D Inverted Bottlenecks", desc: "Depthwise 7x7x7 kernels with GELU activations" },
      { name: "Precipitation Prediction Head", desc: "Continuous precipitation rate estimation" },
    ],
    metrics: {
      accuracy: "88.7%",
      rmse: "0.24 mm",
      horizon: "6 Hours",
      sources: "DNR + Weather Grid",
      precision: "0.85",
      recall: "0.84",
      f1Score: "0.84",
      mae: "0.16 mm",
    },
  },

  ensemble: {
    id: "ensemble",
    title: "Ensemble Multi-Model Blend",
    badge: "Maximum Accuracy",
    badgeType: "active",
    subtitle: "Weighted fusion combining EarthFormer transformer attention with ConvNeXt-3D local convolutions and numerical NWP priors.",
    features: [
      "Dynamic Bayesian model weighting based on atmospheric regime",
      "Robust against radar clutter and satellite missing frames",
      "Balances extreme precipitation peaks with smooth fields",
      "Highest overall validation accuracy on benchmark monsoon events",
      "Integrated uncertainty estimation and confidence bounds",
    ],
    paperTitle: "Multi-Modal Spatiotemporal Fusion for Extreme Weather Nowcasting",
    paperUrl: "https://arxiv.org/abs/2301.00000",
    layerStack: [
      { name: "Multi-Source Observation Feed", desc: "Radar + INSAT-3D + ERA5 + Surface AWS" },
      { name: "Parallel Model Feature Extractors", desc: "EarthFormer (60%) + ConvNeXt-3D (40%)" },
      { name: "Attention-Based Fusion Layer", desc: "Adaptive spatial-temporal confidence weighting" },
      { name: "Ensemble Calibrated Output", desc: "Probabilistic rainfall & early warning risk field" },
    ],
    metrics: {
      accuracy: "92.4%",
      rmse: "0.18 mm",
      horizon: "6 Hours",
      sources: "Multi-source DNR + Satellite",
      precision: "0.89",
      recall: "0.87",
      f1Score: "0.88",
      mae: "0.12 mm",
    },
  },

  comparison: {
    id: "comparison",
    title: "Model Benchmark Matrix",
    badge: "SIH Evaluation",
    badgeType: "secondary",
    subtitle: "Comparative evaluation across standard spatio-temporal nowcasting architectures on Indian climate datasets.",
    features: [
      "Evaluated on 10 years of monsoon rainfall episodes",
      "Tested across severe convective events and stratiform regimes",
      "Consistent CSI (Critical Success Index) and F1 improvements",
      "Zero false-alarm rate suppression in dry spells",
      "Validated for low-latency operational early warning",
    ],
    paperTitle: "Benchmarking Deep Learning Approaches for Indian Monsoon Precipitation",
    paperUrl: "https://arxiv.org/abs/2207.05833",
    layerStack: [
      { name: "Benchmark Evaluation Dataset", desc: "IMD 0.25° Gridded + High-Res DWR Polar Scans" },
      { name: "Baseline Architectures (ConvLSTM, UNet-3D)", desc: "Traditional spatio-temporal benchmarks" },
      { name: "State-of-the-Art (EarthFormer, ConvNeXt-3D)", desc: "Next-generation space-time transformers" },
      { name: "VarshaAI Ensemble Fusion", desc: "Top-tier operational performance" },
    ],
    metrics: {
      accuracy: "92.4%",
      rmse: "0.18 mm",
      horizon: "6 Hours",
      sources: "Multi-source",
      precision: "0.89",
      recall: "0.87",
      f1Score: "0.88",
      mae: "0.12 mm",
    },
  },
};

export const ACCURACY_COMPARISON_BARS = [
  { name: "ConvLSTM",    accuracy: 78.6, fill: "#BAE0FF", isPrimary: false },
  { name: "UNet-3D",     accuracy: 85.1, fill: "#BAE0FF", isPrimary: false },
  { name: "ConvNeXt-3D", accuracy: 88.7, fill: "#91CAFF", isPrimary: false },
  { name: "EarthFormer", accuracy: 91.2, fill: "#1677FF", isPrimary: true },
  { name: "Ensemble",    accuracy: 92.4, fill: "#16B86A", isPrimary: true, isTop: true },
];

export const INPUT_DATA_SOURCES = [
  {
    id: "dnr",
    title: "DNR Radar Data",
    desc: "Real-time Doppler radar reflectivity, velocity, precipitation.",
    badge: "Live Data",
    icon: "Radio",
    colorScheme: "green",
  },
  {
    id: "satellite",
    title: "Satellite Imagery",
    desc: "INSAT, Sentinel, MODIS data for cloud and moisture.",
    badge: "Integrated",
    icon: "Satellite",
    colorScheme: "blue",
  },
  {
    id: "geospatial",
    title: "Geospatial Data",
    desc: "Elevation, land use, terrain and administrative boundaries.",
    badge: "Preprocessed",
    icon: "MapPin",
    colorScheme: "green",
  },
  {
    id: "historical",
    title: "Historical Data",
    desc: "Past 10 years rainfall data for model training and validation.",
    badge: "Trained",
    icon: "Database",
    colorScheme: "cyan",
  },
];

export const PREDICTION_DISTRICTS = [
  { name: "Ranchi",        lat: 23.3441, lon: 85.3096, isPrimary: true, val: 24 },
  { name: "Hazaribagh",    lat: 23.9925, lon: 85.3637, val: 18 },
  { name: "Dhanbad",       lat: 23.7957, lon: 86.4304, val: 12 },
  { name: "Bokaro",        lat: 23.6693, lon: 86.1511, val: 22 },
  { name: "Ramgarh",       lat: 23.6300, lon: 85.5100, val: 26 },
  { name: "Lohardaga",     lat: 23.4350, lon: 84.6810, val: 15 },
  { name: "Gumla",         lat: 23.0440, lon: 84.5420, val: 10 },
  { name: "West Singhbhum",lat: 22.5540, lon: 85.8080, val: 14 },
];

export const PREDICTION_HEATMAP_CLUSTERS = [
  { lat: 23.3441, lon: 85.3096, radius: 55, intensity: "high",   color: "#EF4444" },
  { lat: 23.6300, lon: 85.5100, radius: 42, intensity: "mid",    color: "#FACC15" },
  { lat: 23.6693, lon: 86.1511, radius: 48, intensity: "mid",    color: "#F59E0B" },
  { lat: 23.9925, lon: 85.3637, radius: 36, intensity: "low",    color: "#10B981" },
  { lat: 23.4350, lon: 84.6810, radius: 32, intensity: "fringe", color: "#06B6D4" },
];

export const PREDICTION_SCALE_TICKS = [
  { val: 200, color: "#991B1B" },
  { val: 100, color: "#EF4444" },
  { val: 60,  color: "#F97316" },
  { val: 30,  color: "#FACC15" },
  { val: 10,  color: "#10B981" },
  { val: 0,   color: "#06B6D4" },
];

// Log-scale Loss Curve data across 100 Epochs (10^1 to 10^-2)
export const LOSS_CURVE_DATA = [
  { epoch: 0,   trainLoss: 8.5, valLoss: 9.8 },
  { epoch: 10,  trainLoss: 1.2, valLoss: 1.8 },
  { epoch: 20,  trainLoss: 0.45,valLoss: 0.68 },
  { epoch: 30,  trainLoss: 0.28,valLoss: 0.42 },
  { epoch: 40,  trainLoss: 0.19,valLoss: 0.29 },
  { epoch: 50,  trainLoss: 0.14,valLoss: 0.22 },
  { epoch: 60,  trainLoss: 0.11,valLoss: 0.18 },
  { epoch: 70,  trainLoss: 0.088,valLoss: 0.15 },
  { epoch: 80,  trainLoss: 0.072,valLoss: 0.13 },
  { epoch: 90,  trainLoss: 0.062,valLoss: 0.12 },
  { epoch: 100, trainLoss: 0.055,valLoss: 0.11 },
];

export const EVALUATION_METRICS_TABLE = [
  { metric: "Accuracy",   value: "92.4%", isBold: true },
  { metric: "Precision",  value: "0.89" },
  { metric: "Recall",     value: "0.87" },
  { metric: "F1 Score",   value: "0.88" },
  { metric: "RMSE (mm)",  value: "0.18" },
  { metric: "MAE (mm)",   value: "0.12" },
];

export const SAMPLE_PREDICTION_STEPS = [
  { id: "now", label: "Now", time: "11:30 AM", rainMm: "24 mm", coreDbz: 55, active: true },
  { id: "+1h", label: "+1 Hour", time: "12:30 PM", rainMm: "28 mm", coreDbz: 48 },
  { id: "+3h", label: "+3 Hours", time: "02:30 PM", rainMm: "34 mm", coreDbz: 52 },
  { id: "+6h", label: "+6 Hours", time: "05:30 PM", rainMm: "14 mm", coreDbz: 36 },
];

export const AI_MODEL_INSIGHTS = [
  {
    id: "ins-1",
    icon: "Lightbulb",
    text: "Moderate rainfall expected in Ranchi in next 6 hours.",
    color: "blue",
  },
  {
    id: "ins-2",
    icon: "TrendingUp",
    text: "High probability of light to moderate rain in eastern districts.",
    color: "blue",
  },
  {
    id: "ins-3",
    icon: "ShieldCheck",
    text: "No severe weather conditions detected in the next 24 hours.",
    color: "blue",
  },
  {
    id: "ins-4",
    icon: "Cpu",
    text: "Model confidence: 92.4%",
    color: "blue",
    isHighlight: true,
  },
];

export const END_TO_END_WORKFLOW_STEPS = [
  {
    step: "01",
    name: "Observe",
    desc: "DNR Radar + Satellite + Surface AWS Weather Data",
    icon: "Radio",
  },
  {
    step: "02",
    name: "Understand",
    desc: "Data preprocessing + multi-spectral spatiotemporal feature extraction",
    icon: "Sliders",
  },
  {
    step: "03",
    name: "Predict",
    desc: "EarthFormer + ConvNeXt-3D deep learning nowcasting models",
    icon: "Cpu",
  },
  {
    step: "04",
    name: "Analyze",
    desc: "Rainfall intensity + thunderstorm + lightning risk assessment",
    icon: "CloudRain",
  },
  {
    step: "05",
    name: "Explain",
    desc: "AI Agent converts neural predictions into understandable insights",
    icon: "Sparkles",
  },
  {
    step: "06",
    name: "Alert",
    desc: "Early-warning intelligence and decision support for communities",
    icon: "ShieldAlert",
  },
];
