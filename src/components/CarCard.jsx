import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CarCard = ({ car }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
  >
    <img src={car.image} alt={car.brand} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
        {car.brand} {car.model}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        ₦{Number(car.price).toLocaleString()}
      </p>
      <Link
        to={`/cars/${car.id}`}
        className="text-blue-600 hover:underline text-sm mt-2 inline-block"
      >
        View Details
      </Link>
    </div>
  </motion.div>
);

export default CarCard;
