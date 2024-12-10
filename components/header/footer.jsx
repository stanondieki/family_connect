import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="from-gray-800 to-black text-white-200 py-6">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <p className="text-sm">
              My Family Tree is your go-to platform for tracing family heritage, designing family trees, and exploring connections between relatives. Join us in celebrating family history.
            </p>
          </div>
          {/* Navigation Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-white transition">About Us</a>
              </li>
              <li>
                <a href="/help" className="hover:text-white transition">Help Center</a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">Contact Us</a>
              </li>
            </ul>
          </div>
          {/* Social Links Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} My Family Tree. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
