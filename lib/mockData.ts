export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  supplier: string;
  lastUpdated: string;
  image?: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Coffee Beans',
    category: 'Beverages',
    price: 24.99,
    quantity: 150,
    unit: 'kg',
    status: 'in-stock',
    supplier: 'Global Coffee Co.',
    lastUpdated: '2024-02-10',
  },
  {
    id: '2',
    name: 'Organic Green Tea',
    category: 'Beverages',
    price: 18.50,
    quantity: 45,
    unit: 'kg',
    status: 'low-stock',
    supplier: 'TeaWorld',
    lastUpdated: '2024-02-12',
  },
  {
    id: '3',
    name: 'Whole Wheat Flour',
    category: 'Grains',
    price: 12.75,
    quantity: 0,
    unit: 'kg',
    status: 'out-of-stock',
    supplier: 'Grain Masters',
    lastUpdated: '2024-02-08',
  },
  {
    id: '4',
    name: 'Raw Sugar',
    category: 'Sweeteners',
    price: 8.99,
    quantity: 200,
    unit: 'kg',
    status: 'in-stock',
    supplier: 'Sweet Supply Inc.',
    lastUpdated: '2024-02-13',
  },
  {
    id: '5',
    name: 'Extra Virgin Olive Oil',
    category: 'Oils',
    price: 35.00,
    quantity: 80,
    unit: 'L',
    status: 'in-stock',
    supplier: 'Mediterranean Imports',
    lastUpdated: '2024-02-11',
  },
  {
    id: '6',
    name: 'Himalayan Pink Salt',
    category: 'Seasonings',
    price: 15.25,
    quantity: 25,
    unit: 'kg',
    status: 'low-stock',
    supplier: 'Salt & Spice Co.',
    lastUpdated: '2024-02-09',
  },
  {
    id: '7',
    name: 'Cocoa Powder',
    category: 'Baking',
    price: 22.50,
    quantity: 110,
    unit: 'kg',
    status: 'in-stock',
    supplier: 'Choco World',
    lastUpdated: '2024-02-12',
  },
  {
    id: '8',
    name: 'Vanilla Extract',
    category: 'Flavoring',
    price: 45.00,
    quantity: 15,
    unit: 'L',
    status: 'low-stock',
    supplier: 'Vanilla Dreams',
    lastUpdated: '2024-02-10',
  },
  {
    id: '9',
    name: 'Basmati Rice',
    category: 'Grains',
    price: 16.99,
    quantity: 180,
    unit: 'kg',
    status: 'in-stock',
    supplier: 'Rice Kingdom',
    lastUpdated: '2024-02-13',
  },
  {
    id: '10',
    name: 'Honey (Pure)',
    category: 'Sweeteners',
    price: 28.00,
    quantity: 60,
    unit: 'kg',
    status: 'in-stock',
    supplier: 'Bee Natural',
    lastUpdated: '2024-02-11',
  },
];

export function getProductStats() {
  const totalProducts = MOCK_PRODUCTS.length;
  const inStock = MOCK_PRODUCTS.filter(p => p.status === 'in-stock').length;
  const lowStock = MOCK_PRODUCTS.filter(p => p.status === 'low-stock').length;
  const outOfStock = MOCK_PRODUCTS.filter(p => p.status === 'out-of-stock').length;
  const totalValue = MOCK_PRODUCTS.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const totalQuantity = MOCK_PRODUCTS.reduce((sum, p) => sum + p.quantity, 0);

  return {
    totalProducts,
    inStock,
    lowStock,
    outOfStock,
    totalValue,
    totalQuantity,
  };
}

export function getCategoryStats() {
  const categories = new Map<string, { count: number; value: number }>();
  
  MOCK_PRODUCTS.forEach(product => {
    const current = categories.get(product.category) || { count: 0, value: 0 };
    categories.set(product.category, {
      count: current.count + 1,
      value: current.value + (product.price * product.quantity),
    });
  });

  return Array.from(categories.entries()).map(([name, stats]) => ({
    name,
    ...stats,
  }));
}
