// src/components/Playground/Playground.tsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import * as Babel from "@babel/standalone";

import TabSwitcher from "./TabSwitcher";
import CodeEditor from "./CodeEditor";
import PreviewPane from "./PreviewPane";
import Toolbar from "./Toolbar";
import { initialCodes, languages } from "./Templates";

import "./EditorLayout.css";

export default function Playground() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [activeTab, setActiveTab] = useState("html");
  const [code, setCode] = useState(initialCodes);
  const [previewSrc, setPreviewSrc] = useState("");

  // Vanta background
  useEffect(() => {
    if (!vantaEffect) {
      const effect = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        color: 0x0ff,
        backgroundColor: 0x0a0a0a,
      });
      setVantaEffect(effect);
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Run handler
const handleRun = () => {
  let finalHtml = "";

  if (activeTab === "jsx" || activeTab === "tsx") {
    try {
      const match = code[activeTab].match(/document\.getElementById\s*\(\s*['"`](.*?)['"`]\s*\)/);
      const rootId = match?.[1] || "root";

      // ⛔️ Remove import statements — Babel must handle JSX and React.createElement
      const cleanCode = code[activeTab].replace(/import .* from .*\n?/g, "");

      // ✅ Babel transform (without imports, with presets)
      const transformed = Babel.transform(cleanCode, {
        filename: activeTab === "tsx" ? "file.tsx" : "file.jsx",
        presets: activeTab === "tsx"
          ? ["typescript", "react"]
          : ["react"],
      }).code;

      // ✅ Compose preview HTML
      finalHtml = `
        <html>
          <head>
            <meta charset="UTF-8" />
            <style>${code.css}</style>
            <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
          </head>
          <body>
            <div id="${rootId}"></div>
            <script>
              try {
                ${transformed}
              } catch (err) {
                document.body.innerHTML = '<pre style="color:red;">Runtime Error: ' + err + '</pre>';
              }
            </script>
          </body>
        </html>
      `;
    } catch (err) {
      finalHtml = `
        <html>
          <body>
            <pre style="color:red;">Babel Compile Error: ${err}</pre>
          </body>
        </html>
      `;
    }
  } else {
    // HTML/JS Mode
    finalHtml = `
      <html>
        <head>
          <style>${code.css}</style>
        </head>
        <body>
          ${code.html}
          <script>${code.js}</script>
        </body>
      </html>
    `;
  }

  setPreviewSrc(finalHtml);
};

  // Reset handler
  const handleReset = () => {
    setCode(initialCodes);
    setPreviewSrc(""); // Optional: also clear preview
  };

  return (
    <div ref={vantaRef} className="playground-wrapper">
      <div className="editor-container">
        <h1 className="prime-heading">PRIME CODER</h1>
        <p className="prime-subheading">Craft, Compile, Create.</p>

        <TabSwitcher
          languages={languages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="editor-preview-row">
          <CodeEditor
            activeTab={activeTab}
            code={code}
            setCode={setCode}
          />

          <Toolbar
            handleRun={handleRun}
            handleReset={handleReset}
          />

          <PreviewPane srcDoc={previewSrc} />
        </div>
      </div>
    </div>
  );
}
