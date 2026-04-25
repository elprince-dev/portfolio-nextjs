"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const skillCategories = {
    "Languages": ["TypeScript", "Python", "JavaScript", "HTML/CSS", "SQL"],
    "Frameworks": ["React 19", "tRPC", "Node.js", "Vitest"],
    "Cloud & Infrastructure": ["AWS Lambda", "CDK", "DynamoDB", "S3", "CloudFront", "EventBridge", "SES", "SNS", "CloudWatch", "RUM", "WAF", "Route 53", "IaC"],
    "Tools": ["Git", "Nx", "Vite", "ESLint", "Prettier"]
  };

  const stats = [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Completed", value: "15+" },
    { label: "Technologies", value: "20+" }
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
            Software Development Engineer building production systems on AWS
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

        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex"
          >
            <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-stone-700 flex flex-col w-full">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Get to know me!
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Hi, I&apos;m Mohammad, a{" "}
                  <span className="font-semibold text-teal-600 dark:text-teal-400">Software Development Engineer</span>{" "}
                  with a data background, building production systems on{" "}
                  <span className="font-semibold text-teal-600 dark:text-teal-400">AWS</span>.
                  I specialize in TypeScript, Python, and cloud infrastructure.
                </p>
                <p>
                  At{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">Amazon</span>,
                  I build serverless applications and a multi-region web platform serving
                  fulfillment centers. My work spans React 19 frontends, tRPC APIs, and
                  AWS CDK infrastructure across 15+ production services.
                </p>
                <p>
                  I studied at{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">Flatiron School</span>{" "}
                  (2023) and hold a Master of Engineering from the{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">University of Guelph</span>.
                  I&apos;m an{" "}
                  <span className="font-semibold text-teal-600 dark:text-teal-400">AWS Solutions Architect Associate</span>{" "}
                  and{" "}
                  <span className="font-semibold text-teal-600 dark:text-teal-400">AWS Cloud Practitioner</span>{" "}
                  certified.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex"
          >
            <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-stone-700 flex flex-col w-full">
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
