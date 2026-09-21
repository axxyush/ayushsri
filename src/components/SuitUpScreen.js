import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import { DefaultLoadingManager } from "three";
import ironman from "../images/ironman.png";
import wolverine from "../images/wolverine.png";
import spiderman2099 from "../images/spiderman2099.png";
import hulk from "../images/hulk.png";

const HERO_META = {
  Ironman: {
    label: "Iron Man",
    img: ironman,
    color: "#ef4444",
    model: "/3Dmodels/3Dironman/scene.gltf",
    line: "Arc reactor online. Suit assembling…",
  },
  Wolverine: {
    label: "Wolverine",
    img: wolverine,
    color: "#eab308",
    model: "/3Dmodels/3Dwolverine/scene.gltf",
    line: "Adamantium locked. Claws coming out…",
  },
  Spiderman2099: {
    label: "Spider-Man 2099",
    img: spiderman2099,
    color: "#3b82f6",
    model: "/3Dmodels/3Dspiderman2099/scene.gltf",
    line: "Synching timelines. Webs charging…",
  },
  Hulk: {
    label: "Hulk",
    img: hulk,
    color: "#22c55e",
    model: "/3Dmodels/3Dhulk/scene.gltf",
    line: "Anger management optional. Suiting up…",
  },
};

export default function SuitUpScreen({ heroId, onComplete }) {
  const meta = HERO_META[heroId] || HERO_META.Ironman;
  const [progress, setProgress] = useState(8);
  const [status, setStatus] = useState(meta.line);

  useEffect(() => {
    let cancelled = false;
    let finished = false;

    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      setProgress(100);
      setStatus("Guardian protocol ready.");
      setTimeout(() => {
        if (!cancelled) onComplete();
      }, 500);
    };

    setStatus(meta.line);
    setProgress(8);

    const prevProgress = DefaultLoadingManager.onProgress;
    const prevLoad = DefaultLoadingManager.onLoad;
    const prevError = DefaultLoadingManager.onError;

    DefaultLoadingManager.onProgress = (url, loaded, total) => {
      if (typeof prevProgress === "function") prevProgress(url, loaded, total);
      if (!total) return;
      const pct = Math.min(92, Math.round((loaded / total) * 100));
      setProgress((p) => Math.max(p, pct));
    };
    DefaultLoadingManager.onLoad = () => {
      if (typeof prevLoad === "function") prevLoad();
      finish();
    };
    DefaultLoadingManager.onError = (url) => {
      if (typeof prevError === "function") prevError(url);
      // Still enter the site even if the model fails
      finish();
    };

    try {
      useGLTF.preload(meta.model);
    } catch {
      finish();
    }

    // Keep the boot sequence feeling intentional even on cache hits
    const minTime = setTimeout(finish, 1600);
    const nudge = setInterval(() => {
      setProgress((p) => (p < 85 ? p + 3 : p));
    }, 180);

    return () => {
      cancelled = true;
      clearTimeout(minTime);
      clearInterval(nudge);
      DefaultLoadingManager.onProgress = prevProgress;
      DefaultLoadingManager.onLoad = prevLoad;
      DefaultLoadingManager.onError = prevError;
    };
  }, [heroId, meta.line, meta.model, onComplete]);

  return (
    <div className="suitup-screen">
      <motion.div
        className="suitup-glow"
        style={{ background: meta.color }}
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.08, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={meta.img}
        alt={meta.label}
        className="suitup-portrait"
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      />
      <motion.h2
        className="suitup-title"
        style={{ color: meta.color }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {meta.label}
      </motion.h2>
      <p className="suitup-status">{status}</p>
      <div className="suitup-bar">
        <motion.div
          className="suitup-bar-fill"
          style={{ background: meta.color, width: `${progress}%` }}
        />
      </div>
      <div className="suitup-pct">{Math.round(progress)}%</div>
    </div>
  );
}
