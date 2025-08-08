import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Loader.css';
import logo from "../../assets/Logos/PRIME_CODER.png";

const tips = [
  "Initializing PRIME CODER environment...",
  "Loading React components with ⚛️ precision...",
  "Binding Angular modules with ✨ directives...",
  "Injecting TypeScript types into the matrix...",
  "Structuring semantic HTML5 elements...",
  "Initialising Live Preview ...",

];

// Constants for timing
const CHAR_TYPING_SPEED = 40; // ms per character
const TIP_HOLD_TIME = 1600;   // ms pause after each full tip

export default function Loader() {
  const [tipIndex, setTipIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const navigate = useNavigate();

  const totalLoaderDuration = tips.reduce(
    (acc, tip) => acc + (tip.length * CHAR_TYPING_SPEED + TIP_HOLD_TIME),
    0
  );

  useEffect(() => {
    let charIndex = 0;
    let interval;

    const currentTip = tips[tipIndex];

    interval = setInterval(() => {
      if (charIndex < currentTip.length) {
        setDisplayedText(currentTip.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDisplayedText("");
          setTipIndex((prev) => (prev + 1) % tips.length);
        }, TIP_HOLD_TIME);
      }
    }, CHAR_TYPING_SPEED);

    return () => clearInterval(interval);
  }, [tipIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/playground");
    }, totalLoaderDuration);

    return () => clearTimeout(timer);
  }, [navigate, totalLoaderDuration]);

  return (
    <div className="loader-screen">
      <div className="loader-glow glow-1" />
      <div className="loader-glow glow-2" />

      <div className="loader-wrapper">
        <img src={logo} alt="Logo" className="loader-logo" />
        <div className="loader-spinner"></div>
        <p className="loader-tip">{displayedText}</p>
      </div>
    </div>
  );
}
