"use client";
import Image from "next/image";
import { Link } from "react-scroll/modules";
import React from "react";
import { HiArrowDown } from "react-icons/hi";

const HeroSection = () => {
  return (
    <section id="home">
      <div className="flex flex-col text-center items-center justify-center my-10 py-16 md:flex-row md:space-x-4 md:text-left md:py-52 sm:py-32 md:px-20">
        <div className="md:w-1/2 md:mt-2">
          <Image
            src="/myPhoto.png"
            width={300}
            height={300}
            alt=""
            className="rounded-full shadow-2xl"
          />
        </div>
        <div className="md:w-3/5 md:mt-2">
          <h1 className="font-bold text-4xl text-teal-600 md:mt-6  mt-0 md:text-6xl ">
            Hi, I&#39;m Mohammad!
          </h1>
          <p className="text-lg mt-4 mb-6">
            I&#39;am a passionate{" "}
            <span className="font-semibold text-teal-600">
              Software Engineer
            </span>{" "}
            with experience in leadership and engineering and constant drive to
            learning. Let&#39;s connect and share experiences and ideas!
          </p>
          <div className="flex space-x-3 justify-center md:justify-start">
            <Link
              to="projects"
              className="text-neutral-100 font-semibold px-6 py-3 bg-teal-600 rounded shadow hover:bg-teal-700 cursor-pointer transition ease-out duration-200"
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-100}
              duration={800}
            >
              Projects
            </Link>
            <a href="/Mohammad El Prince.pdf" target="_blank">
              <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-3 rounded inline-flex items-center cursor-pointer transition ease-out duration-200">
                <svg
                  class="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Download Resume</span>
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center animate-bounce cursor-pointer">
        <Link
          to="about"
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <HiArrowDown size={35} className="animate-bounce" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
