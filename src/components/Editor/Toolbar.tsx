// src/components/Playground/Toolbar.tsx
import React from "react";

import './EditorLayout.css';


type ToolbarProps = {
  handleRun: () => void;
  handleReset: () => void;
};

const Toolbar: React.FC<ToolbarProps> = ({ handleRun, handleReset }) => {
  return (
    <div className="toolbar">
      <button className="run-btn" onClick={handleRun}>▶ Run</button>
      <button className="reset-btn" onClick={handleReset}>⟳ Reset</button>
    </div>
  );
};

export default Toolbar;
