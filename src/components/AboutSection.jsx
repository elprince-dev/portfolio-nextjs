import Image from "next/image";
import React from "react";

const AboutSection = () => {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "React",
    "Next.js",
    "Flask",
    "FastApi",
    "SQL",
    "Tailwind CSS",
    "Sass",
    "Git",
    "GitHub",
    "VS Code",
  ];

  return (
    <section id="about">
      <div className="my-12 pb-12 md:pt-16 md:pb-48 px-12">
        <h1 className="text-center font-bold text-4xl">
          About Me
          <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
        </h1>
        <div className="flex flex-col md:flex-row space-y-10 items-stretch justify-center align-top md:text-left md:p-4 md:space-y-0 md:space-x-10">
          <div className="md:w-1/2">
            <h1 className="text-center text-2xl font-bold mb-6 md:text-left">
              Get to know me!
            </h1>
            <p>
              {" "}
              Hi, my name is Mohammad and I am a{" "}
              <span className="font-bold"> highly ambitious</span>,{" "}
              <span className="font-bold">self-motivated</span> {""} Software
              Engineer based in Mississauga, ON.
            </p>
            <br />
            <p>
              {" "}
              I learned full-stack software development at Flatiron School in
              2023 and have been coding since then. I went farther and learned
              Next.js and FastAPI to expand my expertise and projects.
            </p>
            <br />
            <p>
              {" "}
              I have a wide range of hobbies that keep me busy such as tennis,
              chess, table tennis and self-development.
            </p>
            <br />
            <p>
              I truly believe that I should{" "}
              <span className="font-bold text-teal-500">
                never stop growing
              </span>{" "}
              and that&#39;s what I strive to do every day. I have a passion for
              technology and a desire to always push the limits of what is
              possible. I am excited to see where my career takes me and am
              looking for new opportunities and working among passionate teams.
              🙂
            </p>
          </div>
          <div className="md:w-1/2">
            <h1 className="text-center text-2xl font-bold mb-6 md:text-left">
              My Skills
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start">
              {skills.map((skill, index) => {
                return (
                  <p
                    key={index}
                    className="bg-gray-200 px-4 py-2 mr-2 mt-2 text-gray-500 rounded font-semibold transition ease-out duration-200 hover:bg-gray-500  hover:text-gray-200 cursor-pointer"
                  >
                    {skill}
                  </p>
                );
              })}
            </div>
            <div className="flex justify-center items-end">
              <Image
                src="/coding.png"
                width={285}
                height={285}
                alt=""
                className="hidden md:block md:relative md:bottom-0  md:z-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
