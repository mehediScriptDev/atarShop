import sneaker1 from "@/assets/sneaker-1.jpg";
import sneaker2 from "@/assets/sneaker-2.jpg";
import sneaker3 from "@/assets/sneaker-3.jpg";
import sneaker4 from "@/assets/sneaker-4.jpg";
import attarImg from "@/assets/cat-attar.jpg";
import panjabiImg from "@/assets/cat-panjabi.jpg";
import tshirtImg from "@/assets/cat-tshirt.jpg";
import pantImg from "@/assets/cat-pant.jpg";
import bagImg from "@/assets/cat-bag.jpg";
import jacketImg from "@/assets/cat-jacket.jpg";
import poloImg from "@/assets/cat-polo.jpg";

export const products = [
  {
    id: 1,
    name: "Premium China Sneakers-Y26-1004",
    category: "Sneakers",
    images: [sneaker1, sneaker2, sneaker3],
    originalPrice: 4500,
    salePrice: 1800,
    discount: 60,
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#f5f5f5" },
    ],
    description:
      "Premium quality China sneakers crafted with breathable mesh upper and cushioned sole for all-day comfort. Features a modern design that pairs perfectly with casual and streetwear outfits. Durable rubber outsole provides excellent grip on various surfaces.",
    stock: 25,
    rating: 4.5,
    reviews: 128,
    featured: true,
  },
  {
    id: 2,
    name: "Premium China Sneakers-Y26-1033",
    category: "Sneakers",
    images: [sneaker2, sneaker1, sneaker4],
    originalPrice: 4500,
    salePrice: 1800,
    discount: 60,
    sizes: ["39", "40", "41", "42", "43"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Grey", hex: "#808080" },
    ],
    description:
      "Step up your style with these premium sneakers featuring a sleek design and superior comfort. The lightweight construction ensures fatigue-free wear while the padded collar offers ankle support. Perfect for daily wear and light sports activities.",
    stock: 18,
    rating: 4.3,
    reviews: 95,
    featured: true,
  },
  {
    id: 3,
    name: "Premium China Sneakers-Y26-1006",
    category: "Sneakers",
    images: [sneaker3, sneaker1, sneaker2],
    originalPrice: 4500,
    salePrice: 1800,
    discount: 60,
    sizes: ["40", "41", "42", "43", "44"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
    ],
    description:
      "Experience ultimate comfort with these premium sneakers designed for the modern man. Features innovative cushioning technology and breathable materials. The minimalist design makes them versatile enough for both casual outings and semi-formal occasions.",
    stock: 30,
    rating: 4.7,
    reviews: 156,
    featured: true,
  },
  {
    id: 4,
    name: "Premium China Sneakers-Y26-1001",
    category: "Sneakers",
    images: [sneaker4, sneaker3, sneaker2],
    originalPrice: 4500,
    salePrice: 1800,
    discount: 60,
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Grey", hex: "#808080" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    description:
      "Classic grey sneakers with premium build quality. Features a textured upper for added style and a memory foam insole for cloud-like comfort. The anti-slip sole makes these perfect for everyday adventures.",
    stock: 22,
    rating: 4.4,
    reviews: 87,
    featured: true,
  },
  {
    id: 5,
    name: "Arabian Oud Attar - Premium Collection",
    category: "Attar",
    images: [attarImg],
    originalPrice: 1200,
    salePrice: 850,
    discount: 29,
    sizes: ["3ml", "6ml", "12ml"],
    colors: [],
    description:
      "Exquisite Arabian Oud Attar crafted from the finest natural ingredients. This long-lasting fragrance blends woody oud notes with subtle floral undertones. Alcohol-free and skin-safe, perfect for daily use and special occasions. A single drop lasts 8-12 hours.",
    stock: 40,
    rating: 4.8,
    reviews: 234,
    featured: false,
  },
  {
    id: 6,
    name: "Classic White Panjabi - Premium Cotton",
    category: "Panjabi",
    images: [panjabiImg],
    originalPrice: 3200,
    salePrice: 2200,
    discount: 31,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Off-White", hex: "#f5f0e8" },
    ],
    description:
      "Elegant premium cotton panjabi with intricate embroidery detail. Perfect for Eid, Jummah prayers, and special occasions. Made from 100% breathable cotton with a comfortable fit. Features detailed hand-stitched collar and cuff work.",
    stock: 35,
    rating: 4.6,
    reviews: 178,
    featured: false,
  },
  {
    id: 7,
    name: "Graphic Print T-Shirt - Urban Style",
    category: "T-Shirt",
    images: [tshirtImg],
    originalPrice: 1500,
    salePrice: 890,
    discount: 41,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#f5f5f5" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    description:
      "Trendy graphic print t-shirt made from premium combed cotton. Features a bold urban design with vibrant, fade-resistant print. The fabric is pre-shrunk and double-stitched for durability. Perfect for casual outings and everyday style.",
    stock: 50,
    rating: 4.2,
    reviews: 145,
    featured: false,
  },
  {
    id: 8,
    name: "Slim Fit Chino Pants - Stretch Cotton",
    category: "Pant & Trouser",
    images: [pantImg],
    originalPrice: 2800,
    salePrice: 1950,
    discount: 30,
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Khaki", hex: "#c3b091" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    description:
      "Tailored slim fit chino pants made with stretch cotton for maximum comfort and mobility. Features a clean, modern silhouette with side pockets and a secure zip fly. Versatile enough for office wear and weekend casual outings.",
    stock: 28,
    rating: 4.5,
    reviews: 112,
    featured: false,
  },
  {
    id: 9,
    name: "Premium Leather Backpack - Urban",
    category: "Backpack",
    images: [bagImg],
    originalPrice: 3500,
    salePrice: 2450,
    discount: 30,
    sizes: ["One Size"],
    colors: [
      { name: "Brown", hex: "#6b4226" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    description:
      "Handcrafted premium leather backpack with a spacious main compartment and multiple organizer pockets. Features padded laptop sleeve (fits up to 15.6\"), adjustable straps, and water-resistant lining. Perfect for work, travel, and everyday use.",
    stock: 15,
    rating: 4.7,
    reviews: 89,
    featured: false,
  },
  {
    id: 10,
    name: "Winter Puffer Jacket - Lightweight Warm",
    category: "Winter",
    images: [jacketImg],
    originalPrice: 5500,
    salePrice: 3500,
    discount: 36,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#1e3a5f" },
      { name: "Olive", hex: "#556b2f" },
    ],
    description:
      "Lightweight yet incredibly warm puffer jacket with premium synthetic insulation. Features a water-resistant outer shell, adjustable hood, and zippered pockets. The slim silhouette keeps you stylish while the insulation keeps you warm in temperatures as low as -5°C.",
    stock: 20,
    rating: 4.8,
    reviews: 203,
    featured: false,
  },
  {
    id: 11,
    name: "Classic Polo Shirt - Piqué Cotton",
    category: "Polo Shirt",
    images: [poloImg],
    originalPrice: 1800,
    salePrice: 1250,
    discount: 31,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy", hex: "#1e3a5f" },
      { name: "White", hex: "#f5f5f5" },
      { name: "Red", hex: "#c0392b" },
      { name: "Green", hex: "#27ae60" },
    ],
    description:
      "Timeless polo shirt crafted from premium piqué cotton. Features a ribbed collar, two-button placket, and side vents for ease of movement. The breathable fabric makes it ideal for everyday wear, casual Fridays, and weekend outings.",
    stock: 45,
    rating: 4.4,
    reviews: 167,
    featured: false,
  },
  {
    id: 12,
    name: "Musk Al-Tahara Attar - Pure Fragrance",
    category: "Attar",
    images: [attarImg],
    originalPrice: 900,
    salePrice: 650,
    discount: 28,
    sizes: ["3ml", "6ml"],
    colors: [],
    description:
      "Pure Musk Al-Tahara attar with a clean, musky fragrance that is universally loved. This alcohol-free perfume oil is concentrated and long-lasting, providing a subtle yet captivating scent throughout the day. Made from 100% natural ingredients.",
    stock: 60,
    rating: 4.6,
    reviews: 312,
    featured: false,
  },
];

export const categories = [
  "Attar",
  "Panjabi",
  "T-Shirt",
  "Pant & Trouser",
  "Backpack",
  "Winter",
  "Sneakers",
  "Polo Shirt",
];

export const getProductById = (id) =>
  products.find((p) => p.id === parseInt(id));

export const getProductsByCategory = (category) =>
  products.filter((p) => p.category === category);

export const getFeaturedProducts = () =>
  products.filter((p) => p.featured);

export const searchProducts = (query) => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
};
