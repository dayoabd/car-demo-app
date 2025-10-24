import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

const NavBar = ({ theme, setTheme }) => {
  const location = useLocation();
  const onSellPage = location.pathname === "/sell";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex justify-between items-center px-8 py-4 bg-white dark:bg-gray-900 shadow-md"
    >
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        CarHub
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className={`${
            location.pathname === "/" ? "text-blue-600" : "text-gray-700 dark:text-gray-200"
          } hover:text-blue-600 transition`}
        >
          Home
        </Link>

        {/* Conditional Button */}
        {onSellPage ? (
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Buy Car
          </Link>
        ) : (
          <Link
            to="/sell"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sell Car
          </Link>
        )}

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
        >
          {theme === "dark" ? (
            <BsSunFill className="text-yellow-400" />
          ) : (
            <BsMoonStarsFill className="text-gray-800" />
          )}
        </button>
      </div>
    </motion.nav>
  );
};

export default NavBar;
