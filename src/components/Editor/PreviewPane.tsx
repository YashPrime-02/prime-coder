// src/components/Playground/PreviewPane.tsx
import React from "react";

import './EditorLayout.css';


type PreviewPaneProps = {
  srcDoc: string;
};

const PreviewPane: React.FC<PreviewPaneProps> = ({ srcDoc }) => {
  return (
    <div className="preview-pane">
      <iframe
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        title="output"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default PreviewPane;
