import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const skillData = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: "fa-brands fa-react", proficiency: 90 },
      { name: "JavaScript (ES6+)", icon: "fa-brands fa-js", proficiency: 90 },
      { name: "Next.js", icon: "fa-brands fa-node", proficiency: 85 },
      { name: "CSS", icon: "fa-brands fa-css3", proficiency: 90 },
      { name: "HTML", icon: "fa-brands fa-html5", proficiency: 95 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: "fa-brands fa-node", proficiency: 90 },
      { name: "Express", icon: "fa-solid fa-route", proficiency: 90 },
      { name: "Python", icon: "fa-brands fa-python", proficiency: 80 },
      { name: "PostgreSQL", icon: "fa-solid fa-database", proficiency: 70 },
      { name: "MongoDB", icon: "fa-solid fa-leaf", proficiency: 90 },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      {
        name: "Git & GitHub",
        icon: "fa-solid fa-code-branch",
        proficiency: 95,
      },
      { name: "Docker", icon: "fa-brands fa-docker", proficiency: 70 },
      { name: "Cursor.ai", icon: "fa-solid fa-terminal", proficiency: 90 },
      { name: "Postman", icon: "fa-solid fa-paper-plane", proficiency: 95 },
      { name: "SolidWorks", icon: "fa-solid fa-shapes", proficiency: 90 },
      { name: "Render", icon: "fa-solid fa-cloud", proficiency: 90 },
      { name: "Vercel", icon: "fa-solid fa-cloud-arrow-up", proficiency: 90 },
    ],
  },
  {
    category: "Superpowers",
    skills: [
      { name: "Problem Solving", icon: "fa-solid fa-brain", proficiency: 97 },
      { name: "Code Architecture", icon: "fa-solid fa-code", proficiency: 94 },
      { name: "Project Management", icon: "fa-solid fa-gear", proficiency: 91 },
      {
        name: "Team Collaboration",
        icon: "fa-solid fa-users",
        proficiency: 93,
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
