import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import * as Babel from "@babel/standalone";
import confetti from "canvas-confetti";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../assets/Logos/PRIME_CODER.png";

import TabSwitcher from "./TabSwitcher";
import CodeEditor from "./CodeEditor";
import PreviewPane from "./PreviewPane";
import Toolbar from "./Toolbar";
import { initialCodes, languages } from "./Templates";
import musicPath from '../../assets/Sounds/Music.mp3';

import "./EditorLayout.css";

export default function Playground() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [activeTab, setActiveTab] = useState("html");
  const [code, setCode] = useState(initialCodes);
  const [previewSrc, setPreviewSrc] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // ⏰ Update Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 🌌 Vanta Background
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



// Define your backgrounds and quotes
const backgroundStyles = [
  "linear-gradient(to right, #ff5f6d, #ffc371)",
  "linear-gradient(to right, #00c6ff, #0072ff)",
  "linear-gradient(to right, #f7971e, #ffd200)",
  "linear-gradient(to right, #4facfe, #00f2fe)",
  "linear-gradient(to right, #7F00FF, #E100FF)",
  "#1a1a2e",
  "#16213e",
];

const motivationalQuotes = [
  "You’re coding your future, one line at a time.",
  "Every error is a step closer to mastery.",
  "Stay focused. Stay building.",
  "Great things take time – just like great code.",
  "Push yourself. You're almost there.",
  "404: Motivation not found... just kidding, KEEP GOING!",
  "Debugging is just your brain having a staring contest with code.",
  "You’ve got more potential than uninitialized variables.",
  "Legends were once beginners who never quit.",
  "Your hustle > your bugs.",
];
function triggerZenMode() {
  // 1. Confetti
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });

  // 2. Show motivational toast
  const randomQuote =
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  toast.success(randomQuote, {
    duration: 9000,
    position: "top-center",
    style: {
      background: "#111",
      color: "#0f0",
      fontSize: "1rem",
      zIndex: 999999,
    },
    className: "zen-toast",
  });

  // 3. Change background randomly
  const randomBackground =
    backgroundStyles[Math.floor(Math.random() * backgroundStyles.length)];
  document.body.style.background = randomBackground;

  // 4. Play music
const zenMusic = new Audio(musicPath);
zenMusic.volume = 1.0;
zenMusic.play().catch((err) => {
  console.warn("Audio playback failed:", err);
});
}



  // ▶️ Run Handler
  const handleRun = () => {
    let finalHtml = "";

    if (activeTab === "jsx" || activeTab === "tsx") {
      try {
        const match = code[activeTab].match(/document\.getElementById\s*\(\s*['"`](.*?)['"`]\s*\)/);
        const rootId = match?.[1] || "root";

        const cleanCode = code[activeTab].replace(/import .* from .*\n?/g, "");

        const transformed = Babel.transform(cleanCode, {
          filename: activeTab === "tsx" ? "file.tsx" : "file.jsx",
          presets: activeTab === "tsx" ? ["typescript", "react"] : ["react"],
        }).code;

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

  // 🔁 Reset Handler
  const handleReset = () => {
    setCode(initialCodes);
    setPreviewSrc("");
  };

  
  return (
  <div ref={vantaRef} className="playground-wrapper responsive-playground">
  <div className="editor-container responsive-editor">
    <h1 className="prime-heading responsive-heading">PRIME CODER</h1>
    <p className="prime-subheading responsive-subheading">Craft, Compile, Create.</p>

    <TabSwitcher
      languages={languages}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />

    <div className="editor-preview-row responsive-editor-row">
      <CodeEditor activeTab={activeTab} code={code} setCode={setCode} />
      <Toolbar handleRun={handleRun} handleReset={handleReset} />
      <PreviewPane srcDoc={previewSrc} />
    </div>

    <div className="zen-mode-wrapper responsive-zen">
      <button className="zen-mode-btn" onClick={triggerZenMode}>
        🧘 ZEN MODE
      </button>
    </div>

  </div>

  {/* 👇 Floating UI Layer - CLOCK + TOAST */}
  <div className="floating-ui responsive-floating">
    <div className="clock responsive-clock">{currentTime}</div>
    <ToastContainer
      toastClassName="motivation-toast"
      bodyClassName=""
      closeButton={false}
    />
  </div>
</div>

);

  
}
