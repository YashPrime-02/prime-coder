// src/components/Playground/TabSwitcher.tsx
import React from "react";

import './EditorLayout.css';


type TabSwitcherProps = {
  languages: string[];
  activeTab: string;
  setActiveTab: (lang: string) => void;
};

const TabSwitcher: React.FC<TabSwitcherProps> = ({ languages, activeTab, setActiveTab }) => {
  return (
    <div className="tab-switcher">
      {languages.map((lang) => (
        <button
          key={lang}
          className={`tab-btn ${activeTab === lang ? "active" : ""}`}
          onClick={() => setActiveTab(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
