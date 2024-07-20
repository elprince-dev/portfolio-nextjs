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
            learning. Let's connect and share experiences and ideas!
          </p>
          <Link
            to="projects"
            className="text-neutral-100 font-semibold px-6 py-3 bg-teal-600 rounded shadow hover:bg-teal-700 cursor-pointer"
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-100}
            duration={800}
          >
            Projects
          </Link>
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
