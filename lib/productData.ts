import { Product } from '@/types';

// Product data for Firestore upload
// This file is used ONLY for uploading to Firestore via /admin/upload
export const FIRESTORE_PRODUCTS: Product[] = [
    // SHOES
    {
        id: "1",
        title: "Nike Air Max 90",
        minisrc: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "The Nike Air Max 90 stays true to its OG running roots with iconic Waffle sole, stitched overlays and classic TPU details.",
        content: "Shoes",
        price: 130,
        colors: ["blue", "white", "red"],
        discount: 0,
        category: "Shoes",
        gender: "unisex",
        itemRate: 4.5
    },
    {
        id: "2",
        title: "Adidas Ultraboost",
        minisrc: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Boost cushioning provides incredible energy return with every step. Flexible Primeknit upper adapts to your foot.",
        content: "Shoes",
        price: 180,
        colors: ["black", "white", "grey"],
        discount: 0.15,
        category: "Shoes",
        gender: "male",
        itemRate: 4.7
    },
    {
        id: "3",
        title: "Vans Old Skool",
        minisrc: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Classic skate shoe with signature side stripe. Canvas and suede upper with padded collar for support and flexibility.",
        content: "Shoes",
        price: 65,
        colors: ["black", "white"],
        discount: 0,
        category: "Shoes",
        gender: "unisex",
        itemRate: 4.3
    },

    // APPAREL
    {
        id: "4",
        title: "Cotton Crew Neck Tee",
        minisrc: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "100% organic cotton tee with a classic fit. Soft, breathable fabric perfect for everyday wear.",
        content: "Apparel",
        price: 29,
        colors: ["white", "black", "grey", "beige"],
        discount: 0,
        category: "Apparel",
        gender: "unisex",
        itemRate: 4.2
    },
    {
        id: "5",
        title: "Slim Fit Chinos",
        minisrc: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1624378515195-6bbdb73dbe4a?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Modern slim-fit chinos in stretch cotton twill. Versatile and comfortable for work or weekend.",
        content: "Apparel",
        price: 65,
        colors: ["navy", "beige", "black"],
        discount: 0.15,
        category: "Apparel",
        gender: "male",
        itemRate: 4.3
    },
    {
        id: "6",
        title: "Floral Summer Dress",
        minisrc: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Lightweight floral midi dress perfect for warm weather. Features adjustable straps and a flattering silhouette.",
        content: "Apparel",
        price: 75,
        colors: ["blue", "red", "yellow"],
        discount: 0.2,
        category: "Apparel",
        gender: "female",
        itemRate: 4.6
    },

    // OUTERWEAR
    {
        id: "7",
        title: "Classic Trench Coat",
        minisrc: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Timeless double-breasted trench in water-resistant gabardine. Features a detachable belt and classic collar.",
        content: "Outerwear",
        price: 220,
        colors: ["beige", "black", "navy"],
        discount: 0,
        category: "Outerwear",
        gender: "unisex",
        itemRate: 4.7
    },
    {
        id: "8",
        title: "Leather Biker Jacket",
        minisrc: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Premium leather moto jacket with asymmetric zip. Features zip pockets and belted hem.",
        content: "Outerwear",
        price: 350,
        colors: ["black", "brown"],
        discount: 0.25,
        category: "Outerwear",
        gender: "unisex",
        itemRate: 4.8
    },
    {
        id: "9",
        title: "Puffer Winter Jacket",
        minisrc: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Insulated puffer jacket to keep you warm. Water-resistant shell with down fill and adjustable hood.",
        content: "Outerwear",
        price: 180,
        colors: ["black", "navy", "green"],
        discount: 0,
        category: "Outerwear",
        gender: "unisex",
        itemRate: 4.5
    },

    // ELECTRONICS
    {
        id: "10",
        title: "Noise Cancelling Headphones",
        minisrc: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Premium over-ear headphones with active noise cancellation. Up to 30 hours of battery life.",
        content: "Electronics",
        price: 299,
        colors: ["black", "silver"],
        discount: 0.1,
        category: "Electronics",
        gender: "unisex",
        itemRate: 4.7
    },
    {
        id: "11",
        title: "Wireless Earbuds Pro",
        minisrc: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "True wireless earbuds with premium sound quality. Features transparency mode and adaptive EQ.",
        content: "Electronics",
        price: 249,
        colors: ["white", "black"],
        discount: 0,
        category: "Electronics",
        gender: "unisex",
        itemRate: 4.6
    },
    {
        id: "12",
        title: "Smart Fitness Watch",
        minisrc: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Advanced fitness tracking with heart rate monitor, GPS, and sleep analysis. 7-day battery life.",
        content: "Electronics",
        price: 399,
        colors: ["black", "silver"],
        discount: 0,
        category: "Electronics",
        gender: "unisex",
        itemRate: 4.5
    },

    // BAGS
    {
        id: "13",
        title: "Leather Crossbody Bag",
        minisrc: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Compact leather crossbody with adjustable strap. Multiple compartments for organization.",
        content: "Bag",
        price: 120,
        colors: ["brown", "black", "tan"],
        discount: 0,
        category: "Bags",
        gender: "female",
        itemRate: 4.6
    },
    {
        id: "14",
        title: "Canvas Tote Bag",
        minisrc: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Eco-friendly canvas tote perfect for everyday use. Reinforced handles and interior pocket.",
        content: "Bag",
        price: 35,
        colors: ["beige", "black"],
        discount: 0,
        category: "Bags",
        gender: "unisex",
        itemRate: 4.2
    },
    {
        id: "15",
        title: "Travel Laptop Backpack",
        minisrc: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop"],
        src: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1622560480605-d83c85265c91?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Durable backpack with padded laptop compartment up to 15.6 inches. USB charging port and water-resistant material.",
        content: "Bag",
        price: 85,
        colors: ["black", "grey", "navy"],
        discount: 0.15,
        category: "Bags",
        gender: "unisex",
        itemRate: 4.7
    },
];
