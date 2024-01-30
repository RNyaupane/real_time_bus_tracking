import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex flex-wrap mb-1 bg-transparent ">
        <section className="relative mx-auto bg-transparent">
          {/* navbar */}
          <nav className="flex justify-between text-black w-screen bg-transparent">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center bg-transparent">
              <a className="text-3xl font-bold font-heading" href="#">
                Live Bus Tracking
              </a>

              {/* Header Icons */}
            </div>
            {/* Responsive navbar */}
            <a className=" flex mr-6 items-center" href="#">
              <CgProfile className="text-3xl" />
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </a>
            <div className="navbar flex justify-center items-center">
              <a
                className="navbar-burger self-center mr-12 md:hidden"
                href="#"
                onClick={toggleMenu}
              >
                <RxHamburgerMenu className="text-3xl" />
              </a>

              {/* Other navbar content goes here */}
            </div>
          </nav>
          {/* Sidebar */}
          {isMenuOpen && (
            <div className="min-h-screen flex flex-row ">
              <div className="flex flex-col w-56 bg-white shadow-xl overflow-hidden">
                <ul className="flex flex-col py-4">
                  {navLinks.map((item, index) => {
                    return (
                      <li key={index}>
                        <a
                          href="#"
                          className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                        >
                          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                            <RxHamburgerMenu className="text-3xl" />
                          </span>
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
export default Navbar;
