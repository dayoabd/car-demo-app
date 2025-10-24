import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CarCard from "./CarCard";
import LoadingCar from "./LoadingCar";
import { carsWithImages } from "../data/car";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({ brand: "", year: "", maxPrice: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCars(carsWithImages);
      setFilteredCars(carsWithImages);
      setLoading(false);
    }, 2000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let result = [...cars];
    if (filters.brand)
      result = result.filter((car) =>
        car.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    if (filters.year)
      result = result.filter((car) => car.year.toString() === filters.year);
    if (filters.maxPrice)
      result = result.filter((car) => car.price <= Number(filters.maxPrice));
    setFilteredCars(result);
  }, [filters, cars]);

  if (loading) return <LoadingCar />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="p-6"
    >
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          name="brand"
          placeholder="Search by brand..."
          value={filters.brand}
          onChange={handleChange}
          className="border rounded px-4 py-2 w-48 dark:bg-gray-800 dark:border-gray-700"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="number"
          name="year"
          placeholder="Year"
          value={filters.year}
          onChange={handleChange}
          className="border rounded px-4 py-2 w-32 dark:bg-gray-800 dark:border-gray-700"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="number"
          name="maxPrice"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={handleChange}
          className="border rounded px-4 py-2 w-40 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {filteredCars.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No cars found.</p>
      )}
    </motion.div>
  );
};

export default Home;
