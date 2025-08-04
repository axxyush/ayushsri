import React, { useState, useEffect } from "react";

function Education() {
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
      <div
        className="p-5 d-flex justify-content-center"
        style={{ backgroundColor: "white" }}
      >
        <div className="edu-card p-5">
          <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-start gap-3">
            <div className="flex-grow-1">
              <div className="mb-3">
                <h3 className="h3 fw-bold text-dark">
                  University at Buffalo, The State University of New York
                </h3>

                <div className="d-flex align-items-center gap-2 text-secondary">
                  <i
                    className={`fa-notdog fa-solid fa-location-dot text-${variant}`}
                  ></i>
                  <span>Buffalo, NY</span>
                </div>

                <div className="mt-2">
                  <p className="h5 fw-medium text-dark">
                    Bachelor's in Computer Science
                  </p>

                  <p className="text-secondary fst-italic">
                    Specialization: Software Development <br />
                  </p>

                  <div className="d-flex align-items-center gap-2 text-dark">
                    <i className={`fa-award fa-solid text-${variant}`} />
                    <span className="fw-medium">Cum GPA: 3.7/4.0</span>
                  </div>
                  <div className="mt-3">
                    <p className="fw-small text-dark">Relevant Coursework:</p>
                    <ul className="list-unstyled d-flex flex-wrap gap-2">
                      <li className="badge bg-secondary text-white">
                        Data Structures
                      </li>
                      <li className="badge bg-secondary text-white">
                        Algorithms
                      </li>
                      <li className="badge bg-secondary text-white">
                        System Design
                      </li>
                      <li className="badge bg-secondary text-white">
                        Web Development
                      </li>
                      <li className="badge bg-secondary text-white">
                        Computer Architecture
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 text-secondary text-lg-end">
              <i className={`fa-solid fa-calendar-days text-${variant}`} />
              <span className="fw-medium">Expected May 2027</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Education;
