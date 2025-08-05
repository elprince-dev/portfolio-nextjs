"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const skillCategories = {
    "Frontend": ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Sass"],
    "Backend": ["Python", "Flask", "FastApi", "SQL"],
    "Tools": ["Git", "GitHub", "VS Code"]
  };

  const stats = [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Completed", value: "10+" },
    { label: "Technologies", value: "14+" }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-stone-900 dark:to-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Passionate Software Engineer & Data Analyst crafting digital solutions
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-gray-200 dark:border-stone-700">
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-stone-700">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Get to know me!
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Hi, I'm Mohammad, a{" "}
                  <span className="font-semibold text-teal-600 dark:text-teal-400">highly ambitious</span> and{" "}
                  <span className="font-semibold text-teal-600 dark:text-teal-400">self-motivated</span>{" "}
                  Software Engineer and Data Analyst based in Milton, ON.
                </p>
                <p>
                  I learned Python, JavaScript and SQL at{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">Flatiron School</span> in 2023
                  and have been coding since then. I expanded my expertise with Next.js and FastAPI
                  to build full-stack applications.
                </p>
                <p>
                  Beyond coding, I enjoy tennis, chess, table tennis, and continuous self-development.
                  I believe in{" "}
                  <span className="font-bold text-teal-600 dark:text-teal-400">
                    never stop growing
                  </span>{" "}
                  and am always pushing the limits of what's possible.
                </p>
                <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border-l-4 border-teal-500">
                  <p className="text-teal-800 dark:text-teal-200 font-medium">
                    🚀 Currently seeking new opportunities to work with passionate teams
                    and contribute to innovative projects.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-stone-700">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Technical Skills
              </h2>
              <div className="space-y-6">
                {Object.entries(skillCategories).map(([category, skills]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-3 text-teal-600 dark:text-teal-400">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium border border-teal-200 dark:border-teal-700 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-out cursor-pointer"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
