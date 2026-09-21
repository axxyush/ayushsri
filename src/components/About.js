import React, { useState, useEffect } from "react";
import ayushImg from "../images/ayushImg.png";

function About() {
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
      <div id="about" style={{ backgroundColor: "#e9ededff" }}>
        <div
          style={{ backgroundColor: "white" }}
          className="container col-xxl-8 px-4 py-5 bg-transparent"
        >
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-lg-6">
              <h1 className="display-6 fw-bold text-body-emphasis lh-1">
                About the Guardian
              </h1>
              <div className={`line mb-3 text-${variant}`}>
                <b>____________</b>
              </div>
              <p className="">
                I love to code and I love plants. 4x hackathon winner across
                Stanford, MIT, Carnegie Mellon, and UCLA. Right now I&apos;m
                interning at Linde, where I&apos;m automating workflows and
                digitizing old processes.
              </p>
              <p className="">
                Outside of code, I grow bonsai. Currently working on a honey
                locust cutting and a Schefflera arboricola and I whittle when I
                want to work with my hands instead of a keyboard. I&apos;m also
                into philosophy, and I&apos;m slowly working on a book. And when
                I&apos;m not building or growing something, I&apos;m probably
                watching a movie.
              </p>
            </div>
            <div className="col-10 col-sm-8 col-lg-6">
              <div className="preview-container">
                <div className="preview-frame">
                  <div className={`inner-circle border-${variant}`}>
                    <img
                      src={ayushImg}
                      className="d-block mx-lg-auto img-fluid"
                      loading="lazy"
                      alt="Ayush Srivastava"
                    />
                  </div>

                  <div className={`corner top-left border-${variant}`} />
                  <div className={`corner bottom-right border-${variant}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
