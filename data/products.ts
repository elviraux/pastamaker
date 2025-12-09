export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  sku?: string;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Metal Filaments',
    slug: 'metal-filaments',
    description: 'Filled with real metal - magnetic steel & iron - polish or patina',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'HTPLA',
    slug: 'htpla',
    description: 'High temperature PLA for functional prints',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'PLA',
    slug: 'pla',
    description: 'Premium PLA filaments in various colors',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Subscriptions',
    slug: 'subscriptions',
    description: 'Monthly filament subscription boxes',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
];

export const products: Product[] = [
  // Newest Products
  {
    id: '1',
    name: 'Endless PLA Filament Color Subscription',
    price: 14.99,
    category: 'subscriptions',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=400&fit=crop',
    description: 'Monthly color subscription for endless creativity',
    sku: 'ENDLESS-50G',
    isNew: true,
  },
  {
    id: '2',
    name: 'Endless PLA Filament Color Subscription',
    price: 14.99,
    category: 'subscriptions',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop',
    description: 'Monthly color subscription for endless creativity',
    sku: 'ENDLESS-MULTI',
    isNew: true,
  },
  {
    id: '3',
    name: 'Gradient Gray Multicolor HTPLA',
    price: 14.99,
    category: 'htpla',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    description: 'Beautiful gradient from light to dark gray',
    sku: 'HTPLA-GRAY-GRAD',
    isNew: true,
  },
  {
    id: '4',
    name: 'Gradient Gray Multicolor HTPLA',
    price: 14.99,
    category: 'htpla',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
    description: 'Beautiful gradient from light to dark gray',
    sku: 'HTPLA-GRAY-GRAD-2',
    isNew: true,
  },
  // Metal Filaments
  {
    id: '5',
    name: 'Magnetic Iron PLA Composite',
    price: 29.99,
    category: 'metal-filaments',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    description: 'Real iron-filled filament that can be magnetized and rusted',
    sku: 'METAL-IRON',
  },
  {
    id: '6',
    name: 'Stainless Steel PLA Composite',
    price: 34.99,
    category: 'metal-filaments',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=400&fit=crop',
    description: 'Polishable stainless steel composite filament',
    sku: 'METAL-STEEL',
  },
  {
    id: '7',
    name: 'Copper Metal Composite PLA',
    price: 39.99,
    category: 'metal-filaments',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop',
    description: 'Real copper-filled filament with patina potential',
    sku: 'METAL-COPPER',
  },
  {
    id: '8',
    name: 'Bronze Metal Composite PLA',
    price: 39.99,
    category: 'metal-filaments',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=400&fit=crop',
    description: 'Classic bronze appearance with real metal particles',
    sku: 'METAL-BRONZE',
  },
  // HTPLA Products
  {
    id: '9',
    name: 'Midnight Black HTPLA',
    price: 19.99,
    category: 'htpla',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    description: 'Deep black heat-treatable PLA',
    sku: 'HTPLA-BLACK',
  },
  {
    id: '10',
    name: 'Pearl White HTPLA',
    price: 19.99,
    category: 'htpla',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
    description: 'Lustrous pearl white finish',
    sku: 'HTPLA-WHITE',
  },
  {
    id: '11',
    name: 'Forest Green HTPLA',
    price: 19.99,
    category: 'htpla',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=400&fit=crop',
    description: 'Rich forest green high-temp PLA',
    sku: 'HTPLA-GREEN',
  },
  // PLA Products
  {
    id: '12',
    name: 'Standard PLA - Red',
    price: 14.99,
    category: 'pla',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop',
    description: 'Vibrant red standard PLA filament',
    sku: 'PLA-RED',
  },
  {
    id: '13',
    name: 'Standard PLA - Blue',
    price: 14.99,
    category: 'pla',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=400&fit=crop',
    description: 'Ocean blue standard PLA filament',
    sku: 'PLA-BLUE',
  },
  {
    id: '14',
    name: 'Standard PLA - Yellow',
    price: 14.99,
    category: 'pla',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    description: 'Bright yellow standard PLA filament',
    sku: 'PLA-YELLOW',
  },
];

export const getNewestProducts = (): Product[] => {
  return products.filter(p => p.isNew);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(p => p.category === categorySlug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};
