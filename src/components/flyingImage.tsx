"use client";

import { useEffect, useState } from "react";

export default function FlyingImage() {
  const [position, setPosition] = useState({ x: "-40%", y: "50%" });
  const [transition, setTransition] = useState("none");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const flyAcross = () => {
      const audio = new Audio("/sounds/pirate.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {
        console.warn("Sound blocked until user interacts with the page");
      });

      const directions = ["left", "right", "top", "bottom"];
      const dir = directions[Math.floor(Math.random() * directions.length)];

      let start = { x: "0%", y: "0%" };
      let end = { x: "0%", y: "0%" };

      switch (dir) {
        case "left":
          start = { x: "-40%", y: `${Math.random() * 80 + 10}%` };
          end = { x: "140%", y: `${Math.random() * 80 + 10}%` };
          break;
        case "right":
          start = { x: "140%", y: `${Math.random() * 80 + 10}%` };
          end = { x: "-40%", y: `${Math.random() * 80 + 10}%` };
          break;
        case "top":
          start = { x: `${Math.random() * 80 + 10}%`, y: "-40%" };
          end = { x: `${Math.random() * 80 + 10}%`, y: "140%" };
          break;
        case "bottom":
          start = { x: `${Math.random() * 80 + 10}%`, y: "140%" };
          end = { x: `${Math.random() * 80 + 10}%`, y: "-40%" };
          break;
      }

      setTransition("none");
      setPosition(start);
      setIsVisible(true);

      setTimeout(() => {
        setTransition("all 5s linear");
        setPosition(end);
      }, 100);

      setTimeout(() => setIsVisible(false), 5200);
    };

    const interval = setInterval(flyAcross, Math.random() * 7000 + 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src="https://tinyurl.com/ugentsailingtransparent"
      alt="Flying logo"
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: "450px",
        pointerEvents: "none",
        opacity: isVisible ? 1 : 0.8,
        transition: transition,
        zIndex: 9999,
      }}
    />
  );
}

