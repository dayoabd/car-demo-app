import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingCar from "./LoadingCar";
import { carsWithImages } from "../data/car";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading
    const found = carsWithImages.find((c) => c.id === Number(id));
    const timer = setTimeout(() => {
      setCar(found);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [id]);

  // Loading animation
  if (loading) return <LoadingCar />;

  // Not found
  if (!car)
    return (
      <div className="p-8 text-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-300 mb-4 text-lg">
          Car not found.
        </p>
        <Link
          to="/"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          Go back home
        </Link>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex justify-center items-start pt-12 px-4 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <img
          src={car.image}
          alt={car.brand}
          className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {car.brand} {car.model}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg">
          Year: <span className="font-medium">{car.year}</span>
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-xl mb-6">
          Price:{" "}
          <span className="font-semibold text-green-500">
            ₦{car.price.toLocaleString()}
          </span>
        </p>

        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default CarDetails;
