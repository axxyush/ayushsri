import "./App.css";
import React, { useState, useEffect } from "react";
import About from "./components/About";
import Arsenal from "./components/Arsenal";
// import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer1 from "./components/Footer1";
import Footer2 from "./components/Footer2";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import CharacterSelector from "./components/CharacterSelector";
// import JarvisChat from "./components/JarvisChat";
import { Toaster } from "react-hot-toast";
import Jarvis from "./components/Jarvis";

function App() {
  const [hero, setHero] = useState(null);
  useEffect(() => {
    // read saved hero on first render
    const saved = localStorage.getItem("selectedHero");
    if (saved) setHero(saved);
  }, []);

  const handleSelectHero = (heroName) => {
    localStorage.setItem("selectedHero", heroName);
    setHero(heroName);
  };
  if (!hero) {
    return <CharacterSelector onSelect={handleSelectHero} />;
  }
  return (
    <>
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
