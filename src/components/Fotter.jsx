import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="mt-10 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 gap-4">
        <p className="text-sm">
          © {year} <span className="font-semibold text-blue-600">CarHub</span>. All rights reserved.
        </p>

        <div className="flex gap-4 text-lg">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
