import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const skillData = [
  {
    category: "Languages",
    skills: [
      { name: "Java", icon: "fa-brands fa-java", proficiency: 90 },
      { name: "Python", icon: "fa-brands fa-python", proficiency: 90 },
      { name: "C / C++", icon: "fa-solid fa-c", proficiency: 85 },
      { name: "C#", icon: "fa-solid fa-hashtag", proficiency: 85 },
      { name: "JavaScript", icon: "fa-brands fa-js", proficiency: 95 },
      { name: "TypeScript", icon: "fa-solid fa-code", proficiency: 90 },
      { name: "OCaml", icon: "fa-solid fa-terminal", proficiency: 75 },
    ],
  },
  {
    category: "Frameworks & Tools",
    skills: [
      { name: "React", icon: "fa-brands fa-react", proficiency: 95 },
      { name: ".NET", icon: "fa-solid fa-server", proficiency: 85 },
      { name: "Node.js", icon: "fa-brands fa-node", proficiency: 90 },
      { name: "Express", icon: "fa-solid fa-route", proficiency: 90 },
      { name: "FastAPI", icon: "fa-solid fa-bolt", proficiency: 85 },
      { name: "Docker", icon: "fa-brands fa-docker", proficiency: 80 },
      { name: "Git", icon: "fa-solid fa-code-branch", proficiency: 95 },
      { name: "Postman", icon: "fa-solid fa-paper-plane", proficiency: 95 },
      { name: "CI/CD", icon: "fa-solid fa-gears", proficiency: 80 },
      { name: "GCP", icon: "fa-brands fa-google", proficiency: 75 },
      { name: "Azure", icon: "fa-brands fa-microsoft", proficiency: 75 },
      { name: "RunPod", icon: "fa-solid fa-cloud", proficiency: 80 },
      { name: "Supabase", icon: "fa-solid fa-database", proficiency: 80 },
    ],
  },
  {
    category: "Core Competencies",
    skills: [
      { name: "RESTful APIs", icon: "fa-solid fa-plug", proficiency: 95 },
      { name: "JWT Auth", icon: "fa-solid fa-key", proficiency: 90 },
      { name: "Agile / Scrum", icon: "fa-solid fa-users", proficiency: 90 },
      {
        name: "Computer Architecture",
        icon: "fa-solid fa-microchip",
        proficiency: 85,
      },
      {
        name: "Security-first Dev",
        icon: "fa-solid fa-shield-halved",
        proficiency: 85,
      },
    ],
  },
];

function Arsenal() {
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
      <section
        id="skills"
        style={{ backgroundColor: "#e9ededff" }}
        className="py-5"
      >
        <div className="container px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center display-4 fw-bold text-dark mb-5"
          >
            <i className={`fa-solid fa-gun text-${variant}`} /> Arsenal
          </motion.h2>
          {skillData.map((categoryData, index) => (
            <div key={index} className="mb-5">
              <h5 className="h5 text-center m-3">
                <b>{categoryData.category}</b>
              </h5>
              <div className="d-flex justify-content-center flex-wrap gap-3">
                {categoryData.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: skillIndex * 0.1,
                    }}
                    className="card text-center p-3 gap-2 col-sm-3 col-md-3 col-lg-2"
                    style={{
                      "--card-hover-border-color": `var(--bs-${variant})`,
                    }}
                  >
                    <div
                      className={`circle d-flex align-items-center justify-content-center rounded-circle bg-${variant} bg-opacity-10`}
                      style={{
                        height: "60px",
                        width: "60px",
                        margin: "0 auto",
                      }}
                    >
                      <i className={`${skill.icon} fa-2xl text-${variant}`} />
                    </div>
                    <b>{skill.name}</b>
                    <div className="progress">
                      <div
                        className={`progress-bar progress-bar-striped progress-bar-animated bg-${variant}`}
                        role="progressbar"
                        aria-valuenow={skill.proficiency}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Arsenal;
