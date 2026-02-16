'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navigation from '@/components/Navigation';
import { getProductStats, getCategoryStats } from '@/lib/mockData';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
    totalQuantity: 0,
  });
  const [categoryStats, setCategoryStats] = useState<Array<{ name: string; count: number; value: number }>>([]);

  useEffect(() => {
    // Simulate data fetch
    setStats(getProductStats());
    setCategoryStats(getCategoryStats());
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <ProtectedRoute allowedRoles={['manager']}>
      <div className="min-h-screen pb-12">
        <Navigation />
        
        <div className="container mx-auto px-4 mt-8">
          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <h1 className="font-display text-5xl font-bold gradient-text mb-3">
              Dashboard Overview
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
              Welcome back! Here's what's happening with your inventory.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Products */}
            <div className="stat-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-2xl shadow-lg">
                  <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-900/40 px-3 py-1 rounded-full backdrop-blur-xl">TOTAL</span>
              </div>
              <h3 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {stats.totalProducts}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
                Total Products
              </p>
            </div>

            {/* In Stock */}
            <div className="stat-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 rounded-2xl shadow-lg">
                  <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="badge badge-success">Good</span>
              </div>
              <h3 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {stats.inStock}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
                In Stock
              </p>
            </div>

            {/* Low Stock */}
            <div className="stat-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40 rounded-2xl shadow-lg">
                  <svg className="w-7 h-7 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="badge badge-warning">Alert</span>
              </div>
              <h3 className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                {stats.lowStock}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
                Low Stock Items
              </p>
            </div>

            {/* Out of Stock */}
            <div className="stat-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 rounded-2xl shadow-lg">
                  <svg className="w-7 h-7 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="badge badge-danger">Critical</span>
              </div>
              <h3 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                {stats.outOfStock}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
                Out of Stock
              </p>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Total Inventory Value */}
            <div className="glass-premium p-8 rounded-3xl card-hover animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Total Inventory Value
                </h3>
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl shadow-blue-500/50">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-5xl font-bold gradient-text mb-3">
                {formatCurrency(stats.totalValue)}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
                Across {stats.totalQuantity.toLocaleString()} units
              </p>
            </div>

            {/* Categories Overview */}
            <div className="glass-premium p-8 rounded-3xl card-hover animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Top Categories
              </h3>
              <div className="space-y-4">
                {categoryStats.slice(0, 5).map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between p-3 bg-white/40 dark:bg-slate-800/40 rounded-2xl backdrop-blur-xl hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-2xl flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-lg shadow-lg">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">
                          {category.name}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                          {category.count} products
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                      {formatCurrency(category.value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity / Insights */}
          <div className="glass-premium p-10 rounded-3xl animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
              Key Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-3xl backdrop-blur-xl border border-green-200 dark:border-green-800 hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-green-200 dark:bg-green-800 rounded-2xl shadow-lg">
                    <svg className="w-6 h-6 text-green-700 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-green-900 dark:text-green-100 text-lg">
                    Stock Health
                  </h4>
                </div>
                <p className="text-sm text-green-800 dark:text-green-200 font-semibold">
                  {((stats.inStock / stats.totalProducts) * 100).toFixed(0)}% of your inventory is in good stock condition
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/50 rounded-3xl backdrop-blur-xl border border-yellow-200 dark:border-yellow-800 hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-yellow-200 dark:bg-yellow-800 rounded-2xl shadow-lg">
                    <svg className="w-6 h-6 text-yellow-700 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-yellow-900 dark:text-yellow-100 text-lg">
                    Attention Needed
                  </h4>
                </div>
                <p className="text-sm text-yellow-800 dark:text-yellow-200 font-semibold">
                  {stats.lowStock} items need restocking soon
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-3xl backdrop-blur-xl border border-blue-200 dark:border-blue-800 hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-200 dark:bg-blue-800 rounded-2xl shadow-lg">
                    <svg className="w-6 h-6 text-blue-700 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 text-lg">
                    Categories
                  </h4>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200 font-semibold">
                  {categoryStats.length} different product categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
