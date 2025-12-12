import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#875ecd] text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo + Short Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">Job<span className="text-[#F83002]">Portal</span></h2>
          <p className="text-sm mt-3">
            Your gateway to your dream career.  
            Apply to jobs, hire talent, and grow faster.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#F83002] cursor-pointer">Home</li>
            <li className="hover:text-[#F83002] cursor-pointer">Jobs</li>
            <li className="hover:text-[#F83002] cursor-pointer">Companies</li>
            <li className="hover:text-[#F83002] cursor-pointer">About Us</li>
          </ul>
        </div>

        {/* Candidate */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">For Candidates</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#F83002] cursor-pointer">Browse Jobs</li>
            <li className="hover:text-[#F83002] cursor-pointer">Upload Resume</li>
            <li className="hover:text-[#F83002] cursor-pointer">Saved Jobs</li>
            <li className="hover:text-[#F83002] cursor-pointer">Notifications</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#F83002] cursor-pointer">Email: support@jobportal.com</li>
            <li className="hover:text-[#F83002] cursor-pointer">Phone: +91 98765 43210</li>
            <li className="hover:text-[#F83002] cursor-pointer">Address: Bhopal, India</li>
          </ul>

          {/* Social Links */}
          <div className="flex space-x-4 mt-4">
            <i className="ri-facebook-fill text-2xl hover:text-white cursor-pointer"></i>
            <i className="ri-instagram-fill text-2xl hover:text-white cursor-pointer"></i>
            <i className="ri-twitter-fill text-2xl hover:text-white cursor-pointer"></i>
            <i className="ri-linkedin-fill text-2xl hover:text-white cursor-pointer"></i>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="text-center text-sm text-gray-800 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} JobPortal — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
