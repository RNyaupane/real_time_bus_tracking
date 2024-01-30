import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleInputKeyUp = (event) => {
    setFilter(event.target.value.toUpperCase());
  };

  const filterFunction = () => {
    const dropdownContent = document.getElementById("myDropdown");
    const links = dropdownContent.getElementsByTagName("a");

    for (let i = 0; i < links.length; i++) {
      const txtValue = links[i].textContent || links[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        links[i].style.display = "";
      } else {
        links[i].style.display = "none";
      }
    }
  };

  return (
    <div className="sidebar px-5 py-2 bg-white shadow-lg ">
      <div className="flex space-x-4 ">
        <div className="dropdown">
          <button
            onClick={handleButtonClick}
            className="dropbtn flex items-center mt-3 ms-3 text-gray-600 rounded-xl w-full"
          >
            Select starting point{" "}
            <IoIosArrowDown className="text-lg ms-3 mt-1 text-gray-600" />
          </button>
          <div
            id="myDropdown"
            className={`dropdown-content ${isOpen ? "show" : ""}`}
          >
            <input
              type="text"
              className="border border-white"
              placeholder="Search.."
              id="myInput"
              onKeyUp={handleInputKeyUp}
              onChange={filterFunction}
            />
            <a href="#about">About</a>
            <a href="#base">Base</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
            <a href="#custom">Custom</a>
            <a href="#support">Support</a>
            <a href="#tools">Tools</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
