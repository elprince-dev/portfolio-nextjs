"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsArrowUpRightSquare } from "react-icons/bs";
import { motion } from "framer-motion";

const projects = [
  {
    name: "WriteWell",
    image: "/writewell.PNG",
    description:
      "WriteWell is a blog app for bloggers to share their thought through writing blogs, edit and delete them. The app is built with nextjs for the both frontend and the api and connected with MySQL database deployed that is on AWS RDS. Images are saved on AWS S3 and connected to the database through their URLs.",
    techStack: ["javascript", "nextjs", "html", "scss", "mysql"],
    github: "https://github.com/mohamedmhussein/writewell",
    link: "https://writewell.vercel.app/",
  },
  {
    name: "Portfolio",
    image: "/portfolio.PNG",
    description:
      "A digital showcase of my professional journey, highlighting my skills and projects. The app is made with nextjs as the framework and styled with tailwindcss.",
    techStack: ["javascript", "nextjs", "tailwindcss", "html"],
    github: "https://github.com/mohamedmhussein/portfolio-nextjs",
    link: "https://mohammadelprince.vercel.app/",
  },

  {
    name: "GPT-3 Landing Page",
    image: "/gpt3.PNG",
    description:
      "A landing page created to describe GPT-3 technology that provides a brief introduction about this modern AI technology. It is a static page that uses react with basic css styling.",
    techStack: ["react", "javascript", "html", "css"],
    github: "https://github.com/mohamedmhussein/gpt3",
    link: "https://gpt3-intro.onrender.com/",
  },
  {
    name: "Budget Tracker CLI",
    image: "/budget-tracker.png",
    description:
      "A Python-based command-line application designed to help you manage your finances and track your expenses easily. This tool utilizes the SQLAlchemy library for database management and provides various features to handle your financial data effectively.",
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

      <div className="flex flex-col space-y-28 ">
        {projects.map((project, index) => {
          return (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row md:space-x-12 items-center"
              initial={{ opacity: 0, translateY: 200 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="w-4/5 mt-8">
                <Link href={project.link} target="_blank">
                  <Image
                    src={project.image}
                    width={1000}
                    height={1000}
                    className="rounded-xl shadow-xl hover:opacity-70 transition ease-out duration-200"
                  />
                </Link>
              </div>
              <div className="w-4/5 mt-8">
                <h1 className="text-4xl font-bold mb-6">{project.name}</h1>
                <p className="text-xl leading-7 mb-4 text-neutral-600 dark:text-neutral-400 text-justify">
                  {project.description}
                </p>
                <div className="flex justify-between">
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
                  <div className=" flex ml-5 space-x-3 flex-end flex-wrap">
                    {project.techStack.map((tech) => (
                      <img
                        key={tech}
                        src={`/${tech}.svg`}
                        className={`w-9 h-9 hover:scale-110 transition-transform cursor-pointer ${
                          tech === "nextjs" || "sqlite"
                            ? "dark:bg-slate-100 rounded"
                            : ""
                        }`}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
