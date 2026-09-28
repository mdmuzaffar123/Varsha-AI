import { Target, Shield, BarChart2, Heart } from "lucide-react";
import { impactBannerPoints } from "../../data/homeData";
import heroBg from "../../assets/images/hero_bg.jpg";
import "./ImpactBanner.css";

const iconMap = [Target, Shield, BarChart2, Heart];

export default function ImpactBanner() {
  return (
    <section className="banner-section" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="banner-overlay" />
      <div className="container banner-inner">
        <h2 className="banner-title">Empowering a Climate-Resilient India</h2>
        <div className="banner-points">
          {impactBannerPoints.map((p, i) => {
            const Icon = iconMap[i];
            return (
              <div key={i} className="banner-point">
                <div className="banner-icon"><Icon size={20} /></div>
                <div>
                  <div className="banner-pt-title">{p.title}</div>
                  <div className="banner-pt-sub">{p.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
