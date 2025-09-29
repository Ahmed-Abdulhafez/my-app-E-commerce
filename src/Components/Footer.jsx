import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaBehance,
} from "react-icons/fa";



const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 select-none">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & Contact */}
        <div>
          <div className="mb-4">
            <img
              src="/assets/images/white-logo.png"
              alt="Evo Logo"
              className="w-32"
            />
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                16501 Collins Ave, Sunny Isles Beach, FL 33160, United States
              </a>
            </li>
            <li>
              <a
                href="mailto:hexashop@company.com"
                className="hover:text-white"
              >
                hexashop@company.com
              </a>
            </li>
            <li>
              <a href="tel:0100200340" className="hover:text-white">
                010-020-0340
              </a>
            </li>
          </ul>
        </div>

        {/* Shopping & Categories */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Shopping & Categories
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Men’s Shopping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Women’s Shopping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Kid’s Shopping
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Useful Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Homepage
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Help
              </a>
            </li>
            <li>
              <Link to="/Contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Help & Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Help & Information
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Help
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ's
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Tracking ID
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center  gap-4 text-sm text-gray-500">
          <p className="text-center">
            Copyright © {new Date().getFullYear()} Ahmed Elsheikh. All Rights
            Reserved.
            <br />
            Designed & Developed by{" "}
            <a
              href="https://www.linkedin.com/in/ahmed-elsheikh" // غير اللينك ده للينكد إن بتاعك
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline"
            >
              Ahmed Elsheikh
            </a>
          </p>

          <div className="flex space-x-4 text-lg">
            <a
              href="#"
              className="hover:text-blue-600 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-blue-700 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="hover:text-purple-500 transition"
              aria-label="Behance"
            >
              <FaBehance />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
