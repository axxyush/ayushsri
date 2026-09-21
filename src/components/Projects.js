import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import pehcharm from "../images/pehcharm.png";
import walle from "../images/walle.png";
import armie from "../images/armie.png";
import meetwise from "../images/meetwise.png";

const projectsData = [
  {
    title: "Dots",
    description:
      "A tool that converts floorplans into tactile braille maps with QR-linked voice and text Q&A for blind and low-vision users, powered by Gemini, Fetch.ai ASI:One, and ElevenLabs.",
    techStack: ["Python", "Gemini", "Fetch.ai ASI:One", "ElevenLabs", "SQLite"],
    imageUrl:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/004/611/378/datas/medium.jpeg",
    liveUrl: "https://devpost.com/software/dots-y5r21j",
    githubUrl: "https://github.com/axxyush/dots",
  },
  {
    title: "Armie",
    description:
      "A mixed-reality robotic surgical arm built in 48 hours for surgery training, reducing reliance on $500–$3K cadaver specimens with Arduino Uno Q firmware, BLE teleoperation, and Snap Spectacles AR calibration.",
    techStack: [
      "Arduino Uno Q",
      "BLE",
      "Embedded C++",
      "Servo Motors",
      "3D Printing",
      "Snap Spectacles",
    ],
    imageUrl: armie,
    liveUrl: "https://devpost.com/software/armie",
    githubUrl: "https://github.com/axxyush/ARmie-mithack",
  },
  {
    title: "MeetWise",
    description:
      "A meeting intelligence platform that eliminates manual notetaking by enabling AI conversational search over past meetings, with Whisper & Pyannote transcription, speaker diarization, and an OpenAI-powered query interface.",
    techStack: [
      "PyTorch",
      "React",
      "MongoDB",
      "RunPod",
      "FastAPI",
      "OpenAI API",
    ],
    imageUrl: meetwise,
    githubUrl: "https://github.com/axxyush/meetwise",
  },
  {
    title: "Pehcharm",
    description:
      "A full-stack platform enabling 100+ users to create portfolios (4.5/5 from 20+ testers), with AI feedback, recommendations, profile-view analytics, and GitHub & Jobs API integrations.",
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
          style={{ objectFit: "cover", height: "200px", width: "100%" }}
          className="card-img-top object-cover transition-all duration-300 ease-in-out project-image"
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
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-globe" style={{ color: "#ffffffff" }} />{" "}
              Live Demo
            </a>
          )}
          <a
            href={project.githubUrl}
            className="btn btn-outline-dark text-center flex-fill"
            target="_blank"
            rel="noopener noreferrer"
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
