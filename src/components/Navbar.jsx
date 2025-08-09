"use client";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { RiSunLine, RiMoonFill } from "react-icons/ri";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link } from "react-scroll/modules";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Home",
    page: "home",
  },
  {
    label: "About",
    page: "about",
  },
  {
    label: "Projects",
    page: "projects",
  },
  {
    label: "Blog",
    page: "blog",
  },
  {
    label: "Contact",
    page: "contact",
  },
];

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="w-full mx-auto px-4 bg-white shadow fixed top-0 z-50  dark:border-b dark:bg-stone-900 dark:border-stone-600 sm:px-20">
      <div className="md:flex justify-between md:items-center">
        <div>
          <div className="flex justify-between items-center py-3">
            {isHomePage ? (
              <Link to="home">
                <div className="md:py-5 md:block cursor-pointer">
                  <h2 className="text-2xl font-bold ">Mohammad El Prince</h2>
                </div>
              </Link>
            ) : (
              <a href="/">
                <div className="md:py-5 md:block cursor-pointer">
                  <h2 className="text-2xl font-bold ">Mohammad El Prince</h2>
                </div>
              </a>
            )}

            <div>
              <button className="md:hidden" onClick={() => setNavbar(!navbar)}>
                {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className="md:flex md:space-x-6 items-center justify-center space-y-8 md:space-y-0 text-center ">
              {navItems.map((item, index) => {
                if (item.page === 'blog' && !isHomePage) {
                  // Special handling for blog link when on blog page
                  return (
                    <span
                      key={index}
                      className="block lg:inline-block text-teal-600 dark:text-teal-400 font-semibold cursor-default"
                    >
                      {item.label}
                    </span>
                  );
                }
                
                if (!isHomePage) {
                  // Regular links when not on home page
                  return (
                    <a
                      key={index}
                      href={item.page === 'blog' ? '/blog' : `/#${item.page}`}
                      className="block lg:inline-block text-neutral-900 hover:text-neutral-500 dark:text-neutral-100 cursor-pointer"
                      onClick={() => setNavbar(!navbar)}
                    >
                      {item.label}
                    </a>
                  );
                }
                
                // Scroll links when on home page
                return (
                  <Link
                    key={index}
                    to={item.page}
                    className="block lg:inline-block text-neutral-900 hover:text-neutral-500 dark:text-neutral-100 cursor-pointer"
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    onClick={() => setNavbar(!navbar)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {currentTheme === "dark" ? (
                <button
                  className="bg-slate-100 p-2 rounded-xl"
                  onClick={() => setTheme("light")}
                >
                  <RiSunLine size={20} color="black" />
                </button>
              ) : (
                <button
                  className="bg-slate-100 p-2 rounded-xl"
                  onClick={() => setTheme("dark")}
                >
                  <RiMoonFill size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
