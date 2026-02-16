'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navigation from '@/components/Navigation';
import { MOCK_PRODUCTS, Product } from '@/lib/mockData';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProducts(MOCK_PRODUCTS);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getStatusBadge = (status: Product['status']) => {
    const badges = {
      'in-stock': 'badge-success',
      'low-stock': 'badge-warning',
      'out-of-stock': 'badge-danger',
    };
    const labels = {
      'in-stock': 'In Stock',
      'low-stock': 'Low Stock',
      'out-of-stock': 'Out of Stock',
    };
    return (
      <span className={`badge ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const handleAddProduct = (newProduct: Partial<Product>) => {
    const product: Product = {
      id: String(products.length + 1),
      name: newProduct.name || '',
      category: newProduct.category || '',
      price: newProduct.price || 0,
      quantity: newProduct.quantity || 0,
      unit: newProduct.unit || 'kg',
      status: newProduct.quantity! > 50 ? 'in-stock' : newProduct.quantity! > 0 ? 'low-stock' : 'out-of-stock',
      supplier: newProduct.supplier || '',
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setProducts([...products, product]);
    setIsAddModalOpen(false);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
  };

  return (
    <ProtectedRoute allowedRoles={['manager', 'storekeeper']}>
      <div className="min-h-screen pb-12">
        <Navigation />
        
        <div className="container mx-auto px-4 mt-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-slide-up">
            <div>
              <h1 className="font-display text-5xl font-bold gradient-text mb-3">
                Products Inventory
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                Manage and view all commodities in your inventory
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary flex items-center space-x-2 text-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Product</span>
            </button>
          </div>

          {/* Filters and Search */}
          <div className="glass-premium p-6 rounded-3xl mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-6">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="input-field pl-12"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Status Filter:
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field py-3 px-4 min-w-[200px]"
                >
                  <option value="all">All Products</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="glass-premium rounded-3xl overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Supplier</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-16">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="w-20 h-20 text-blue-300 dark:text-blue-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          <p className="text-slate-600 dark:text-slate-400 font-bold text-lg">
                            No products found
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="group">
                        <td>
                          <div className="font-bold text-slate-900 dark:text-slate-100">
                            {product.name}
                          </div>
                        </td>
                        <td className="text-slate-600 dark:text-slate-400 font-medium">
                          {product.category}
                        </td>
                        <td className="font-bold text-blue-600 dark:text-blue-400">
                          {formatCurrency(product.price)}
                        </td>
                        <td className="text-slate-900 dark:text-slate-100 font-semibold">
                          {product.quantity} {product.unit}
                        </td>
                        <td>
                          {getStatusBadge(product.status)}
                        </td>
                        <td className="text-slate-600 dark:text-slate-400 font-medium">
                          {product.supplier}
                        </td>
                        <td className="text-slate-600 dark:text-slate-400 font-medium">
                          {new Date(product.lastUpdated).toLocaleDateString()}
                        </td>
                        <td>
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="px-4 py-2 bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-800/60 text-blue-700 dark:text-blue-300 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-110 shadow-lg"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 glass-card p-5 rounded-2xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
              Showing <span className="font-bold text-blue-600 dark:text-blue-400">{filteredProducts.length}</span> of <span className="font-bold text-blue-600 dark:text-blue-400">{products.length}</span> products
            </p>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || editingProduct) && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={editingProduct ? handleEditProduct : handleAddProduct}
        />
      )}
    </ProtectedRoute>
  );
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (product: any) => void;
}

function ProductModal({ product, onClose, onSave }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || 0,
    quantity: product?.quantity || 0,
    unit: product?.unit || 'kg',
    supplier: product?.supplier || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      onSave({
        ...product,
        ...formData,
        status: formData.quantity > 50 ? 'in-stock' : formData.quantity > 0 ? 'low-stock' : 'out-of-stock',
        lastUpdated: new Date().toISOString().split('T')[0],
      });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="glass-premium p-10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-bold gradient-text">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-2xl transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="input-field"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="L">Liters (L)</option>
                <option value="units">Units</option>
                <option value="boxes">Boxes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Supplier
              </label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-8">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
