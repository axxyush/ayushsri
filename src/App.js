import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import About from "./components/About";
import Arsenal from "./components/Arsenal";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer1 from "./components/Footer1";
import Footer2 from "./components/Footer2";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import CharacterSelector from "./components/CharacterSelector";
import SuitUpScreen from "./components/SuitUpScreen";
import CursorTrail from "./components/CursorTrail";
import { Toaster } from "react-hot-toast";
import Jarvis from "./components/Jarvis";

function App() {
  const [hero, setHero] = useState(null);
  const [bootingHero, setBootingHero] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectedHero");
    if (saved) setHero(saved);
  }, []);

  const handleSelectHero = (heroName) => {
    setBootingHero(heroName);
  };

  const finishBoot = useCallback(() => {
    if (!bootingHero) return;
    localStorage.setItem("selectedHero", bootingHero);
    setHero(bootingHero);
    setBootingHero(null);
  }, [bootingHero]);

  if (bootingHero) {
    return <SuitUpScreen heroId={bootingHero} onComplete={finishBoot} />;
  }

  if (!hero) {
    return <CharacterSelector onSelect={handleSelectHero} />;
  }

  return (
    <>
      <CursorTrail hero={hero} />
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Arsenal />
      <Jarvis />
      <Footer1 />
      <Footer2 />
      <Toaster />
    </>
  );
}

export default App;
