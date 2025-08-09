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
    problem: "Bloggers needed a simple platform to create, edit, and manage their content",
    solution: "Full-stack blog application with AWS cloud integration",
    techStack: ["javascript", "nextjs", "html", "scss", "mysql"],
    github: "https://github.com/mohamedmhussein/writewell",
    link: "https://writewell.vercel.app/",
    metrics: {
      duration: "1 month",
      linesOfCode: "5,000+",
      techCount: "5 techs"
    },
    highlights: ["AWS S3 Integration", "MySQL Database", "CRUD Operations", "Responsive Design"]
  },
  {
    name: "Portfolio",
    image: "/portfolio.PNG",
    description:
      "A digital showcase of my professional journey, highlighting my skills and projects. The app is made with nextjs as the framework and styled with tailwindcss.",
    problem: "Need for a professional online presence to showcase skills and projects",
    solution: "Modern, responsive portfolio with dark mode and smooth animations",
    techStack: ["javascript", "nextjs", "tailwindcss", "html"],
    github: "https://github.com/mohamedmhussein/portfolio-nextjs",
    link: "https://mohammadelprince.vercel.app/",
    metrics: {
      duration: "1 week",
      linesOfCode: "3,000+",
      techCount: "4 techs"
    },
    highlights: ["Dark/Light Theme", "Framer Motion", "EmailJS Integration", "SEO Optimized"]
  },
  {
    name: "Modern Landing Page",
    image: "/gpt3.PNG",
    description:
      "A modern landing page showcasing advanced web technologies with clean design and smooth animations. Built with React and custom CSS styling for optimal performance.",
    problem: "Need to create an engaging technology showcase website",
    solution: "Modern landing page with clean design and informative content",
    techStack: ["react", "javascript", "html", "css"],
    github: "https://github.com/mohamedmhussein/gpt3",
    link: "https://gpt3-intro.onrender.com/",
    metrics: {
      duration: "2 weeks",
      linesOfCode: "2,000+",
      techCount: "4 techs"
    },
    highlights: ["Responsive Design", "Modern UI", "React Components", "CSS Animations"]
  },
  {
    name: "Budget Tracker CLI",
    image: "/budget-tracker.png",
    description:
      "A Python-based command-line application designed to help you manage your finances and track your expenses easily. This tool utilizes the SQLAlchemy library for database management and provides various features to handle your financial data effectively.",
    problem: "Personal finance management through command-line interface",
    solution: "Python CLI application with SQLAlchemy ORM for data persistence",
    techStack: ["python", "sqlite"],
    github:
      "https://github.com/mohamedmhussein/python-p3-cli-project-budget-tracker",
    link: "",
    metrics: {
      duration: "1 week",
      linesOfCode: "1,500+",
      techCount: "2 techs"
    },
    highlights: ["SQLAlchemy ORM", "CLI Interface", "Data Validation", "Financial Reports"]
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="px-12">
      <h1 className="text-center font-bold text-4xl">
        Projects
        <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => {
          return (
            <motion.div
              key={index}
              className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-stone-700"
              initial={{ opacity: 0, translateY: 50 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <Link href={project.link || project.github} target="_blank">
                  <Image
                    src={project.image}
                    width={600}
                    height={300}
                    className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    alt={project.name}
                  />
                </Link>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Link href={project.github} target="_blank">
                    <div className="bg-white/90 dark:bg-stone-900/90 p-2 rounded-full hover:bg-white dark:hover:bg-stone-900 transition-colors">
                      <BsGithub size={20} className="text-gray-700 dark:text-gray-300" />
                    </div>
                  </Link>
                  {project.link && (
                    <Link href={project.link} target="_blank">
                      <div className="bg-white/90 dark:bg-stone-900/90 p-2 rounded-full hover:bg-white dark:hover:bg-stone-900 transition-colors">
                        <BsArrowUpRightSquare size={20} className="text-gray-700 dark:text-gray-300" />
                      </div>
                    </Link>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  {project.name}
                </h3>
                
                {/* Problem & Solution */}
                <div className="mb-4 space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold text-red-600 dark:text-red-400">Problem:</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">{project.problem}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-green-600 dark:text-green-400">Solution:</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">{project.solution}</span>
                  </div>
                </div>

                {/* Project Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 dark:bg-stone-700 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-teal-600 dark:text-teal-400">{project.metrics.duration}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-teal-600 dark:text-teal-400">{project.metrics.linesOfCode}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Lines of Code</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-teal-600 dark:text-teal-400">{project.metrics.techCount}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Tech Stack</div>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.techStack.map((tech) => (
                    <div key={tech} className="relative group/tech">
                      <Image
                        src={`/${tech}.svg`}
                        width={32}
                        height={32}
                        className={`w-8 h-8 hover:scale-110 transition-transform cursor-pointer ${
                          tech === "nextjs" || tech === "sqlite"
                            ? "dark:bg-slate-100 rounded p-1"
                            : ""
                        }`}
                        alt={tech}
                      />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/tech:opacity-100 transition-opacity capitalize whitespace-nowrap">
                        {tech}
                      </div>
                    </div>
                  ))}
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
