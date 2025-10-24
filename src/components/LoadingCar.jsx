import React from "react";
import { motion } from "framer-motion";
import { FaCarSide } from "react-icons/fa";

const LoadingCar = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <motion.div
      animate={{ x: ["-40%", "40%", "-40%"] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="text-blue-600 text-6xl"
    >
      <FaCarSide />
    </motion.div>
    <p className="text-gray-500 dark:text-gray-300 mt-4">Loading...</p>
  </div>
);

export default LoadingCar;
