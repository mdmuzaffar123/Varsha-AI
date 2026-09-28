import React from "react";
import { CATEGORY_TABS } from "../../data/compareData";
import "./CategoryTabs.css";

export default function CategoryTabs({ activeTab, onTabChange }) {
  return (
    <div className="category-tabs-bar">
      {CATEGORY_TABS.map((tab) => (
        <button
          key={tab.id}
          className={`ct-tab-btn ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
