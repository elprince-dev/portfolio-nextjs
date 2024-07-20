"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsArrowUpRightSquare } from "react-icons/bs";

const projects = [
  {
    name: "Portfolio",
    image: "/portfolio.PNG",
    description:
      "A digital showcase of my professional journey, highlighting my skills and projects.",
    techStack: ["html", "css", "javascript"],
    github: "https://github.com/mohamedmhussein/phase-1-project-portfolio",
    link: "https://mohamed-hussein.onrender.com/",
  },
  {
    name: "Random Acts of Kindness",
    image: "/randomActsOfKindness.PNG",
    description:
      "The app enables users to share their acts of kindness and inspire other users to do similar acts, spreading kindness among users and promoting love.",
    techStack: ["react", "javascript", "html", "css"],
    github:
      "https://github.com/mohamedmhussein/phase-2-project-random-acts-of-kindness",
    link: "https://random-acts-of-kindness.onrender.com/",
  },
  {
    name: "GPT-3 Landing Page",
    image: "/gpt3.PNG",
    description:
      "A landing page created to describe GPT-3 technology that provides a brief introduction about this modern AI technology.",
    techStack: ["react", "javascript", "html", "css"],
    github: "https://github.com/mohamedmhussein/gpt3",
    link: "https://gpt3-intro.onrender.com/",
  },
  {
    name: "Budget Tracker CLI",
    image: "/budget-tracker.png",
    description:
      "a Python-based command-line application designed to help you manage your finances and track your expenses easily. This tool utilizes the SQLAlchemy library for database management and provides various features to handle your financial data effectively.",
    techStack: ["python", "sqlite"],
    github:
      "https://github.com/mohamedmhussein/python-p3-cli-project-budget-tracker",
    link: "",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="px-12">
      <h1 className="text-center font-bold text-4xl">
        Projects
        <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
      </h1>

      <div className="flex flex-col space-y-28">
        {projects.map((project, index) => {
          return (
            <div
              key={index}
              className="flex flex-col md:flex-row md:space-x-12"
            >
              <div className="w-1/2 mt-8">
                <Link href={project.link} target="_blank">
                  <Image
                    src={project.image}
                    width={1000}
                    height={1000}
                    className="rounded-xl shadow-xl hover:opacity-70"
                  />
                </Link>
              </div>
              <div className="w-1/2 mt-8">
                <h1 className="text-4xl font-bold mb-6">{project.name}</h1>
                <p className="text-xl leading-7 mb-4 text-neutral-600 dark:text-neutral-400">
                  {project.description}
                </p>
                <div className="flex align-bottom space-x-4">
                  <Link href={project.github} target="_blank">
                    <BsGithub
                      size={30}
                      className="cursor-pointer hover:-translate-y-1 transition-transform"
                    />
                  </Link>
                  <Link href={project.link} target="_blank">
                    <BsArrowUpRightSquare
                      size={30}
                      className="cursor-pointer hover:-translate-y-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
