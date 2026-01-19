// Products are now stored in Firestore
// Use hooks/useProducts.ts to fetch product data
// To upload products, visit /admin/upload

export const CATEGORIES = [
  { value: "Any", label: "All Categories" },
  { value: "Shoes", label: "Shoes" },
  { value: "Apparel", label: "Apparel" },
  { value: "Outerwear", label: "Outerwear" },
  { value: "Electronics", label: "Electronics" },
  { value: "Bags", label: "Bags & Accessories" },
];

export const GENDERS = [
  { value: "Any", label: "Any" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "unisex", label: "Unisex" },
];

export const SIZES = [
  { value: "Any", label: "Any" },
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
];

export const COLOR_OPTIONS = [
  { value: "black", label: "Black", color: "#000000" },
  { value: "white", label: "White", color: "#FFFFFF" },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "grey", label: "Grey", color: "#666666" },
  { value: "brown", label: "Brown", color: "#8B4513" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "silver", label: "Silver", color: "#C0C0C0" },
  { value: "beige", label: "Beige", color: "#F5F5DC" },
  { value: "navy", label: "Navy", color: "#000080" },
  { value: "tan", label: "Tan", color: "#D2B48C" },
];
