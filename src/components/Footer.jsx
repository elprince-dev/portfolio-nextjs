import React from "react";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="mx-auto w-5/6 px-6 ">
      <hr className="w-full h-0.5 mx-auto mt-8 bg-neutral-200 border-0" />
      <div className="mx-auto md:justify-between p-4 flex  text-center text-neutral-900 md:flex-row ">
        <div className="text-neutral-500 dark:text-neutral-100  flex-1">
          © 2024 Mohammad El Prince
        </div>
        {/* <div className="flex items-center justify-center space-x-2 mb-1">
          <a href="https://github.com/mohamedmhussein" target="_blank">
            <AiOutlineGithub
              className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100"
              size={30}
            />
          </a>
          <a href="https://www.linkedin.com/in/elprince93/" target="_blank">
            <AiOutlineLinkedin
              className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100"
              size={30}
            />
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
