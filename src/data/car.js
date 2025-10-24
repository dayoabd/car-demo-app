import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.jpeg";
import img7 from "../assets/img7.jpeg";
import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";
import img10 from "../assets/img10.jpeg";

const carImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const data = [
  { id: 1, brand: "Toyota", model: "Corolla", year: 2021, price: 25000 },
  { id: 2, brand: "Honda", model: "Civic", year: 2022, price: 27000 },
  { id: 3, brand: "Tesla", model: "Model 3", year: 2023, price: 42000 },
  { id: 4, brand: "Ford", model: "Mustang", year: 2020, price: 38000 },
  { id: 5, brand: "BMW", model: "X5", year: 2021, price: 55000 },
  { id: 6, brand: "Mercedes", model: "C-Class", year: 2022, price: 60000 },
  { id: 7, brand: "Audi", model: "A4", year: 2021, price: 52000 },
  { id: 8, brand: "Kia", model: "Sportage", year: 2020, price: 24000 },
  { id: 9, brand: "Hyundai", model: "Elantra", year: 2021, price: 23000 },
  { id: 10, brand: "Nissan", model: "Altima", year: 2022, price: 26000 },
];

export const carsWithImages = data.map((car, i) => ({
  ...car,
  image: carImages[i % carImages.length],
}));
