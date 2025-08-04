import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import pehcharm from "../images/pehcharm.png";
import walle from "../images/walle.png";
import meetwise from "../images/meetwise.png";

const projectsData = [
  {
    title: "MeetWise",
    description:
      "An AI meeting assistant that auto-transcribes audio, labels speakers, and lets you query key moments on the fly.",
    techStack: ["React.js", "FastAPI", "MongoDB", "HuggingFace", "RunPod"],
    imageUrl: meetwise,
    // liveUrl: "",
    githubUrl: "https://github.com/axxyush/meetwise",
  },
  {
    title: "Pehcharm",
    description:
      "A MERN-stack platform where users build/share professional portfolios augmented with AI-driven feedback.",
    techStack: [
      "React.js",
      "Node.js",
      "Express",
      "MongoDB",
      "APIs",
      "Render",
      "Vercel",
    ],
    imageUrl: pehcharm,
    liveUrl: "https://pehcharm.vercel.app",
    githubUrl: "https://github.com/axxyush/pehcharm",
  },
  {
    title: "Wall-E Robot",
    description:
      "A web-controlled, 3D-printed rover powered by ESP32 circuitry, using motor controllers to navigate and interact with its environment.",
    techStack: [
      "ESP32",
      "C++",
      "React.js",
      "Arduino",
      "SolidWorks",
      "3D Printing",
    ],
    imageUrl: walle,
    liveUrl: "https://wall-e-one.vercel.app",
    githubUrl: "https://github.com/axxyush/WallE",
  },
];

const ProjectCard = ({ project, index, variant }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="card project-card h-80 border shadow-sm mb-4"
      style={{
        width: "100%",
        "--card-hover-border-color": `var(--bs-${variant})`,
      }}
    >
      <div className="overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          width={600}
          height={400}
          className="card-img-top w-100 h-100 object-cover transition-all duration-300 ease-in-out project-image"
        />
      </div>
      <div className="card-body d-flex flex-column p-4">
        <h3 className="card-title h5 fw-bold text-dark">{project.title}</h3>
        <p className="card-text flex-grow-1 mt-2 text-secondary">
          {project.description}
        </p>
        <div className="mt-3 d-flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="badge bg-secondary text-white font-normal"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 d-flex gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className={`btn btn-${variant} text-center flex-fill`}
            >
              <i className="fa-solid fa-globe" style={{ color: "#ffffffff" }} />{" "}
              Live Demo
            </a>
          )}
          <a
            href={project.githubUrl}
            className="btn btn-outline-dark text-center flex-fill"
          >
            <i className="fa-brands fa-github" /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
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
    <section
      id="projects"
      style={{ backgroundColor: "#e9ededff" }}
      className="py-5"
    >
      <div className="container px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center display-5 fw-bold text-dark mb-5"
        >
          <i className={`fa-solid fa-hammer text-${variant}`} /> Projects
        </motion.h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {projectsData.map((project, index) => (
            <div key={project.title} className="col">
              <ProjectCard project={project} index={index} variant={variant} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
