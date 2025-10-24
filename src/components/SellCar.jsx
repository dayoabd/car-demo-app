// src/components/SellCar.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCarSide } from "react-icons/fa";

// Sample user listings
const initialUserCars = [
  { id: 1, brand: "Lexus", price: 30000, image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500" },
  
  { id: 2, brand: "Mazda", price: 21000, image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500" },

  { id: 3, brand: "Peugeot", price: 18000, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=60" },
  { id: 4, brand: "Volkswagen", price: 27000, image: "https://plus.unsplash.com/premium_photo-1686730540270-93f2c33351b6?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500" },
];

// Hugging Face API
const HF_API_URL = "https://api-inference.huggingface.co/models/microsoft/resnet-50";
const HF_TOKEN = process.env.REACT_APP_HF_TOKEN || "";

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => { reader.abort(); reject(new Error("Problem reading file.")); };
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

const SellCar = () => {
  const [loading, setLoading] = useState(true); // page loader
  const [showForm, setShowForm] = useState(false);
  const [userCars, setUserCars] = useState(initialUserCars);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [checkingCar, setCheckingCar] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // page loader simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // reset form when closing
  useEffect(() => {
    if (!showForm) {
      setError("");
      setStatusMessage("");
      setImageFile(null);
      setImageDataUrl("");
    }
  }, [showForm]);

  const handleImageChange = async (e) => {
    setError("");
    setStatusMessage("");
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (jpg, png, etc.).");
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setImageFile(file);
      setImageDataUrl(dataUrl);
    } catch {
      setError("Couldn't read the image file. Try another one.");
    }
  };

  const checkImageIsCar = async (file) => {
    if (!HF_TOKEN) throw new Error("Hugging Face token missing.");
    try {
      const resp = await fetch(HF_API_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${HF_TOKEN}`, "Content-Type": file.type },
        body: file,
      });
      const json = await resp.json();
      if (!Array.isArray(json)) return false;
      return json.some(r => /car|vehicle|automobile/i.test(r.label) && r.score >= 0.5);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatusMessage("");

    if (!brand.trim() || !price || !imageFile) {
      setError("Please provide brand, price, and an image.");
      return;
    }

    try {
      setCheckingCar(true);
      setStatusMessage("🔍 Checking image for a car...");
      const isCar = await checkImageIsCar(imageFile);
      setCheckingCar(false);
      setStatusMessage("");

      if (!isCar) {
        setError("❌ No car detected in the image. Upload a different photo.");
        return;
      }

      const newCar = { id: Date.now(), brand: brand.trim(), price: parseFloat(price), image: imageDataUrl };
      setUserCars(prev => [newCar, ...prev]);

      setBrand(""); setPrice(""); setImageFile(null); setImageDataUrl(""); setShowForm(false);
      alert("✅ Car added successfully!");
    } catch (err) {
      setCheckingCar(false);
      setError("Error verifying image. Check your network/token.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          initial={{ x: "-40%" }}
          animate={{ x: "40%" }}
          transition={{ repeat: Infinity, repeatType: "loop", duration: 2, ease: "linear" }}
          className="w-full flex justify-center"
        >
          <FaCarSide className="text-[6rem] text-blue-600 drop-shadow-lg" />
        </motion.div>
      </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-6 max-w-5xl mx-auto">
      <h2 className="text-center text-red-500 text-xl font-semibold mb-4">
        🚫 Cars listed here are <b>not sold by the company</b>
      </h2>

      <div className="flex justify-center mb-6">
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowForm(s => !s)} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          {showForm ? "Close" : "I want to sell car"}
        </motion.button>
      </div>

      {showForm && (
        <motion.form onSubmit={handleSubmit} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35 }} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <input className="border p-2 rounded dark:bg-gray-700 dark:text-white" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} />
            <input className="border p-2 rounded dark:bg-gray-700 dark:text-white" placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </div>

          <div className="mt-4">
            <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-700 dark:text-gray-300" />
          </div>

          {imageDataUrl && <div className="mt-4"><img src={imageDataUrl} alt="preview" className="w-64 h-40 object-cover rounded border" /></div>}
          {error && <p className="text-red-500 mt-3">{error}</p>}
          {statusMessage && <p className="text-blue-600 mt-3">{statusMessage}</p>}

          <div className="mt-4">
            <motion.button type="submit" whileTap={{ scale: 0.98 }} disabled={checkingCar} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-60">
              {checkingCar ? "Checking image..." : "Submit listing"}
            </motion.button>
          </div>
        </motion.form>
      )}

      {/* Checking loader */}
      {checkingCar && (
        <div className="flex justify-center mb-6">
          <motion.div initial={{ x: "-40%" }} animate={{ x: "40%" }} transition={{ repeat: Infinity, repeatType: "loop", duration: 8, ease: "linear" }} className="w-full flex justify-center">
            <FaCarSide className="text-[6rem] text-blue-600 dark:text-blue-400 drop-shadow-lg" />
          </motion.div>
        </div>
      )}

      {/* User cars grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userCars.map(c => (
          <motion.div key={c.id} whileHover={{ scale: 1.02 }} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <img src={c.image} alt={c.brand} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{c.brand}</h3>
              <p className="text-gray-600 dark:text-gray-300">Price: ₦{Number(c.price).toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2 italic">(Listed by another user)</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SellCar;
