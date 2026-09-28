import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import DNRRadar from "./pages/DNRRadar";
import AIModels from "./pages/AIModels";
import Alerts from "./pages/Alerts";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All pages share the DashboardLayout (sidebar + topheader) */}
        <Route element={<DashboardLayout />}>
          <Route path="/"          element={<Home />} />
          <Route path="/forecast"  element={<Forecast />} />
          <Route path="/dnr-radar" element={<DNRRadar />} />
          <Route path="/ai-models" element={<AIModels />} />
          <Route path="/alerts"    element={<Alerts />} />
          <Route path="/compare"   element={<Placeholder />} />
          <Route path="/reports"   element={<Placeholder />} />
          <Route path="/learn"     element={<Placeholder />} />
          <Route path="/settings"  element={<Placeholder />} />
          <Route path="*"          element={<Placeholder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
