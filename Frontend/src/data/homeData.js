// VarshaAI — Demo Data (replace with API in next phase)

export const currentWeather = {
  location: "Ranchi, Jharkhand",
  rainfall: 24,
  rainfallUnit: "mm",
  rainfallLabel: "Moderate Rain",
  temperature: 28,
  humidity: 78,
  windSpeed: 12,
  cloudCover: 85,
  status: "Normal for this time",
};

export const heroStats = [
  { id: 1, value: "98%", label: "Forecast Accuracy", sublabel: "Short-term", icon: "target" },
  { id: 2, value: "600+", label: "Districts Covered", sublabel: "Across India", icon: "map-pin" },
  { id: 3, value: "Real-time", label: "DNR Radar + Satellite", sublabel: "Live data", icon: "radio" },
  { id: 4, value: "AI Agent", label: "LLM-Based Alerts", sublabel: "Intelligent", icon: "bot" },
  { id: 5, value: "Safer", label: "Communities", sublabel: "Our mission", icon: "shield" },
];

export const features = [
  { id: 1, title: "Real-time Forecasts", description: "Rainfall predictions up to 7 days ahead with high accuracy.", icon: "cloud-rain", route: "/forecast", color: "#1677FF" },
  { id: 2, title: "DNR Radar Integration", description: "High-resolution live Doppler radar data for precise tracking.", icon: "radar", route: "/dnr-radar", color: "#20C7D9" },
  { id: 3, title: "AI / Deep Learning", description: "EarthFormer and ConvNeXt-3D models for advanced rainfall prediction.", icon: "cpu", route: "/ai-models", color: "#7C3AED" },
  { id: 4, title: "Early Alerts", description: "AI Agent powered weather risk alerts for disaster preparedness.", icon: "bell", route: "/alerts", color: "#F59E0B" },
  { id: 5, title: "Compare & Analyze", description: "Compare rainfall and weather conditions between locations.", icon: "bar-chart-2", route: "/compare", color: "#16B86A" },
  { id: 6, title: "Reports & Insights", description: "Generate detailed rainfall and climate reports on demand.", icon: "file-text", route: "/reports", color: "#EF4444" },
];

export const impactStats = [
  { value: "98%", label: "Forecast Accuracy" },
  { value: "600+", label: "Districts Covered" },
  { value: "Real-time", label: "DNR Radar + Satellite" },
  { value: "Safer", label: "Communities" },
];

export const whyFeatures = [
  { title: "DNR Radar + Satellite Data", description: "Combines live Doppler radar with multi-satellite data streams for comprehensive atmospheric coverage." },
  { title: "Advanced Deep Learning Models", description: "EarthFormer and ConvNeXt-3D process complex spatio-temporal weather patterns with unmatched precision." },
  { title: "AI Agent for Intelligent Alerts", description: "LLM-powered agent converts raw model outputs into clear, actionable early-warning messages." },
  { title: "Location Comparison", description: "Side-by-side rainfall and weather comparison across multiple Indian districts and cities." },
  { title: "Actionable Insights", description: "Designed for authorities, farmers, and decision-makers to act fast on weather intelligence." },
  { title: "Simple Interactive Platform", description: "Clean, intuitive interface that makes complex weather data easy to understand for all users." },
];

export const productFlow = [
  { step: "01", title: "DNR Radar", description: "Real-time atmospheric observations from Doppler radar networks." },
  { step: "02", title: "Satellite Data", description: "Additional weather and environmental data from satellite imagery." },
  { step: "03", title: "AI / Deep Learning", description: "EarthFormer + ConvNeXt-3D process spatio-temporal data." },
  { step: "04", title: "AI Agent", description: "Converts model outputs into understandable, human-readable insights." },
  { step: "05", title: "Actionable Alert", description: "Helps users understand potential rainfall risks and take action." },
];

export const impactBannerPoints = [
  { title: "Accurate Forecasts", subtitle: "for Better Decisions" },
  { title: "Disaster Preparedness", subtitle: "for Safer Communities" },
  { title: "Data-Driven Policies", subtitle: "for Sustainable Growth" },
  { title: "Protecting Lives", subtitle: "and Livelihoods" },
];

export const navLinks = [
  { label: "Home", route: "/" },
  { label: "Forecast", route: "/forecast" },
  { label: "DNR Radar", route: "/dnr-radar" },
  { label: "AI Models", route: "/ai-models" },
  { label: "Alerts", route: "/alerts" },
  { label: "Compare", route: "/compare" },
  { label: "Reports", route: "/reports" },
  { label: "Learn", route: "/learn" },
  { label: "Settings", route: "/settings" },
];

export const searchSuggestions = [
  { label: "Ranchi, Jharkhand", value: "ranchi" },
  { label: "Delhi, NCT", value: "delhi" },
  { label: "Mumbai, Maharashtra", value: "mumbai" },
  { label: "Chennai, Tamil Nadu", value: "chennai" },
  { label: "Bengaluru, Karnataka", value: "bengaluru" },
  { label: "Kolkata, West Bengal", value: "kolkata" },
  { label: "Patna, Bihar", value: "patna" },
  { label: "Bhopal, Madhya Pradesh", value: "bhopal" },
];

export const rainfallLegend = [
  { value: "0", color: "#C8E6FF" },
  { value: "10", color: "#4FC3F7" },
  { value: "30", color: "#26C6DA" },
  { value: "60", color: "#66BB6A" },
  { value: "100", color: "#FFA726" },
  { value: "200+", color: "#EF5350" },
];
