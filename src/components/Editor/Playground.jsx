// src/components/Editor/Playground.jsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import './EditorLayout.css';

export default function Playground() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      const effect = NET({
        el: vantaRef.current,
        THREE: THREE,
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

  return (
    <div ref={vantaRef} className="playground-wrapper">
      <div className="editor-container">
        <h1 style={{ color: "white", textAlign: "center" }}>PRIME CODER</h1>
        {/* Add Editor components here */}
      </div>
    </div>
  );
}
