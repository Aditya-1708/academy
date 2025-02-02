import React, { useState, useEffect } from "react";
import { MdOutlineSportsCricket } from "react-icons/md";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import Dialogbox from "./Dialogbox"; // Import Dialogbox
import WhatsAppIcon from "./ui/whatsappicon.jsx";
import axios from "axios";
import axiosInstance from "../axios.js";

const Footer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [links, setLinks] = useState({});

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axiosInstance.get("/api/user/links");
        if (response.data[0]) {
          setLinks(response.data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchLinks();
  }, []);

  return (
    <>
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 md:order-1">
            <MdOutlineSportsCricket className="text-3xl text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-600">KYCA</span>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-8 text-lg mt-8 md:mt-0 md:order-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-emerald-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-500 hover:text-emerald-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-500 hover:text-emerald-600">
                Contact
              </Link>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mt-8 md:mt-0 md:order-3">
            <a
              href={links?.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-emerald-600"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" aria-hidden="true" />
            </a>
            <a
              href={links?.whatsapp || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-emerald-600"
            >
              <span className="sr-only">WhatsApp</span>
              <WhatsAppIcon className="h-6 w-6" aria-hidden="true" />
            </a>
            <a
              href={links?.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-emerald-600"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" aria-hidden="true" />
            </a>
          </div>

          {/* Feedback Button */}
          <div className="mt-8 md:mt-0 md:order-4">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-emerald-700 transition duration-200"
            >
              Your Feedback
            </button>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-8 md:mt-0 text-center md:text-left">
          <p className="text-center pb-2 text-gray-500">
            2025 KYCA Academy. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Dialogbox */}
      {isDialogOpen && <Dialogbox onClose={() => setIsDialogOpen(false)} />}
    </>
  );
};

export default Footer;
