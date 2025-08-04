import React, { useState, useEffect } from "react";

function Navbar() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectedHero");
    setHero(saved);
  }, []);

  const variantMap = {
    Ironman: "danger",
    Wolverine: "warning",
    Spiderman2099: "primary",
    Hulk: "success",
  };

  const variant = variantMap[hero] || "danger";

  return (
    <>
      <nav className="navbar sticky-top bg-body-none navbar-dark">
        <div className="container-fluid d-flex justify-content-around p-1">
          <a
            style={{
              "--nav-title-hover-color": `var(--bs-${variant})`,
            }}
            className="text-decoration-none navbar-text"
            href="/"
          >
            <b>Ayush</b>
          </a>
          <a
            style={{
              "--nav-title-hover-color": `var(--bs-${variant})`,
            }}
            className="text-decoration-none navbar-text"
            href="#contact"
          >
            <b>Contact</b>
          </a>
          <a
            className="text-decoration-none navbar-text"
            aria-current="page"
            href="/Ayush_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              "--nav-title-hover-color": `var(--bs-${variant})`,
            }}
          >
            <b>Resume</b>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
