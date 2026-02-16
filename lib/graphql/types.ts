// GraphQL Schema Types
// These should match your NestJS backend schema

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'manager' | 'storekeeper';
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

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
}

export interface ProductFilterInput {
  status?: 'in-stock' | 'low-stock' | 'out-of-stock';
  category?: string;
  search?: string;
}

export interface CreateProductInput {
  name: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  supplier: string;
}

export interface UpdateProductInput {
  name?: string;
  category?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  supplier?: string;
}

export interface ProductStats {
  totalProducts: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  totalValue: number;
  totalQuantity: number;
}

export interface CategoryStats {
  name: string;
  count: number;
  value: number;
}

// Query/Mutation Response Types
export interface GetProductsResponse {
  products: Product[];
}

export interface GetProductResponse {
  product: Product;
}

export interface CreateProductResponse {
  createProduct: Product;
}

export interface UpdateProductResponse {
  updateProduct: Product;
}

export interface DeleteProductResponse {
  deleteProduct: {
    success: boolean;
  };
}

export interface GetProductStatsResponse {
  productStats: ProductStats;
}

export interface GetCategoryStatsResponse {
  categoryStats: CategoryStats[];
}

export interface LoginMutationResponse {
  login: LoginResponse;
}

export interface GetCurrentUserResponse {
  me: User;
}
