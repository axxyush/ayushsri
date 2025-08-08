import React, { useState, useEffect } from "react";

const ExperienceCard = ({
  title,
  organization,
  dates,
  location,
  bulletPoints,
  variant,
}) => {
  const hoverColor = `var(--bs-${variant})`;
  const rgbVar = `var(--bs-${variant}-rgb)`;
  const hexVar = `var(--bs-${variant})`;
  return (
    <div
      style={{
        width: "100%",
        "--card-hover-border-color": hexVar,
        "--card-hover-rgb": rgbVar,
      }}
      className="card mb-3 p-2"
    >
      <div className="card-body">
        <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-start gap-2">
          <div className="flex-grow-1">
            <h5
              style={{ "--experience-title-hover-color": hoverColor }}
              className="h5 fw-bold text-dark experience-title"
            >
              {title}
            </h5>
            <div className="text-dark my-2">
              <span>
                <i>{organization}</i>
              </span>
            </div>
            <div className="d-flex align-items-center my-2 gap-2 text-secondary">
              <i className={`fa-solid fa-location-dot text-${variant}`} />
              <span>{location}</span>
            </div>
          </div>
          <span className={`badge bg-${variant} text-white my-2`}>{dates}</span>
        </div>
        <ul className="card-text my-3">
          {bulletPoints.map((point, index) => (
            <li key={index}>
              <span className="text-secondary">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function Experience() {
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

  const experiences = [
    {
      title: "Student Assistant",
      organization: "CASet Information Technology Node, University at Buffalo",
      dates: "Nov 2024 – Present",
      location: "Buffalo, NY",
      bulletPoints: [
        "Developed CompInfo Asset Management Tool using PostgreSQL, tracking 1500+ computers, reducing historical data retrieval time by 90%.",
        "Deployed 60+ computers by imaging, installing OS, and configuring software to support faculty and staff.",
        "Resolved 100+ work orders in a dynamic environment by diagnosing & repairing hardware issues, achieving 90% customer satisfaction while collaborating with expert technologists.",
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
      organization:
        "Embedded Sensing and Computing Group, University at Buffalo",
      dates: "Jul 2024 – Dec 2024",
      location: "Buffalo, NY",
      bulletPoints: [
        "Led Web Application development of VocalLens, reducing speech-impairment diagnosis time by 75%, replacing doctor visits with a single voice-based software assessment.",
        "Increased user feedback scores of VocalLens by 30% by designing responsive UI/UX, tested by 30+ users.",
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

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ backgroundColor: "#e9ededff" }}
      >
        <div className="px-4 py-5 bg-transparent d-flex justify-content-center">
          <div style={{ width: "80vw" }} className="">
            <h1 className="display-5 fw-bold text-body-emphasis m-5 lh-1 text-center">
              <i className={`fa-solid fa-briefcase text-${variant}`} /> Work
              Experience
            </h1>
            <p className="mb-5 text-center">
              Professional roles and apprenticeships that have shaped my
              technical expertise and collaborative skills
            </p>
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} variant={variant} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Experience;
