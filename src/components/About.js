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
                I’m Ayush Srivastava, a UB Computer Science major who wrangles
                full-stack apps by day and racks up killstreaks in Call of Duty
                by night, usually with a superhero movie queued up for halftime.
                In my student-assistant position I’ve transformed clunky IT
                workflows into smooth, user-friendly web app, and I love
                swapping debugging war stories over coffee. Whether I’m
                architecting an AI meeting sidekick or debating which Spiderman
                suit looks best, I bring solid technical chops, a collaborative
                spirit, and just enough dry wit to keep the team smiling. If you
                need someone who can ship reliable code and still land the
                winning headshot then let’s connect!
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
