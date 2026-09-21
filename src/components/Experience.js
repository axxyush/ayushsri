import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Software Engineering Intern",
    organization: "Linde Gas & Equipment",
    dates: "May 2026 – Present",
    location: "Buffalo, NY",
    bulletPoints: [
      "Migrated legacy Gas Tracking app to React & .NET, redesigning UI/UX and digitizing & automating core workflows.",
      "Unified 10+ SAP EDI cert-processing repos into a single app, reducing per-client codebases to one for shared feature deploys.",
      "Prototyped OCR pipeline to extract cylinder data from photos to replace manual entry for 200+ cylinders/day.",
      "Automated Accustar & Sentry ticket processing via custom API, eliminating a ~10 min manual step per ticket across 400+ tickets/month.",
    ],
  },
  {
    title: "Technical Student Assistant",
    organization: "CAS Educational Technology, University at Buffalo",
    dates: "Nov 2024 – May 2026",
    location: "Buffalo, NY",
    bulletPoints: [
      "Built CompInfo, a PostgreSQL based asset management system featuring history logging, Excel import/export, and real-time inventory tracking for 2,500+ devices, reducing lookup time by 90%.",
      "Deployed 80+ workstations (imaging, software & hardware setup) supporting faculty/staff onboarding across departments.",
      "Debugged & resolved 250+ tickets, including software crashes and hardware failures.",
    ],
  },
  {
    title: "DREAM Lab Apprentice",
    organization:
      "School of Engineering and Applied Sciences, University at Buffalo",
    dates: "Jan 2025 – Apr 2025",
    location: "Buffalo, NY",
    bulletPoints: [
      "Built 5+ hardware-software projects using Arduino, SolidWorks & 3D printing, meeting all design specifications.",
      "Mentored 40+ peers through coding fundamentals workshops/events, helping them develop mini-projects.",
      "Completed 4-modules creating ESP32 robot project, earning SEAS Maker Badge for final presentation.",
    ],
  },
  {
    title: "Undergraduate Research Assistant",
    organization: "Embedded Sensing and Computing Lab, University at Buffalo",
    dates: "Jul 2024 – Dec 2024",
    location: "Buffalo, NY",
    bulletPoints: [
      "Developed the frontend for Vocal Lens, a tool detecting Specific Language Impairment in children through voice analysis, cutting diagnosis time by 75%.",
      "Built and iterated on the UI through multiple rounds of testing and feedback from 20+ users, improving usability scores by 30%.",
      "Built AuspexMedix & ESC group webpage, enhancing research collaboration and boosting online visibility.",
    ],
  },
  {
    title: "Social Media Intern",
    organization: "Honors College, University at Buffalo",
    dates: "Aug 2024 – May 2025",
    location: "Buffalo, NY",
    bulletPoints: [
      "Developed content strategies that increased engagement by 45% for UB Honors College social media platforms.",
      "Worked collaboratively with a team of 2 to create content and support 20+ Honors events.",
    ],
  },
  {
    title: "Student Leader",
    organization: "Elli, UB Campus Dining and Shops",
    dates: "Jan 2024 – Nov 2024",
    location: "Buffalo, NY",
    bulletPoints: [
      "Trained 30+ new employees and managed daily operations to ensure smooth service delivery.",
      "Handled high-pressure situations, resolving conflicts and ensuring excellent service for 200+ customers daily while maintaining a welcoming and policy-compliant environment.",
      "Oversaw a diverse team of 5-7 members, ensuring adherence to policies and efficient teamwork.",
    ],
  },
];

function Experience() {
  const [hero, setHero] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);

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
    <div
      id="experience"
      className="d-flex justify-content-center"
      style={{ backgroundColor: "#e9ededff" }}
    >
      <div className="px-4 py-5 bg-transparent d-flex justify-content-center">
        <div style={{ width: "80vw" }}>
          <h1 className="display-5 fw-bold text-body-emphasis m-5 lh-1 text-center">
            <i className={`fa-solid fa-briefcase text-${variant}`} /> Work
            Experience
          </h1>
          <p className="mb-5 text-center">
            Professional roles and apprenticeships that have shaped my technical
            expertise and collaborative skills
          </p>
          {experiences.map((experience, index) => {
            const isOpen = openIndex === index;
            const hoverColor = `var(--bs-${variant})`;
            const rgbVar = `var(--bs-${variant}-rgb)`;
            const hexVar = `var(--bs-${variant})`;

            return (
              <div
                key={`${experience.title}-${experience.dates}`}
                style={{
                  width: "100%",
                  "--card-hover-border-color": hexVar,
                  "--card-hover-rgb": rgbVar,
                }}
                className="card mb-3 p-2"
              >
                <div className="card-body">
                  <button
                    type="button"
                    className="experience-toggle w-100 border-0 bg-transparent p-0 text-start"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-start gap-2">
                      <div className="flex-grow-1">
                        <h5
                          style={{
                            "--experience-title-hover-color": hoverColor,
                          }}
                          className="h5 fw-bold text-dark experience-title mb-0"
                        >
                          {experience.title}
                          <i
                            className={`fa-solid fa-chevron-${
                              isOpen ? "up" : "down"
                            } ms-2 small text-${variant}`}
                          />
                        </h5>
                        <div className="text-dark my-2">
                          <span>
                            <i>{experience.organization}</i>
                          </span>
                        </div>
                        <div className="d-flex align-items-center my-2 gap-2 text-secondary">
                          <i
                            className={`fa-solid fa-location-dot text-${variant}`}
                          />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                      <span className={`badge bg-${variant} text-white my-2`}>
                        {experience.dates}
                      </span>
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: "hidden" }}
                  >
                    <ul className="card-text my-3">
                      {experience.bulletPoints.map((point, i) => (
                        <li key={i}>
                          <span className="text-secondary">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Experience;
