import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SellCar from "./components/SellCar";
import CarDetails from "./components/CarDetails";
import NavBar from "./components/NavBar";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`${theme === "dark" ? "dark bg-gray-900" : "bg-gray-100"} min-h-screen`}>
      <Router>
        <NavBar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<SellCar />} />
          <Route path="/cars/:id" element={<CarDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
