import { Heart } from "lucide-react";
import React, { JSX, useState } from "react";
import ProjectCard from "../ProjectCard";
import ProjectModal from "../ProjectModal"; // ⬅️ You must have this file
import { jetbrainsMono } from "@/app/font";

import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTypescript, SiNextdotjs, SiPostgresql, SiFlask } from "react-icons/si";

export const techIconMap: Record<string, JSX.Element> = {
  react: <FaReact className="text-cyan-300" />,
  node: <FaNodeJs className="text-green-500" />,
  express: <SiExpress className="text-white" />,
  mongo: <SiMongodb className="text-green-400" />,
  ts: <SiTypescript className="text-blue-500" />,
  next: <SiNextdotjs className="text-white" />,
  postgres: <SiPostgresql className="text-sky-500" />,
  python: <FaPython className="text-yellow-400"/>,
  flask: <SiFlask className="text-white"/>
};

const projects = [
  {
    title: "Aashray",
    description: "A unified pet care ecosystem featuring adoption, rescue reporting, hospital appointments, and an e-commerce module",
    thumbnail: "/project1.png",
    techStack: ["react", "node", "express", "mongo"],
    gradient: "#51fbfb, rgb(13, 1, 60)",
    github: "#",
    live: "#",
  },
  {
    title: "UpSkillr",
    description: "A comprehensive Learning Management System (LMS)",
    thumbnail: "/project2.png",
    techStack: ["react", "node", "express", "mongo"],
    gradient: "#ff7e5f, #0b1020",
    github: "#",
    live: "#",
  },
  {
    title: "CivicPulse",
    description: "A government policy analysis platform featuring complex data visualization and automated backend cron jobs",
    thumbnail: "/project3.png",
    techStack: ["python", "flask", "react", "postgres"],
    gradient: "#14f195, rgb(13, 1, 60)",
    github: "#",
    live: "#",
  },
  {
    title: "Fin-Guru",
    description: "An AI-powered financial assistant tailored for gig workers",
    thumbnail: "/project4.png",
    techStack: ["express", "node", "react"],
    gradient: "#64e, rgb(13, 1, 60)",
    github: "#",
    live: "#",
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div id="projects" className={`  ${jetbrainsMono.className} flex flex-col gap-10 items-center justify-center px-4 pb-20 w-full max-w-4xl`}>
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="flex gap-2 text-[#e8390d]">
          Made with <Heart />
        </p>
        <h1 className="text-4xl md:text-6xl text-center font-bold">
          My Projects
        </h1>
      </div>

      {/* Cards */}
      <div className={`${jetbrainsMono.className} flex flex-col gap-6 w-full `}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          {...selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
