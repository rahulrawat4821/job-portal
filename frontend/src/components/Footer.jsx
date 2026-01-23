import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#875ecd] text-gray-300 mt-10">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Job<span className="text-[#F83002]">Portal</span>
          </h2>
          <p className="text-sm mt-3 leading-relaxed">
            Your gateway to your dream career.  
            Apply to jobs, hire talent, and grow faster.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-[#F83002] transition duration-300 hover:underline underline-offset-4"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/jobs"
                className="hover:text-[#F83002] transition duration-300 hover:underline underline-offset-4"
              >
                Jobs
              </Link>
            </li>

            <li>
              <Link
                to="/browse"
                className="hover:text-[#F83002] transition duration-300 hover:underline underline-offset-4"
              >
                Browse
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                className="hover:text-[#F83002] transition duration-300 hover:underline underline-offset-4"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Spacer (keeps layout clean on desktop) */}
        <div className="hidden md:block"></div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact Us
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#F83002] transition">
              Email: rahulrawat@8458.com
            </li>
            <li className="hover:text-[#F83002] transition">
              Phone: +91 84588 05335
            </li>
            <li className="hover:text-[#F83002] transition">
              Address: Bhopal, India
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start gap-5 mt-5">
            <i className="ri-facebook-fill text-2xl hover:text-white hover:scale-110 transition cursor-pointer"></i>
            <i className="ri-instagram-fill text-2xl hover:text-white hover:scale-110 transition cursor-pointer"></i>
            <i className="ri-twitter-fill text-2xl hover:text-white hover:scale-110 transition cursor-pointer"></i>
            <i className="ri-linkedin-fill text-2xl hover:text-white hover:scale-110 transition cursor-pointer"></i>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-200 border-t border-white/20 py-4 px-4">
        © {new Date().getFullYear()} JobPortal — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
