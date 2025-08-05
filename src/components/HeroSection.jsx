"use client";
import Image from "next/image";
import { Link } from "react-scroll/modules";
import React from "react";
import { HiArrowDown } from "react-icons/hi";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
import { motion } from "framer-motion";

const HeroSection = () => {
  const highlights = [
    { label: "Full-Stack Developer", icon: "💻" },
    { label: "Data Analyst", icon: "📊" },
    { label: "Problem Solver", icon: "🧩" }
  ];

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-teal-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-end order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full blur-2xl opacity-20 scale-110"></div>
              <Image
                src="/myPhoto.png"
                width={350}
                height={350}
                alt="Mohammad El Prince"
                className="relative rounded-full shadow-2xl border-4 border-white dark:border-stone-700"
                priority
              />
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-teal-500 text-white p-3 rounded-full shadow-lg"
              >
                💻
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
              >
                📊
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left order-1 lg:order-2"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium mb-6"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Available for opportunities
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-5xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-gray-900 dark:text-white">Hi, I'm </span>
              <span className="text-teal-600 dark:text-teal-400">
                Mohammad
              </span>
            </motion.h1>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center px-4 py-2 bg-white dark:bg-stone-800 rounded-full shadow-md border border-gray-200 dark:border-stone-700"
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed"
            >
              Passionate{" "}
              <span className="font-semibold text-teal-600 dark:text-teal-400">
                Software Engineer and Data Analyst
              </span>{" "}
              with expertise in full-stack development and data-driven solutions.
              Let's build something amazing together!
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link
                to="projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-100}
                duration={800}
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <a href="/Resume_DA.pdf" target="_blank">
                <button className="group px-8 py-4 bg-white dark:bg-stone-800 text-gray-800 dark:text-white font-semibold rounded-xl border-2 border-gray-300 dark:border-stone-600 hover:border-teal-500 dark:hover:border-teal-400 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 group-hover:animate-bounce"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>Download Resume</span>
                </button>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex space-x-6 justify-center lg:justify-start"
            >
              <a href="https://github.com/elprince-dev" target="_blank" className="group">
                <div className="p-3 bg-white dark:bg-stone-800 rounded-full shadow-lg border border-gray-200 dark:border-stone-700 group-hover:border-teal-500 dark:group-hover:border-teal-400 transform group-hover:-translate-y-1 transition-all duration-300">
                  <AiOutlineGithub
                    className="text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300"
                    size={24}
                  />
                </div>
              </a>
              <a href="https://www.linkedin.com/in/elprince93/" target="_blank" className="group">
                <div className="p-3 bg-white dark:bg-stone-800 rounded-full shadow-lg border border-gray-200 dark:border-stone-700 group-hover:border-teal-500 dark:group-hover:border-teal-400 transform group-hover:-translate-y-1 transition-all duration-300">
                  <AiOutlineLinkedin
                    className="text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300"
                    size={24}
                  />
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <Link
            to="about"
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className="group cursor-pointer"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <HiArrowDown className="text-teal-600 dark:text-teal-400 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-300" size={24} />
              </motion.div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
