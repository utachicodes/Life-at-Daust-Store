// src/data/products.js
// Images for Student Government goodies (import for Vite bundling)
import bottle from "../assets/GoodiesMedias/Goodies/bottle.png";
import capBlue from "../assets/GoodiesMedias/Goodies/cap-blue.png";
import hoodieOnceAlwaysWhite from "../assets/GoodiesMedias/Goodies/hoodie-oncealways-white.png";
import hoodieProudGrey from "../assets/GoodiesMedias/Goodies/hoodie-proud-grey.png";
import hoodieProudWhite from "../assets/GoodiesMedias/Goodies/hoodie-proud-white.png";
import hoodiesOnceAlways from "../assets/GoodiesMedias/Goodies/hoodies-oncealways.png";
import mug from "../assets/GoodiesMedias/Goodies/mug.png";
import tshirtCbiBlue from "../assets/GoodiesMedias/Goodies/tshirt-cbi-blue.png";
import tshirtElecGrey from "../assets/GoodiesMedias/Goodies/tshirt-elec-grey.png";
import tshirtsCbi from "../assets/GoodiesMedias/Goodies/tshirts-cbi.png";
import tshirtsElec from "../assets/GoodiesMedias/Goodies/tshirts-elec.png";
import tshirtsInnov from "../assets/GoodiesMedias/Goodies/tshirts-innov.png";
import tshirtsMec from "../assets/GoodiesMedias/Goodies/tshirts-mec.png";
import tshirtsOnceAlways from "../assets/GoodiesMedias/Goodies/tshirts-oncealways.png";
import tshirtsProud from "../assets/GoodiesMedias/Goodies/tshirts-proud.png";
import tshirtsWhereIdeas from "../assets/GoodiesMedias/Goodies/tshirts-whereIdeas.png";

export const CATEGORIES = [
  "All Categories",
  "T-Shirts",
  "Hoodies",
  "Caps",
  "Drinkware",
  "Accessories",
];

export const PRODUCTS = [
  // Drinkware
  {
    id: 1,
    name: "DAUST Water Bottle",
    category: "Drinkware",
    price: 15.0,
    rating: 4.8,
    badge: "Popular",
    image: bottle,
    images: [bottle, mug],
    colors: [{ name: "Steel", hex: "#94a3b8" }, { name: "Navy", hex: "#0a2342" }],
    description: "Stay hydrated on campus with our premium DAUST Water Bottle. Designed for durability and style.",
  },
  {
    id: 2,
    name: "DAUST Mug",
    category: "Drinkware",
    price: 10.0,
    rating: 4.7,
    image: mug,
    images: [mug, bottle],
    colors: [{ name: "White", hex: "#ffffff" }],
    description: "The perfect companion for your morning coffee or late-night study sessions.",
  },

  // Caps
  {
    id: 3,
    name: "DAUST Cap (Blue)",
    category: "Caps",
    price: 12.0,
    rating: 4.6,
    image: capBlue,
    images: [capBlue],
    colors: [{ name: "Blue", hex: "#1e40af" }],
    sizes: ["Adjustable"],
    description: "Classic 6-panel cap with our iconic DAUST logo embroidered on the front.",
  },

  // Hoodies
  {
    id: 4,
    name: 'Hoodie "Once/Always a DAUST innovator" (White)',
    category: "Hoodies",
    price: 35.0,
    rating: 4.9,
    image: hoodieOnceAlwaysWhite,
    images: [hoodieOnceAlwaysWhite, hoodiesOnceAlways],
    colors: [{ name: "White", hex: "#ffffff" }],
    sizes: ["S", "M", "L", "XL"],
    description: "Premium cotton-blend hoodie that represents the spirit of DAUST.",
  },
  {
    id: 5,
    name: 'Hoodie "Proud Parent" (Grey)',
    category: "Hoodies",
    price: 35.0,
    rating: 4.7,
    image: hoodieProudGrey,
    images: [hoodieProudGrey, hoodieProudWhite],
    colors: [{ name: "Grey", hex: "#9ca3af" }],
    sizes: ["M", "L", "XL", "2XL"],
    description: "Show your family pride with the Official DAUST Proud Parent hoodie.",
  },
  {
    id: 6,
    name: 'Hoodie "Proud Parent" (White)',
    category: "Hoodies",
    price: 35.0,
    rating: 4.7,
    image: hoodieProudWhite,
    images: [hoodieProudWhite, hoodieProudGrey],
    colors: [{ name: "White", hex: "#ffffff" }],
    sizes: ["M", "L", "XL", "2XL"],
    description: "Show your family pride with the Official DAUST Proud Parent hoodie in White.",
  },
  {
    id: 7,
    name: 'Hoodies "Once/Always a DAUST innovator" ',
    category: "Hoodies",
    price: 35.0,
    rating: 4.6,
    image: hoodiesOnceAlways,
    images: [hoodiesOnceAlways, hoodieOnceAlwaysWhite],
    colors: [{ name: "Navy", hex: "#0a2342" }],
    sizes: ["S", "M", "L", "XL"],
    description: "The complete collection of 'Once/Always' hoodies for the DAUST community.",
  },

  // T-Shirts
  {
    id: 8,
    name: "T-Shirt Code Build Impact (Blue)",
    category: "T-Shirts",
    price: 18.0,
    rating: 4.5,
    image: tshirtCbiBlue,
    images: [tshirtCbiBlue, tshirtsCbi],
    colors: [{ name: "Blue", hex: "#0a2342" }],
    sizes: ["S", "M", "L", "XL"],
    description: "Code. Build. Impact. The engineer's uniform for making a difference.",
  },
  {
    id: 9,
    name: "T-Shirt ELEC Engineer (Grey)",
    category: "T-Shirts",
    price: 18.0,
    rating: 4.5,
    image: tshirtElecGrey,
    images: [tshirtElecGrey, tshirtsElec],
    colors: [{ name: "Grey", hex: "#9ca3af" }],
    sizes: ["S", "M", "L", "XL"],
    description: "Official ELEC Engineering T-Shirt. Represent your department with pride.",
  },
  {
    id: 10,
    name: "T-Shirts Code Build Impact ",
    category: "T-Shirts",
    price: 18.0,
    rating: 4.4,
    image: tshirtsCbi,
    images: [tshirtsCbi, tshirtCbiBlue],
    colors: [{ name: "Navy", hex: "#0a2342" }],
    sizes: ["S", "M", "L", "XL"],
    description: "Multiple styles of the Code Build Impact T-Shirt collection.",
  },
  {
    id: 11,
    name: "T-Shirts ELEC Engineer ",
    category: "T-Shirts",
    price: 18.0,
    rating: 4.4,
    image: tshirtsElec,
    images: [tshirtsElec, tshirtElecGrey],
    colors: [{ name: "Grey", hex: "#9ca3af" }],
    sizes: ["S", "M", "L", "XL"],
    description: "The complete ELEC Engineer T-Shirt collection.",
  },
  {
    id: 12,
    name: "T-Shirts DAUST Innovator ",
    category: "T-Shirts",
    price: 18.0,
    rating: 4.4,
    image: tshirtsInnov,
    images: [tshirtsInnov],
    colors: [{ name: "White", hex: "#ffffff" }],
    sizes: ["S", "M", "L", "XL"],
    description: "Celebration of innovation at DAUST. A light and comfortable T-Shirt.",
  },
  {
    id: 13,
    name: "T-Shirts MECH Engineer ",
    category: "T-Shirts",
    price: 18.0,
    rating: 4.4,
    image: tshirtsMec,
    images: [tshirtsMec],
    colors: [{ name: "Navy", hex: "#0a2342" }],
    sizes: ["S", "M", "L", "XL"],
    description: "Official Mechanical Engineering T-Shirt. Built for the future.",
  },
  {
    id: 14,
    name: 'T-Shirts "Once/Always a DAUST innovator" ',
    category: "T-Shirts",
    price: 18.0,
    rating: 4.5,
    image: tshirtsOnceAlways,
    images: [tshirtsOnceAlways],
    colors: [{ name: "Various", hex: "#cccccc" }],
    sizes: ["S", "M", "L", "XL"],
    description: "Our signature 'Once/Always' design in a comfortable T-Shirt format.",
  },
  {
    id: 15,
    name: 'T-Shirts "Proud Parent" ',
    category: "T-Shirts",
    price: 18.0,
    rating: 4.6,
    image: tshirtsProud,
    images: [tshirtsProud],
    colors: [{ name: "Various", hex: "#cccccc" }],
    sizes: ["S", "M", "L", "XL"],
    description: "Show your family pride with these comfortable T-Shirts for parents.",
  },
  {
    id: 16,
    name: 'T-Shirts "Where Ideas Come to Life" ',
    category: "T-Shirts",
    price: 18.0,
    rating: 4.5,
    image: tshirtsWhereIdeas,
    images: [tshirtsWhereIdeas],
    colors: [{ name: "White", hex: "#ffffff" }],
    sizes: ["S", "M", "L", "XL"],
    description: "The motto of DAUST on a premium cotton T-Shirt.",
  },
];