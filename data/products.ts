export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  fullDescription: string;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  category: "Casual" | "Evening" | "Party" | "Summer" | "Winter";
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: "DRS001",
    name: "Floral Summer Dress",
    price: 250,
    description: "Elegant floral dress perfect for casual outings.",
    fullDescription: "This beautiful floral summer dress features a breathable fabric perfect for warm weather. The elegant floral pattern combines pink and white tones, making it versatile for any casual occasion. With its comfortable fit and flowing design, you'll feel effortlessly chic.",
    image: "https://images.unsplash.com/photo-1595777707802-5b575c2f4c15?w=500&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595777707802-5b575c2f4c15?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1572804419446-63cbf6af5fbf?w=500&h=700&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pink", "White", "Beige"],
    category: "Summer",
    isFeatured: true,
    isNew: true
  },
  {
    id: "DRS002",
    name: "Black Evening Gown",
    price: 450,
    description: "Sophisticated black gown for special events.",
    fullDescription: "This stunning black evening gown is designed for those special moments. With elegant draping and a timeless silhouette, it provides both comfort and sophistication. Perfect for galas, weddings, or formal dinners.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1595607774223-ef52624120d2?w=500&h=700&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    category: "Evening",
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: "DRS003",
    name: "Casual Striped Shirt Dress",
    price: 180,
    description: "Comfortable striped dress for everyday wear.",
    fullDescription: "This casual striped shirt dress combines comfort and style perfectly. The classic stripes in pink and white create a fresh, feminine look. It's ideal for running errands, casual lunches, or relaxed weekend outings.",
    image: "https://images.unsplash.com/photo-1548690312-e3f507572283?w=500&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1548690312-e3f507572283?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1552062407-291826ad9014?w=500&h=700&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Pink", "White", "Navy"],
    category: "Casual",
    isNew: true
  },
  {
    id: "DRS004",
    name: "Velvet Party Dress",
    price: 380,
    description: "Luxurious velvet dress for evening celebrations.",
    fullDescription: "Indulge in luxury with this velvet party dress. The rich texture and elegant cut make it perfect for parties and celebrations. The bold color selection ensures you'll make a statement at any event.",
    image: "https://images.unsplash.com/photo-1597863211143-8577b15b2d02?w=500&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1597863211143-8577b15b2d02?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1609708536965-701a9b521f47?w=500&h=700&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Burgundy", "Navy", "Black"],
    category: "Party",
    isBestSeller: true
  },
  {
    id: "DRS005",
    name: "Linen Maxi Dress",
    price: 320,
    description: "Breathable linen dress for all seasons.",
    fullDescription: "This elegant linen maxi dress is perfect for all seasons. The natural fabric provides comfort while the loose silhouette flatters all body types. Great for beach days, garden parties, or casual evenings.",
    image: "https://images.unsplash.com/photo-1598886457472-b46caa8d3a6a?w=500&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598886457472-b46caa8d3a6a?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1595607774223-ef52624120d2?w=500&h=700&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Beige", "Cream"],
    category: "Summer",
    isNew: true
  },
  {
    id: "DRS006",
    name: "Elegant Pearl Dress",
    price: 290,
    description: "Sophisticated dress with pearl embellishments.",
    fullDescription: "This sophisticated dress features beautiful pearl embellishments that add a touch of glamour. Perfect for weddings, cocktail parties, or any occasion where you want to shine. The delicate beading adds elegance without being overdone.",
    image: "https://images.unsplash.com/photo-1604156425220-6d59b0b0ae12?w=500&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1604156425220-6d59b0b0ae12?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1595777707802-5b575c2f4c15?w=500&h=700&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blush", "White", "Ivory"],
    category: "Evening",
    isFeatured: true
  },
  {
    id: "DRS007",
    name: "Pink A-Line Dress",
    price: 220,
    description: "Classic A-line dress in beautiful pink.",
    fullDescription: "This timeless A-line dress in a beautiful pink shade is a wardrobe staple. The flattering A-line silhouette works for any body type. Perfect for casual events, date nights, or whenever you want to feel put-together.",
    image: "https://images.unsplash.com/photo-1617372465563-3e8c9f50e5f5?w=500&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617372465563-3e8c9f50e5f5?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1555308323-b9d9b5c67ad9?w=500&h=700&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Pink", "Rose", "Mauve"],
    category: "Casual",
    isBestSeller: true
  },
  {
    id: "DRS008",
    name: "Winter Sweater Dress",
    price: 270,
    description: "Cozy sweater dress for cold weather.",
    fullDescription: "Stay warm and stylish in this cozy sweater dress. Made from soft, high-quality materials, it's perfect for layering. The neutral tones make it easy to style with your favorite accessories and outerwear.",
    image: "https://images.unsplash.com/photo-1609707414518-68ba87ceec4b?w=500&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1609707414518-68ba87ceec4b?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1609707414394-ff3a0e4e3bc2?w=500&h=700&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Gray", "Black"],
    category: "Winter",
    isNew: true
  },
  {
    id: "DRS009",
    name: "Cocktail Party Dress",
    price: 350,
    description: "Chic dress for cocktail parties.",
    fullDescription: "Make a sophisticated statement in this cocktail party dress. With its modern design and premium fabric, it's perfect for upscale events. The fitted silhouette flatters your figure while allowing comfortable movement.",
    image: "https://images.unsplash.com/photo-1617614910903-67b6b9e24e15?w=500&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617614910903-67b6b9e24e15?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1595607774223-ef52624120d2?w=500&h=700&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Burgundy"],
    category: "Party"
  },
  {
    id: "DRS010",
    name: "Garden Party Dress",
    price: 240,
    description: "Charming dress for garden gatherings.",
    fullDescription: "This charming garden party dress features a light, airy design perfect for outdoor events. The delicate patterns and soft colors make it ideal for spring and summer celebrations. Comfortable and photogenic for all your special occasions.",
    image: "https://images.unsplash.com/photo-1589380154745-12e9e9a5d9f2?w=500&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1589380154745-12e9e9a5d9f2?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1595777707802-5b575c2f4c15?w=500&h=700&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral", "Cream", "Pastel"],
    category: "Summer"
  }
];
