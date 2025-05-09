import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, toggleDarkMode } from "../features/darkmodeSlice";
import Button from "@mui/material/Button";

const NavLinks = ({ className = "" }) => (
  <>
    {["Home", "Countries", "About", "Pricing"].map((text) => (
      <a
        key={text}
        href="#"
        title={text}
        className={`text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 ${className}`}
      >
        {text}
      </a>
    ))}
  </>
);

function Header() {
  const dispatch = useDispatch();
  const darkmode = useSelector(selectDarkMode);

  return (
    <header className="fixed z-50 w-screen bg-white pb-6 lg:pb-0 shadow-2xl">
      <div className="px-3 mx-auto max-w-7xl sm:px-4 lg:px-6">
        {/* Top Navigation */}
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" title="Logo" className="flex">
              <img
                className="w-auto h-8 lg:h-10"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
                alt="Logo"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            <svg
              className="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            <NavLinks />
          </div>

          {/* Call to Action + Theme Toggle */}
          <div className="hidden lg:inline-flex items-center space-x-4 ml-10">
            <button
              className="bg-violet-500 py-2 px-5 rounded-3xl shadow-2xl"
              onClick={() => dispatch(toggleDarkMode())}
            >
              {darkmode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
          <div className="px-6 space-y-1">
            <NavLinks className="inline-flex py-2" />
          </div>
          <div className="px-6 mt-6 flex flex-col space-y-3">
            <a
              href="#"
              className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white bg-blue-600 rounded-md transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700"
              role="button"
            >
              Get started now
            </a>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => dispatch(toggleDarkMode())}
            >
              {darkmode ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
