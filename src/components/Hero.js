import React, { useState, useEffect } from "react";
import Ironman from "../models/Ironman";
import Wolverine from "../models/Wolverine";
import Spiderman2099 from "../models/Spiderman2099";
import TerminalOverlay from "./TerminalOverlay";
import Hulk from "../models/Hulk";

export default function Hero() {
  const [termOpen, setTermOpen] = useState(false);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectedHero");
    setHero(saved);
  }, []);

  const modelMap = {
    Ironman: Ironman,
    Wolverine: Wolverine,
    Spiderman2099: Spiderman2099,
    Hulk: Hulk,
  };
  const variantMap = {
    Ironman: "danger",
    Wolverine: "warning",
    Spiderman2099: "primary",
    Hulk: "success",
  };

  const ChosenModel = modelMap[hero] || Ironman;
  const variant = variantMap[hero] || "danger";

  const handleNavigate = (sectionId) =>
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  const handleDownloadResume = () => {
    window.open("/Ayush_Resume.pdf", "_blank");
  };

  return (
    <>
      {/* Terminal */}
      <TerminalOverlay
        isOpen={termOpen}
        onClose={() => setTermOpen(false)}
        heroName={hero}
        onNavigate={handleNavigate}
        onDownloadResume={handleDownloadResume}
      />

      {/* Hero Section */}
      <div
        style={{ height: "90vh", marginTop: "3%" }}
        className="container col-xxl-8 px-4 py-5"
      >
        <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
          {/* 3D Model */}
          <ChosenModel />

          {/* Text + Buttons */}
          <div className="col-lg-6">
            <h1 className={`display-5 fw-bold lh-1 mb-3 text-${variant}`}>
              Ayush Srivastava
            </h1>
            <p className="text-light my-4">
              The Code Guardian & your friendly neighbourhood developer!
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className={`btn btn-${variant} btn-sm px-4`}
                onClick={() => setTermOpen(true)}
              >
                Enter Terminal &gt;_
              </button>
              <button
                type="button"
                className={`btn btn-${variant} btn-sm px-4`}
                onClick={() => {
                  localStorage.removeItem("selectedHero");
                  window.location.reload();
                }}
              >
                Change Character
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
