import "./WeatherChart.css";

export default function WeatherChart({ data, mode, label }) {
  const isLightning = mode === "lightning";
  const isStorm = mode === "thunderstorm";

  const maxVal = Math.max(...data.map(d => d.value), 1);

  // Find peak index
  const peakIdx = data.reduce((best, d, i) => d.value > data[best].value ? i : best, 0);

  const chartTitle = isStorm
    ? "Thunderstorm Probability — Next 24 Hours"
    : isLightning
    ? "Lightning Activity — Next 6 Hours"
    : `${label} — 24 Hour Forecast`;

  const yLabel = isStorm ? "Probability (%)" : isLightning ? "Expected Activity" : label;

  return (
    <div className="wchart-card">
      <div className="wchart-header">
        <div className="wchart-title">{chartTitle}</div>
        <div className="wchart-sub">{yLabel}</div>
      </div>

      <div className="wchart-body">
        {/* Y-axis labels */}
        <div className="wchart-yaxis">
          {[100, 75, 50, 25, 0].map(v => (
            <span key={v} className="wchart-ylabel">{Math.round((v / 100) * maxVal)}</span>
          ))}
        </div>

        {/* Bars + line area */}
        <div className="wchart-area">
          {/* Grid lines */}
          {[75, 50, 25].map(p => (
            <div key={p} className="wchart-grid-line" style={{ bottom: `${p}%` }} />
          ))}

          {/* Bars */}
          <div className="wchart-bars">
            {data.map((d, i) => {
              const h = (d.value / maxVal) * 100;
              const isPeak = i === peakIdx;
              return (
                <div key={i} className="wchart-bar-col">
                  <div className="wchart-bar-wrap">
                    {isPeak && <div className="wchart-peak-badge">Peak</div>}
                    <div
                      className={`wchart-bar ${isPeak ? "wchart-bar--peak" : ""} ${isStorm ? "wchart-bar--storm" : ""} ${isLightning ? "wchart-bar--lightning" : ""}`}
                      style={{ height: `${h}%` }}
                    >
                      <span className="wchart-bar-val">{d.value}</span>
                    </div>
                  </div>
                  <div className="wchart-xlabel">{d.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
