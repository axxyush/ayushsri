import React from "react";
import { Html, useProgress } from "@react-three/drei";

/** In-canvas premium skeleton while the GLTF streams in. */
export default function ModelLoader({ color = "#ef4444" }) {
  const { progress, active } = useProgress();
  const pct = active ? Math.min(100, Math.round(progress)) : 100;

  return (
    <Html center>
      <div className="model-loader" style={{ "--loader-accent": color }}>
        <div className="model-loader-ring" />
        <div className="model-loader-label">Assembling suit</div>
        <div className="model-loader-bar">
          <div className="model-loader-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="model-loader-pct">{pct}%</div>
      </div>
    </Html>
  );
}
