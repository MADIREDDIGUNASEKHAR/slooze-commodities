'use client';

// import { useQuery, useMutation } from '@apollo/client';
// import {
//   GET_PRODUCTS,
//   GET_PRODUCT_STATS,
//   GET_CATEGORY_STATS,
//   CREATE_PRODUCT,
//   UPDATE_PRODUCT,
//   DELETE_PRODUCT,
// } from '@/lib/graphql/products';
// import {
//   GetProductsResponse,
//   GetProductStatsResponse,
//   GetCategoryStatsResponse,
//   CreateProductInput,
//   UpdateProductInput,
// } from '@/lib/graphql/types';

import { MOCK_PRODUCTS, Product, getProductStats, getCategoryStats } from '@/lib/mockData';
import { useState, useEffect } from 'react';

/* 
============================================================
PRODUCTION IMPLEMENTATION WITH APOLLO CLIENT:
============================================================

This file shows how the product data would be fetched from
the GraphQL API using Apollo Client in a production environment.

The commented code below demonstrates the actual implementation
that would replace the mock data functions.

============================================================
*/

// Example: Fetch all products with Apollo Client
export function useProducts(filters?: { status?: string; search?: string }) {
  /*
  PRODUCTION VERSION:
  
  const { data, loading, error, refetch } = useQuery<GetProductsResponse>(GET_PRODUCTS, {
    variables: { filters },
    fetchPolicy: 'cache-and-network',
  });

  return {
    products: data?.products || [],
    loading,
    error,
    refetch,
  };
  */

  // MOCK VERSION (for demo without backend):
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      let filtered = [...MOCK_PRODUCTS];
      
      if (filters?.status && filters.status !== 'all') {
        filtered = filtered.filter(p => p.status === filters.status);
      }
      
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search) ||
          p.supplier.toLowerCase().includes(search)
        );
      }
      
      setProducts(filtered);
      setLoading(false);
    }, 500);
  }, [filters]);

  return {
    products,
    loading,
    error: null,
    refetch: () => {},
  };
}

// Example: Fetch product statistics for dashboard
export function useProductStats() {
  /*
  PRODUCTION VERSION:
  
  const { data, loading, error } = useQuery<GetProductStatsResponse>(GET_PRODUCT_STATS, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    stats: data?.productStats || null,
    loading,
    error,
  };
  */

  // MOCK VERSION:
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats(getProductStats());
      setLoading(false);
    }, 300);
  }, []);

  return {
    stats,
    loading,
    error: null,
  };
}

// Example: Fetch category statistics
export function useCategoryStats() {
  /*
  PRODUCTION VERSION:
  
  const { data, loading, error } = useQuery<GetCategoryStatsResponse>(GET_CATEGORY_STATS, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    categoryStats: data?.categoryStats || [],
    loading,
    error,
  };
  */

  // MOCK VERSION:
  const [categoryStats, setCategoryStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCategoryStats(getCategoryStats());
      setLoading(false);
    }, 300);
  }, []);

  return {
    categoryStats,
    loading,
    error: null,
  };
}

// Example: Create product mutation
export function useCreateProduct() {
  /*
  PRODUCTION VERSION:
  
  const [createProductMutation, { loading, error }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }, { query: GET_PRODUCT_STATS }],
  });

  const createProduct = async (input: CreateProductInput) => {
    try {
      const { data } = await createProductMutation({
        variables: { input },
      });
      return data?.createProduct || null;
    } catch (err) {
      console.error('Create product error:', err);
      return null;
    }
  };

  return { createProduct, loading, error };
  */

  // MOCK VERSION:
  const createProduct = async (input: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id: String(Date.now()), ...input, lastUpdated: new Date().toISOString() };
  };

  return { createProduct, loading: false, error: null };
}

// Example: Update product mutation
export function useUpdateProduct() {
  /*
  PRODUCTION VERSION:
  
  const [updateProductMutation, { loading, error }] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }, { query: GET_PRODUCT_STATS }],
  });

  const updateProduct = async (id: string, input: UpdateProductInput) => {
    try {
      const { data } = await updateProductMutation({
        variables: { id, input },
      });
      return data?.updateProduct || null;
    } catch (err) {
      console.error('Update product error:', err);
      return null;
    }
  };

  return { updateProduct, loading, error };
  */

  // MOCK VERSION:
  const updateProduct = async (id: string, input: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id, ...input, lastUpdated: new Date().toISOString() };
  };

  return { updateProduct, loading: false, error: null };
}

// Example: Delete product mutation
export function useDeleteProduct() {
  /*
  PRODUCTION VERSION:
  
  const [deleteProductMutation, { loading, error }] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }, { query: GET_PRODUCT_STATS }],
  });

  const deleteProduct = async (id: string) => {
    try {
      const { data } = await deleteProductMutation({
        variables: { id },
      });
      return data?.deleteProduct?.success || false;
    } catch (err) {
      console.error('Delete product error:', err);
      return false;
    }
  };

  return { deleteProduct, loading, error };
  */

  // MOCK VERSION:
  const deleteProduct = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  };

  return { deleteProduct, loading: false, error: null };
}
