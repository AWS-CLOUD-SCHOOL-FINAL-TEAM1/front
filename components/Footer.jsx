"use client";
import React from "react";
import { FaGithub, FaHandshake } from "react-icons/fa";

const Footer = () => {
  const handleNavigation = (url) => {
    window.location.href = url;
  };

  return (
    <footer className="bg-gray-700 text-white p-10">
      <div className="max-w-4xl mx-auto text-center">
        <nav className="grid grid-flow-col gap-4 justify-center">
          <button
            className="link link-hover"
            onClick={() =>
              handleNavigation(
                "https://github.com/AWS-CLOUD-SCHOOL-FINAL-TEAM1/front.git"
              )
            }
          >
            Frontend
          </button>
          <button
            className="link link-hover"
            onClick={() =>
              handleNavigation("https://github.com/LightYe4r/spoid.git")
            }
          >
            Backend
          </button>
          <button
            className="link link-hover"
            onClick={() => handleNavigation("/partners")}
          >
            Partners
          </button>
        </nav>
        <nav className="my-4">
          <div className="grid grid-flow-col gap-4 justify-center">
            <button
              onClick={() =>
                handleNavigation(
                  "https://github.com/AWS-CLOUD-SCHOOL-FINAL-TEAM1/front.git"
                )
              }
              aria-label="GitHub"
              className="link link-hover"
            >
              <FaGithub size={24} />
            </button>
            <button
              onClick={() => handleNavigation("/partners")}
              aria-label="Partners"
              className="link link-hover"
            >
              <FaHandshake size={24} />
            </button>
          </div>
        </nav>
        <div className="grid grid-flow-col gap-4 justify-center">
          <aside>
            <p>Copyright © 2024 - All right reserved by TEAM.SPOID</p>
          </aside>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
